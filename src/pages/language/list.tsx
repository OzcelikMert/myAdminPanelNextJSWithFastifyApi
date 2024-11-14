import React, { Component } from 'react';
import { IPagePropCommon } from 'types/pageProps';
import { TableColumn } from 'react-data-table-component';
import ComponentDataTable from '@components/elements/table/dataTable';
import { ILanguageGetResultService } from 'types/services/language.service';
import { LanguageService } from '@services/language.service';
import Image from 'next/image';
import ComponentThemeBadgeStatus from '@components/theme/badge/status';
import ComponentThemeModalUpdateItemRank from '@components/theme/modal/updateItemRank';
import ComponentToast from '@components/elements/toast';
import { PermissionUtil } from '@utils/permission.util';
import { LanguageEndPointPermission } from '@constants/endPointPermissions/language.endPoint.permission';
import { EndPoints } from '@constants/endPoints';
import { ImageSourceUtil } from '@utils/imageSource.util';
import { RouteUtil } from '@utils/route.util';

type IPageState = {
  searchKey: string;
  items: ILanguageGetResultService[];
  showingItems: ILanguageGetResultService[];
  selectedItemId: string;
  isShowModalUpdateRank: boolean;
};

type IPageProps = {} & IPagePropCommon;

export default class PageSettingLanguageList extends Component<
  IPageProps,
  IPageState
> {
  abortController = new AbortController();

  constructor(props: IPageProps) {
    super(props);
    this.state = {
      searchKey: '',
      items: [],
      showingItems: [],
      selectedItemId: '',
      isShowModalUpdateRank: false,
    };
  }

  async componentDidMount() {
    if (
      PermissionUtil.checkAndRedirect(
        this.props,
        LanguageEndPointPermission.GET
      )
    ) {
      this.setPageTitle();
      await this.getItems();
      this.props.setStateApp({
        isPageLoading: false,
      });
    }
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  setPageTitle() {
    this.props.setBreadCrumb([
      this.props.t('settings'),
      this.props.t('languages'),
      this.props.t('list'),
    ]);
  }

  async getItems() {
    const result = await LanguageService.getMany(
      {},
      this.abortController.signal
    );

    if (result.status && result.data) {
      this.setState((state: IPageState) => {
        state.items = result.data!;
        state.showingItems = result.data!;
        return state;
      });
    }
  }

  async onChangeRank(rank: number) {
    const serviceResult = await LanguageService.updateRankWithId(
      {
        _id: this.state.selectedItemId,
        rank: rank,
      },
      this.abortController.signal
    );

    if (serviceResult.status) {
      this.setState(
        (state: IPageState) => {
          const item = this.state.items.findSingle(
            '_id',
            this.state.selectedItemId
          );
          if (item) {
            item.rank = rank;
          }
          return state;
        },
        () => {
          this.onSearch(this.state.searchKey);
          const item = this.state.items.findSingle(
            '_id',
            this.state.selectedItemId
          );
          new ComponentToast({
            type: 'success',
            title: this.props.t('successful'),
            content: `'${item?.title}' ${this.props.t('itemEdited')}`,
            timeOut: 3,
          });
        }
      );
    }
  }

  onSearch(searchKey: string) {
    this.setState({
      searchKey: searchKey,
      showingItems: this.state.items.filter(
        (item) => (item.title ?? '').toLowerCase().search(searchKey) > -1
      ),
    });
  }

  navigatePage(type: 'edit', itemId = '') {
    const pagePath = EndPoints.LANGUAGE_WITH;
    switch (type) {
      case 'edit':
        RouteUtil.change({ props: this.props, path: pagePath.EDIT(itemId) });
        break;
    }
  }

  get getTableColumns(): TableColumn<IPageState['showingItems'][0]>[] {
    return [
      {
        name: this.props.t('image'),
        width: '105px',
        cell: (row) => (
          <div className="image mt-2 mb-2">
            <Image
              src={ImageSourceUtil.getUploadedFlagSrc(row.image)}
              alt={row.title}
              width={75}
              height={75}
              className="img-fluid"
            />
          </div>
        ),
      },
      {
        name: this.props.t('title'),
        selector: (row) => row.title,
        cell: (row) => (
          <div className="row w-100">
            <div className="col-md-12">
              {row.title} ({row.shortKey}-{row.locale})
            </div>
          </div>
        ),
        width: '250px',
        sortable: true,
      },
      {
        name: this.props.t('status'),
        sortable: true,
        selector: (row) => row.statusId,
        cell: (row) => (
          <ComponentThemeBadgeStatus t={this.props.t} statusId={row.statusId} />
        ),
      },
      {
        name: this.props.t('rank'),
        sortable: true,
        selector: (row) => row.rank ?? 0,
        cell: (row) => {
          return PermissionUtil.check(
            this.props.getStateApp.sessionAuth!,
            LanguageEndPointPermission.UPDATE
          ) ? (
            <span
              className="cursor-pointer"
              onClick={() =>
                this.setState({
                  selectedItemId: row._id,
                  isShowModalUpdateRank: true,
                })
              }
            >
              {row.rank ?? 0} <i className="fa fa-pencil-square-o"></i>
            </span>
          ) : (
            <span>{row.rank ?? 0}</span>
          );
        },
      },
      {
        name: this.props.t('default'),
        cell: (row) => {
          return row.isDefault ? (
            <span className="text-success fs-5">
              <i className="mdi mdi-check-circle"></i>
            </span>
          ) : (
            <span className="text-danger fs-5">
              <i className="mdi mdi-minus-circle"></i>
            </span>
          );
        },
      },
      {
        name: this.props.t('createdDate'),
        sortable: true,
        selector: (row) => new Date(row.createdAt || '').toLocaleDateString(),
        sortFunction: (a, b) => ComponentDataTable.dateSort(a, b),
      },
      PermissionUtil.check(
        this.props.getStateApp.sessionAuth!,
        LanguageEndPointPermission.UPDATE
      )
        ? {
            name: '',
            width: '70px',
            button: true,
            cell: (row) => (
              <button
                onClick={() => this.navigatePage('edit', row._id)}
                className="btn btn-gradient-warning"
              >
                <i className="fa fa-pencil-square-o"></i>
              </button>
            ),
          }
        : {},
    ];
  }

  render() {
    const item = this.state.items.findSingle('_id', this.state.selectedItemId);
    return this.props.getStateApp.isPageLoading ? null : (
      <div className="page-post">
        <ComponentThemeModalUpdateItemRank
          t={this.props.t}
          isShow={this.state.isShowModalUpdateRank}
          onHide={() => this.setState({ isShowModalUpdateRank: false })}
          onSubmit={(rank) => this.onChangeRank(rank)}
          rank={item?.rank}
          title={item?.title}
        />
        <div className="grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="table-post">
                <ComponentDataTable
                  columns={this.getTableColumns.filter(
                    (column) => typeof column.name !== 'undefined'
                  )}
                  data={this.state.showingItems}
                  onSearch={(searchKey) => this.onSearch(searchKey)}
                  i18={{
                    search: this.props.t('search'),
                    noRecords: this.props.t('noRecords'),
                  }}
                  isSearchable={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
