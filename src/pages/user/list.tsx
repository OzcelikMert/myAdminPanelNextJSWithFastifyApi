import React, { Component } from 'react';
import { IPagePropCommon } from 'types/pageProps';
import { TableColumn } from 'react-data-table-component';
import Swal from 'sweetalert2';
import { IUserGetResultService } from 'types/services/user.service';
import ComponentThemeUsersProfileCard from '@components/theme/users/profileCard';
import { UserService } from '@services/user.service';
import ComponentToast from '@components/elements/toast';
import ComponentDataTable from '@components/elements/table/dataTable';
import Image from 'next/image';
import ComponentThemeBadgeStatus from '@components/theme/badge/status';
import ComponentThemeBadgeUserRole from '@components/theme/badge/userRole';
import { UserRoleId, userRoles } from '@constants/userRoles';
import { PermissionUtil } from '@utils/permission.util';
import { UserEndPointPermission } from '@constants/endPointPermissions/user.endPoint.permission';
import { EndPoints } from '@constants/endPoints';
import { ImageSourceUtil } from '@utils/imageSource.util';
import { status } from '@constants/status';
import ComponentTableUpdatedBy from '@components/elements/table/updatedBy';
import { RouteUtil } from '@utils/route.util';

type IPageState = {
  searchKey: string;
  items: IUserGetResultService[];
  showingItems: IPageState['items'];
  isViewItemInfo: boolean;
  selectedItemId: string;
};

type IPageProps = {} & IPagePropCommon;

export default class PageUserList extends Component<IPageProps, IPageState> {
  abortController = new AbortController();

  constructor(props: IPageProps) {
    super(props);
    this.state = {
      searchKey: '',
      showingItems: [],
      items: [],
      isViewItemInfo: false,
      selectedItemId: '',
    };
  }

  async componentDidMount() {
    if (
      PermissionUtil.checkAndRedirect(this.props, UserEndPointPermission.GET)
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
      this.props.t('users'),
      this.props.t('list'),
    ]);
  }

  async getItems() {
    const result = await UserService.getMany({}, this.abortController.signal);
    if (result.status && result.data) {
      const items = result.data.orderBy('roleId', 'desc');
      this.setState(
        (state: IPageState) => {
          state.items = items
            .filter((item) => item.roleId != UserRoleId.SuperAdmin)
            .sort((item) => {
              let sort = 0;
              if (item._id == this.props.getStateApp.sessionAuth!.user.userId) {
                sort = 1;
              }
              return sort;
            });
          return state;
        },
        () => this.onSearch(this.state.searchKey)
      );
    }
  }

  async onDelete(userId: string) {
    const item = this.state.items.findSingle('_id', userId);
    if (item) {
      const result = await Swal.fire({
        title: this.props.t('deleteAction'),
        html: `<b>'${item.name}'</b> ${this.props.t('deleteItemQuestionWithItemName')}`,
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

        const serviceResult = await UserService.deleteWithId(
          { _id: userId },
          this.abortController.signal
        );
        loadingToast.hide();
        if (serviceResult.status) {
          this.setState(
            (state: IPageState) => {
              state.items = state.items.filter((item) => userId !== item._id);
              return state;
            },
            () => {
              this.onSearch(this.state.searchKey);
              new ComponentToast({
                type: 'success',
                title: this.props.t('successful'),
                content: this.props.t('itemDeleted'),
              });
            }
          );
        }
      }
    }
  }

  onViewUser(userId: string) {
    this.setState({
      isViewItemInfo: true,
      selectedItemId: userId,
    });
  }

  onSearch(searchKey: string) {
    this.setState({
      searchKey: searchKey,
      showingItems: this.state.items.filter(
        (item) => item.name.toLowerCase().search(searchKey) > -1
      ),
    });
  }

  navigatePage(type: 'edit', itemId = '') {
    const path = EndPoints.USER_WITH.EDIT(itemId);
    RouteUtil.change({ props: this.props, path: path });
  }

  get getTableColumns(): TableColumn<IPageState['items'][0]>[] {
    return [
      {
        name: this.props.t('image'),
        width: '105px',
        cell: (row) => (
          <div className="image mt-2 mb-2">
            <Image
              src={ImageSourceUtil.getUploadedImageSrc(row.image)}
              alt={row.name}
              width={75}
              height={75}
              className="img-fluid"
            />
            <span
              className={`availability-status ${row.isOnline ? 'online' : 'offline'}`}
            ></span>
          </div>
        ),
      },
      {
        name: this.props.t('name'),
        selector: (row) => row.name,
        sortable: true,
        cell: (row) => <b>{row.name}</b>,
      },
      {
        id: 'userRole',
        name: this.props.t('role'),
        selector: (row) => userRoles.findSingle('id', row.roleId)?.rank ?? 0,
        sortable: true,
        cell: (row) => (
          <ComponentThemeBadgeUserRole
            t={this.props.t}
            userRoleId={row.roleId}
          />
        ),
      },
      {
        name: this.props.t('updatedBy'),
        sortable: true,
        cell: (row) => (
          <ComponentTableUpdatedBy
            name={row.lastAuthorId?.name || ''}
            updatedAt={row.updatedAt || ''}
          />
        ),
      },
      {
        name: this.props.t('status'),
        selector: (row) => status.findSingle('id', row.statusId)?.rank ?? 0,
        sortable: true,
        cell: (row) => (
          <ComponentThemeBadgeStatus t={this.props.t} statusId={row.statusId} />
        ),
      },
      {
        name: this.props.t('createdDate'),
        sortable: true,
        selector: (row) => new Date(row.createdAt || '').toLocaleDateString(),
        sortFunction: (a, b) => ComponentDataTable.dateSort(a, b),
        cell: (row) => (
          <ComponentTableUpdatedBy
            name={row.authorId?.name || ''}
            updatedAt={row.createdAt || ''}
          />
        ),
      },
      {
        name: '',
        width: '70px',
        cell: (row) => (
          <button
            onClick={() => this.onViewUser(row._id)}
            className="btn btn-gradient-info"
          >
            <i className="mdi mdi-eye"></i>
          </button>
        ),
      },
      PermissionUtil.check(
        this.props.getStateApp.sessionAuth!,
        UserEndPointPermission.UPDATE
      )
        ? {
            name: '',
            button: true,
            width: '70px',
            cell: (row) => {
              const sessionUserRole = userRoles.findSingle(
                'id',
                this.props.getStateApp.sessionAuth?.user.roleId
              );
              const rowUserRole = userRoles.findSingle('id', row.roleId);
              return sessionUserRole &&
                rowUserRole &&
                rowUserRole.rank < sessionUserRole.rank ? (
                <button
                  onClick={() => this.navigatePage('edit', row._id)}
                  className="btn btn-gradient-warning"
                >
                  <i className="fa fa-pencil-square-o"></i>
                </button>
              ) : null;
            },
          }
        : {},
      PermissionUtil.check(
        this.props.getStateApp.sessionAuth!,
        UserEndPointPermission.DELETE
      )
        ? {
            name: '',
            button: true,
            width: '70px',
            cell: (row) => {
              const sessionUserRole = userRoles.findSingle(
                'id',
                this.props.getStateApp.sessionAuth?.user.roleId
              );
              const rowUserRole = userRoles.findSingle('id', row.roleId);
              return sessionUserRole &&
                rowUserRole &&
                rowUserRole.rank < sessionUserRole.rank ? (
                <button
                  onClick={() => this.onDelete(row._id)}
                  className="btn btn-gradient-danger"
                >
                  <i className="mdi mdi-trash-can-outline"></i>
                </button>
              ) : null;
            },
          }
        : {},
    ];
  }

  render() {
    return this.props.getStateApp.isPageLoading ? null : (
      <div className="page-user">
        {(() => {
          const userInfo = this.state.items.findSingle(
            '_id',
            this.state.selectedItemId
          );
          return userInfo ? (
            <ComponentThemeUsersProfileCard
              {...this.props}
              onClose={() => {
                this.setState({ isViewItemInfo: false });
              }}
              isShow={this.state.isViewItemInfo}
              userInfo={userInfo}
            />
          ) : null;
        })()}
        <div className="grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="table-user">
                <ComponentDataTable
                  columns={this.getTableColumns.filter(
                    (column) => typeof column.name !== 'undefined'
                  )}
                  data={this.state.showingItems}
                  i18={{
                    search: this.props.t('search'),
                    noRecords: this.props.t('noRecords'),
                  }}
                  isSearchable={true}
                  onSearch={(searchKey) => this.onSearch(searchKey)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
