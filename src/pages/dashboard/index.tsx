import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import { IPagePropCommon } from 'types/pageProps';
import { TableColumn } from 'react-data-table-component';
import { IPostGetManyResultService } from 'types/services/post.service';
import { PostService } from '@services/post.service';
import { ViewService } from '@services/view.service';
import {
  IViewGetNumberResultService,
  IViewGetStatisticsResultService,
} from 'types/services/view.service';
import ComponentDataTable from '@components/elements/table/dataTable';
import Image from 'next/image';
import ComponentChartArea from '@components/elements/charts/area';
import ComponentThemeBadgeStatus from '@components/theme/badge/status';
import ComponentTableUpdatedBy from '@components/elements/table/updatedBy';
import { PostUtil } from '@utils/post.util';
import { ImageSourceUtil } from '@utils/imageSource.util';
import { postTypes } from '@constants/postTypes';
import { RouteUtil } from '@utils/route.util';
import { PostSortTypeId } from '@constants/postSortTypes';
import { ISettingGetResultService } from 'types/services/setting.service';
import { SettingService } from '@services/setting.service';
import { SettingProjectionKeys } from '@constants/settingProjections';

const WorldMap = dynamic(() => import('react-svg-worldmap'), { ssr: false });

type IPageState = {
  lastPosts: IPostGetManyResultService[];
  visitorData: {
    number: IViewGetNumberResultService;
    statistics: IViewGetStatisticsResultService;
  };
  worldMapSize: 'lg' | 'xl' | 'xxl';
  settings: ISettingGetResultService
};

type IPageProps = {} & IPagePropCommon;

class PageDashboard extends Component<IPageProps, IPageState> {
  timer: any;
  abortController = new AbortController();

  constructor(props: IPageProps) {
    super(props);
    this.state = {
      lastPosts: [],
      visitorData: {
        number: {
          liveTotal: 0,
          weeklyTotal: 0,
          averageTotal: 0,
        },
        statistics: {
          day: [],
          country: [],
        },
      },
      worldMapSize: 'lg',
      settings: {}
    };
  }

  async componentDidMount() {
    this.setPageTitle();
    await this.getViewNumber();
    await this.getViewStatistics();
    await this.getSettings();
    await this.getLastPosts();
    this.props.setStateApp(
      {
        isPageLoading: false,
      },
      () => {
        this.reportTimer();
      }
    );
  }

  componentWillUnmount() {
    this.abortController.abort();
    clearInterval(this.timer);
  }

  setPageTitle() {
    this.props.setBreadCrumb([this.props.t('dashboard')]);
  }

  reportTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(async () => {
      await this.getViewNumber();
    }, 10000);
  }

  async getViewNumber() {
    const serviceResult = await ViewService.getNumber(
      this.abortController.signal
    );

    if (serviceResult.status && serviceResult.data) {
      if (
        JSON.stringify(this.state.visitorData.number) !=
        JSON.stringify(serviceResult.data)
      ) {
        this.setState((state: IPageState) => {
          state.visitorData.number = serviceResult.data!;
          return state;
        });
      }
    }
  }

  async getViewStatistics() {
    const serviceResult = await ViewService.getStatistics(
      this.abortController.signal
    );

    if (serviceResult.status && serviceResult.data) {
      this.setState((state: IPageState) => {
        state.visitorData.statistics = serviceResult.data!;
        return state;
      });
    }
  }

  async getSettings() {
    const serviceResult = await SettingService.get(
      {
        projection: SettingProjectionKeys.General
      },
      this.abortController.signal
    );

    if(serviceResult.status && serviceResult.data){
      this.setState((state: IPageState) => {
          state.settings = serviceResult.data!;
          return state;
      });
    }
  }

  async getLastPosts() {
    const serviceResult = await PostService.getMany(
      {
        langId: this.props.getStateApp.appData.mainLangId,
        count: 10,
        sortTypeId: PostSortTypeId.Newest,
      },
      this.abortController.signal
    );
    if (serviceResult.status && serviceResult.data) {
      this.setState({
        lastPosts: serviceResult.data,
      });
    }
  }

  setWorldMapSize(size: IPageState['worldMapSize']) {
    this.setState({
      worldMapSize: size,
    });
  }

  async navigatePostPage(
    type: 'termEdit' | 'edit' | 'listPost',
    postTypeId: number,
    itemId = '',
    termTypeId = 0
  ) {
    const pagePath = PostUtil.getPagePath(postTypeId);
    let path = '';
    switch (type) {
      case 'edit':
        path = pagePath.EDIT(itemId);
        break;
      case 'termEdit':
        path = pagePath.TERM_WITH(termTypeId).EDIT(itemId);
        break;
      case 'listPost':
        path = pagePath.LIST;
        break;
    }
    await RouteUtil.change({ props: this.props, path: path });
  }

  get getLastPostTableColumns(): TableColumn<IPageState['lastPosts'][0]>[] {
    return [
      {
        name: this.props.t('image'),
        width: '105px',
        cell: (row) => (
          <div className="image pt-2 pb-2">
            <Image
              src={ImageSourceUtil.getUploadedImageSrc(row.contents?.image)}
              alt={row.contents?.title ?? ''}
              width={75}
              height={75}
              className="post-image img-fluid"
            />
          </div>
        ),
      },
      {
        name: this.props.t('title'),
        selector: (row) => row.contents?.title || this.props.t('[noLangAdd]'),
        sortable: true,
      },
      {
        name: this.props.t('type'),
        selector: (row) => row.typeId,
        sortable: true,
        cell: (row) => (
          <label
            onClick={() =>
              this.navigatePostPage('listPost', row.typeId, row._id)
            }
            className={`badge badge-gradient-primary cursor-pointer`}
          >
            {this.props.t(
              postTypes.findSingle('id', row.typeId)?.langKey ?? '[noLangAdd]'
            )}
          </label>
        ),
      },
      {
        name: this.props.t('status'),
        selector: (row) => row.statusId,
        sortable: true,
        cell: (row) => (
          <ComponentThemeBadgeStatus t={this.props.t} statusId={row.statusId} />
        ),
      },
      {
        name: this.props.t('updatedBy'),
        sortable: true,
        cell: (row) => (
          <ComponentTableUpdatedBy
            name={row.lastAuthorId.name}
            updatedAt={row.updatedAt || ''}
          />
        ),
      },
    ];
  }

  Reports = () => {
    return (
      <div className="col-12 grid-margin">
        <div className="card card-statistics">
          <div className="row">
            <div className="card-col col-xl-3 col-lg-3 col-md-3 col-6">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-center flex-column flex-sm-row">
                  <i className="mdi mdi-account-multiple-outline text-primary ms-0 me-sm-4 icon-lg"></i>
                  <div className="wrapper text-center text-sm-end">
                    <p className="card-text mb-0 text-dark">
                      {this.props.t('currentVisitors')}
                    </p>
                    <div className="fluid-container">
                      <h3 className="mb-0 font-weight-medium text-dark">
                        {this.state.visitorData.number.liveTotal}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-col col-xl-3 col-lg-3 col-md-3 col-6">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-center flex-column flex-sm-row">
                  <i className="mdi mdi-target text-primary ms-0 me-sm-4 icon-lg"></i>
                  <div className="wrapper text-center text-sm-end">
                    <p className="card-text mb-0 text-dark">
                      {this.props.t('dailyAverageVisitors')}
                    </p>
                    <div className="fluid-container">
                      <h3 className="mb-0 font-weight-medium text-dark">
                        {this.state.visitorData.number.averageTotal}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-col col-xl-3 col-lg-3 col-md-3 col-6">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-center flex-column flex-sm-row">
                  <i className="mdi mdi-calendar-week text-primary ms-0 me-sm-4 icon-lg"></i>
                  <div className="wrapper text-center text-sm-end">
                    <p className="card-text mb-0 text-dark">
                      {this.props.t('weeklyTotalVisitors')}
                    </p>
                    <div className="fluid-container">
                      <h3 className="mb-0 font-weight-medium text-dark">
                        {this.state.visitorData.number.weeklyTotal}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-col col-xl-3 col-lg-3 col-md-3 col-6">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-center flex-column flex-sm-row">
                  <i className="mdi mdi-google-analytics text-primary ms-0 me-sm-4 icon-lg"></i>
                  <div className="wrapper text-center text-sm-end">
                    <p className="card-text mb-0 text-dark">
                      {this.props.t('lifeTimeVisitors')}
                    </p>
                    <div className="fluid-container">
                      <h3 className="mb-0 font-weight-medium text-dark">
                        <a
                          target="_blank"
                          className="text-info fs-6 text-decoration-none"
                          href={this.state.settings.googleAnalyticURL ?? "javascript:void(0);"}
                        >
                          {this.props.t('clickToSee')}
                        </a>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  ReportTwo = () => {
    return (
      <div className="row">
        <div className="col-md-7 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="clearfix mb-4">
                <h4 className="card-title float-start">
                  {this.props.t('weeklyVisitorsStatistics')}
                </h4>
              </div>
              <div className="chart-container">
                <ComponentChartArea
                  toolTipLabel={this.props.t('visitors')}
                  data={this.state.visitorData.statistics.day.map(
                    (view) => view.total
                  )}
                  labels={this.state.visitorData.statistics.day.map(
                    (view) => view._id
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-5 grid-margin stretch-card">
          <div className="card">
            <div className="card-body overflow-auto">
              <h4 className="card-title">
                {this.props.t('weeklyVisitorsStatistics')} (
                {this.props.t('worldMap')})
              </h4>
              <div className="row d-none d-lg-block">
                <div className="col-md-12 text-end">
                  <button
                    className="btn btn-gradient-success btn-sm"
                    onClick={() =>
                      this.setWorldMapSize(
                        this.state.worldMapSize == 'xl' ? 'xxl' : 'xl'
                      )
                    }
                  >
                    <i className="fa fa-search-plus"></i>
                  </button>
                  <button
                    className="btn btn-gradient-danger btn-sm"
                    onClick={() =>
                      this.setWorldMapSize(
                        this.state.worldMapSize == 'xxl' ? 'xl' : 'lg'
                      )
                    }
                  >
                    <i className="fa fa-search-minus"></i>
                  </button>
                </div>
              </div>
              <div className="row overflow-auto">
                <WorldMap
                  color="#b66dff"
                  borderColor="var(--theme-worldmap-stroke-bg)"
                  frameColor="red"
                  strokeOpacity={0.4}
                  backgroundColor="var(--theme-bg)"
                  value-suffix="people"
                  size={this.state.worldMapSize}
                  data={this.state.visitorData.statistics.country.map(
                    (view) => ({
                      country: (
                        view._id || window.navigator.language.slice(3)
                      ).toLowerCase(),
                      value: view.total,
                    })
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  LastPost = () => {
    return (
      <div className="row page-post">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">{this.props.t('lastPosts')}</h4>
              <div className="table-post">
                <ComponentDataTable
                  columns={this.getLastPostTableColumns}
                  data={this.state.lastPosts}
                  i18={{
                    search: this.props.t('search'),
                    noRecords: this.props.t('noRecords'),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return this.props.getStateApp.isPageLoading ? null : (
      <div className="page-dashboard">
        <this.Reports />
        <this.ReportTwo />
        <this.LastPost />
      </div>
    );
  }
}

export default PageDashboard;
