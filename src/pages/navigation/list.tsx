import React, { Component } from 'react';
import { IPagePropCommon } from 'types/pageProps';
import { TableColumn } from 'react-data-table-component';
import Swal from 'sweetalert2';
import ComponentToast from '@components/elements/toast';
import ComponentDataTable from '@components/elements/table/dataTable';
import { INavigationGetResultService } from 'types/services/navigation.service';
import { NavigationService } from '@services/navigation.service';
import { IThemeToggleMenuItem } from '@components/elements/table/toggleMenu';
import ComponentThemeBadgeStatus, {
  getStatusIcon,
} from '@components/theme/badge/status';
import ComponentTableUpdatedBy from '@components/elements/table/updatedBy';
import ComponentThemeModalUpdateItemRank from '@components/theme/modal/updateItemRank';
import { PermissionUtil } from '@utils/permission.util';
import { NavigationEndPointPermission } from '@constants/endPointPermissions/navigation.endPoint.permission';
import { status, StatusId } from '@constants/status';
import { EndPoints } from '@constants/endPoints';
import { RouteUtil } from '@utils/route.util';
import ComponentThemeToolTipMissingLanguages from '@components/theme/tooltip/missingLanguages';

type IPageState = {
  searchKey: string;
  items: INavigationGetResultService[];
  showingItems: INavigationGetResultService[];
  selectedItems: INavigationGetResultService[];
  listMode: 'list' | 'deleted';
  selectedItemId: string;
  isShowModalUpdateRank: boolean;
};

type IPageProps = {} & IPagePropCommon;

export default class PageNavigationList extends Component<
  IPageProps,
  IPageState
> {
  abortController = new AbortController();

  constructor(props: IPageProps) {
    super(props);
    this.state = {
      searchKey: '',
      selectedItems: [],
      listMode: 'list',
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
        NavigationEndPointPermission.GET
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
      this.props.t('navigations'),
      this.props.t('list'),
    ]);
  }

  async getItems() {
    const result = await NavigationService.getMany(
      {
        langId: this.props.getStateApp.appData.currentLangId,
      },
      this.abortController.signal
    );

    if (result.status && result.data) {
      this.setState((state: IPageState) => {
        state.items = result.data!;
        state.showingItems = result.data!.filter(
          (item) => item.statusId !== StatusId.Deleted
        );
        return state;
      });
    }
  }

  onChangeStatus = async (statusId: number) => {
    const selectedItemId = this.state.selectedItems.map((item) => item._id);
    if (statusId === StatusId.Deleted && this.state.listMode === 'deleted') {
      const result = await Swal.fire({
        title: this.props.t('deleteAction'),
        text: this.props.t('deleteSelectedItemsQuestion'),
        confirmButtonText: this.props.t('yes'),
        cancelButtonText: this.props.t('no'),
        icon: 'question',
        showCancelButton: true,
      });
      if (result.isConfirmed) {
        const loadingToast = new ComponentToast({
          content: this.props.t('deleting'),
          type: 'loading',
        });

        const serviceResult = await NavigationService.deleteMany(
          { _id: selectedItemId },
          this.abortController.signal
        );
        loadingToast.hide();
        if (serviceResult.status) {
          this.setState(
            (state: IPageState) => {
              state.items = state.items.filter(
                (item) => !selectedItemId.includes(item._id)
              );
              return state;
            },
            () => {
              new ComponentToast({
                type: 'success',
                title: this.props.t('successful'),
                content: this.props.t('itemDeleted'),
              });
              this.onChangeListMode(this.state.listMode);
            }
          );
        }
      }
    } else {
      const loadingToast = new ComponentToast({
        content: this.props.t('updating'),
        type: 'loading',
      });
      const serviceResult = await NavigationService.updateStatusMany(
        {
          _id: selectedItemId,
          statusId: statusId,
        },
        this.abortController.signal
      );
      loadingToast.hide();
      if (serviceResult.status) {
        this.setState(
          (state: IPageState) => {
            state.items.map((item) => {
              if (selectedItemId.includes(item._id)) {
                item.statusId = statusId;
              }
            });
            return state;
          },
          () => {
            new ComponentToast({
              type: 'success',
              title: this.props.t('successful'),
              content: this.props.t('statusUpdated'),
            });
            this.onChangeListMode(this.state.listMode);
          }
        );
      }
    }
  };

  async onChangeRank(rank: number) {
    const serviceResult = await NavigationService.updateRankWithId(
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
          this.onChangeListMode(this.state.listMode);
          const item = this.state.items.findSingle(
            '_id',
            this.state.selectedItemId
          );
          new ComponentToast({
            type: 'success',
            title: this.props.t('successful'),
            content: `'${item?.contents?.title}' ${this.props.t('itemEdited')}`,
            timeOut: 3,
          });
        }
      );
    }
  }

  onSelect(selectedRows: IPageState['showingItems']) {
    this.setState((state: IPageState) => {
      state.selectedItems = selectedRows;
      return state;
    });
  }

  onSearch(searchKey: string) {
    this.setState({
      searchKey: searchKey,
      showingItems: this.state.showingItems.filter(
        (item) =>
          (item.contents?.title ?? '').toLowerCase().search(searchKey) > -1
      ),
    });
  }

  onChangeListMode(mode: IPageState['listMode']) {
    this.setState(
      (state: IPageState) => {
        state.listMode = mode;
        state.showingItems = [];
        state.selectedItems = [];
        if (mode === 'list') {
          state.showingItems = state.items.findMulti(
            'statusId',
            StatusId.Deleted,
            false
          );
        } else {
          state.showingItems = state.items.findMulti(
            'statusId',
            StatusId.Deleted
          );
        }
        return state;
      },
      () => this.onSearch(this.state.searchKey)
    );
  }

  navigatePage(type: 'edit', itemId = '') {
    const pagePath = EndPoints.NAVIGATION_WITH;
    switch (type) {
      case 'edit':
        RouteUtil.change({ props: this.props, path: pagePath.EDIT(itemId) });
        break;
    }
  }

  onClickUpdateRank(itemId: string) {
    this.setState({ selectedItemId: itemId, isShowModalUpdateRank: true });
  }

  get getToggleMenuItems(): IThemeToggleMenuItem[] {
    return status
      .findMulti('id', [StatusId.Active, StatusId.InProgress, StatusId.Deleted])
      .map((item) => ({
        label: this.props.t(item.langKey),
        value: item.id,
        icon: getStatusIcon(item.id),
      }));
  }

  get getTableColumns(): TableColumn<IPageState['showingItems'][0]>[] {
    return [
      {
        name: this.props.t('title'),
        selector: (row) => row.contents?.title || this.props.t('[noLangAdd]'),
        cell: (row) => (
          <div className="row w-100">
            <div className="col-md-12">
              {
                <ComponentThemeToolTipMissingLanguages
                  itemLanguages={row.alternates ?? []}
                  contentLanguages={this.props.getStateApp.appData.contentLanguages}
                  t={this.props.t}
                />
              }
              {row.parentId ? <span className="pe-3">-</span> : null}
              {row.contents?.title || this.props.t('[noLangAdd]')}
            </div>
          </div>
        ),
        width: '250px',
        sortable: true,
      },
      {
        name: this.props.t('main'),
        selector: (row) =>
          row.parentId
            ? row.parentId.contents?.title || this.props.t('[noLangAdd]')
            : this.props.t('notSelected'),
        sortable: true,
      },
      {
        name: this.props.t('status'),
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
      {
        name: this.props.t('rank'),
        sortable: true,
        selector: (row) => row.rank ?? 0,
        cell: (row) => {
          return PermissionUtil.check(
            this.props.getStateApp.sessionAuth!,
            NavigationEndPointPermission.UPDATE
          ) ? (
            <span
              className="cursor-pointer"
              onClick={() => this.onClickUpdateRank(row._id)}
            >
              {row.rank ?? 0} <i className="fa fa-pencil-square-o"></i>
            </span>
          ) : (
            <span>{row.rank ?? 0}</span>
          );
        },
      },
      {
        name: this.props.t('createdDate'),
        sortable: true,
        selector: (row) => new Date(row.createdAt || '').toLocaleDateString(),
        sortFunction: (a, b) => ComponentDataTable.dateSort(a, b),
        cell: (row) => (
          <ComponentTableUpdatedBy
            name={row.authorId.name}
            updatedAt={row.createdAt || ''}
          />
        ),
      },
      PermissionUtil.check(
        this.props.getStateApp.sessionAuth!,
        NavigationEndPointPermission.UPDATE
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
      <div className="page-navigation">
        <ComponentThemeModalUpdateItemRank
          t={this.props.t}
          isShow={this.state.isShowModalUpdateRank}
          onHide={() => this.setState({ isShowModalUpdateRank: false })}
          onSubmit={(rank) => this.onChangeRank(rank)}
          rank={item?.rank}
          title={item?.contents?.title}
        />
        <div className="row mb-3">
          <div className="col-md-3"></div>
          <div className="col-md-9 text-end">
            {PermissionUtil.check(
              this.props.getStateApp.sessionAuth!,
              NavigationEndPointPermission.DELETE
            ) ? (
              this.state.listMode === 'list' ? (
                <button
                  className="btn btn-gradient-danger btn-lg list-mode-btn"
                  onClick={() => this.onChangeListMode('deleted')}
                >
                  <i className="mdi mdi-delete"></i> {this.props.t('trash')} (
                  {
                    this.state.items.findMulti('statusId', StatusId.Deleted)
                      .length
                  }
                  )
                </button>
              ) : (
                <button
                  className="btn btn-gradient-success btn-lg list-mode-btn"
                  onClick={() => this.onChangeListMode('list')}
                >
                  <i className="mdi mdi-view-list"></i> {this.props.t('list')} (
                  {
                    this.state.items.findMulti(
                      'statusId',
                      StatusId.Deleted,
                      false
                    ).length
                  }
                  )
                </button>
              )
            ) : null}
          </div>
        </div>
        <div className="grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="table-post">
                <ComponentDataTable
                  columns={this.getTableColumns.filter(
                    (column) => typeof column.name !== 'undefined'
                  )}
                  data={this.state.showingItems}
                  onSelect={(rows) => this.onSelect(rows)}
                  onSearch={(searchKey) => this.onSearch(searchKey)}
                  selectedRows={this.state.selectedItems}
                  i18={{
                    search: this.props.t('search'),
                    noRecords: this.props.t('noRecords'),
                  }}
                  isSelectable={
                    PermissionUtil.check(
                      this.props.getStateApp.sessionAuth!,
                      NavigationEndPointPermission.UPDATE
                    ) ||
                    PermissionUtil.check(
                      this.props.getStateApp.sessionAuth!,
                      NavigationEndPointPermission.DELETE
                    )
                  }
                  isAllSelectable={true}
                  isSearchable={true}
                  isActiveToggleMenu={true}
                  toggleMenuItems={this.getToggleMenuItems}
                  onSubmitToggleMenuItem={(value) => this.onChangeStatus(value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
