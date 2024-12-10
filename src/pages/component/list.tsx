import React, { Component } from 'react';
import { IPagePropCommon } from 'types/pageProps';
import { TableColumn } from 'react-data-table-component';
import Swal from 'sweetalert2';
import ComponentToast from '@components/elements/toast';
import ComponentDataTable from '@components/elements/table/dataTable';
import ComponentTableUpdatedBy from '@components/elements/table/updatedBy';
import { PermissionUtil } from '@utils/permission.util';
import { EndPoints } from '@constants/endPoints';
import { IComponentGetResultService } from 'types/services/component.service';
import { ComponentEndPointPermission } from '@constants/endPointPermissions/component.endPoint.permission';
import { ComponentService } from '@services/component.service';
import { UserRoleId } from '@constants/userRoles';
import ComponentThemeBadgeComponentType from '@components/theme/badge/componentType';
import { ComponentTypeId } from '@constants/componentTypes';
import { RouteUtil } from '@utils/route.util';
import ComponentThemeToolTipMissingLanguages from '@components/theme/tooltip/missingLanguages';

type IPageState = {
  searchKey: string;
  items: IComponentGetResultService[];
  showingItems: IComponentGetResultService[];
};

type IPageProps = {} & IPagePropCommon;

export default class PageComponentList extends Component<
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
    };
  }

  async componentDidMount() {
    if (
      PermissionUtil.checkAndRedirect(
        this.props,
        ComponentEndPointPermission.GET
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
      this.props.t('components'),
      this.props.t('list'),
    ]);
  }

  async getItems() {
    const result = await ComponentService.getMany(
      {
        langId: this.props.getStateApp.appData.currentLangId,
      },
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

  async onDelete(_id: string) {
    const item = this.state.items.findSingle('_id', _id);
    if (item) {
      const result = await Swal.fire({
        title: this.props.t('deleteAction'),
        html: `<b>'${item.title}'</b> ${this.props.t('deleteItemQuestionWithItemName')}`,
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

        const serviceResult = await ComponentService.deleteMany(
          { _id: [_id] },
          this.abortController.signal
        );
        loadingToast.hide();
        if (serviceResult.status) {
          this.setState(
            (state: IPageState) => {
              state.items = state.items.filter((item) => _id !== item._id);
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

  onSearch(searchKey: string) {
    this.setState({
      searchKey: searchKey,
      showingItems: this.state.items.filter(
        (item) => (item?.title ?? '').toLowerCase().search(searchKey) > -1
      ),
    });
  }

  async navigatePage(type: 'edit', itemId = '') {
    const pagePath = EndPoints.COMPONENT_WITH;
    switch (type) {
      case 'edit':
        await RouteUtil.change({
          props: this.props,
          path: pagePath.EDIT(itemId),
        });
        break;
    }
  }

  get getTableColumns(): TableColumn<IPageState['showingItems'][0]>[] {
    return [
      {
        name: this.props.t('title'),
        selector: (row) => row.title,
        cell: (row) => {
          return (
            <div className="row w-100">
              <div className="col-md-12">
                {
                  <ComponentThemeToolTipMissingLanguages
                    itemLanguages={row.elements.map(element => element.alternates ?? []) ?? []}
                    contentLanguages={this.props.getStateApp.appData.contentLanguages}
                    t={this.props.t}
                  />
                }
                {row.title}
                </div>
            </div>
          )
        },
        sortable: true,
      },
      PermissionUtil.checkPermissionRoleRank(
        this.props.getStateApp.sessionAuth!.user.roleId,
        UserRoleId.SuperAdmin
      )
        ? {
            name: this.props.t('key'),
            selector: (row) => row.key,
            sortable: true,
          }
        : {},
      {
        name: this.props.t('typeId'),
        sortable: true,
        selector: (row) => row.typeId,
        cell: (row) => (
          <ComponentThemeBadgeComponentType
            t={this.props.t}
            typeId={row.typeId || ComponentTypeId.Private}
          />
        ),
      },
      {
        name: this.props.t('updatedBy'),
        sortable: true,
        selector: (row) => new Date(row.updatedAt || '').toLocaleDateString(),
        cell: (row) => (
          <ComponentTableUpdatedBy
            name={row.lastAuthorId.name}
            updatedAt={row.updatedAt || ''}
          />
        ),
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
        ComponentEndPointPermission.UPDATE
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
      PermissionUtil.check(
        this.props.getStateApp.sessionAuth!,
        ComponentEndPointPermission.DELETE
      )
        ? {
            name: '',
            width: '70px',
            button: true,
            cell: (row) => (
              <button
                onClick={() => this.onDelete(row._id)}
                className="btn btn-gradient-danger"
              >
                <i className="mdi mdi-trash-can-outline"></i>
              </button>
            ),
          }
        : {},
    ];
  }

  render() {
    return this.props.getStateApp.isPageLoading ? null : (
      <div className="page-component">
        <div className="grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="table-post">
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
