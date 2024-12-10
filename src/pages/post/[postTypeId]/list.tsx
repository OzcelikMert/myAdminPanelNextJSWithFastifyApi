import React, { Component } from 'react';
import { IPagePropCommon } from 'types/pageProps';
import { TableColumn } from 'react-data-table-component';
import { IThemeToggleMenuItem } from '@components/elements/table/toggleMenu';
import Swal from 'sweetalert2';
import { PostService } from '@services/post.service';
import { IPostGetManyResultService } from 'types/services/post.service';
import ComponentToast from '@components/elements/toast';
import ComponentDataTable from '@components/elements/table/dataTable';
import Image from 'next/image';
import ComponentThemeBadgeStatus, {
  getStatusIcon,
} from '@components/theme/badge/status';
import ComponentTableUpdatedBy from '@components/elements/table/updatedBy';
import ComponentThemeModalUpdateItemRank from '@components/theme/modal/updateItemRank';
import { ProductTypeId } from '@constants/productTypes';
import ComponentThemeBadgeProductType from '@components/theme/badge/productType';
import ComponentThemeBadgePageType from '@components/theme/badge/pageType';
import { PostTypeId } from '@constants/postTypes';
import { PostUtil } from '@utils/post.util';
import { PermissionUtil, PostPermissionMethod } from '@utils/permission.util';
import { status, StatusId } from '@constants/status';
import { ImageSourceUtil } from '@utils/imageSource.util';
import { ProductUtil } from '@utils/product.util';
import { PageTypeId, pageTypes } from '@constants/pageTypes';
import { PostTermTypeId } from '@constants/postTermTypes';
import { RouteUtil } from '@utils/route.util';
import { UserRoleId } from '@constants/userRoles';
import ComponentToolTip from '@components/elements/tooltip';
import ComponentThemeToolTipMissingLanguages from '@components/theme/tooltip/missingLanguages';

type IPageState = {
  typeId: PostTypeId;
  searchKey: string;
  items: IPostGetManyResultService[];
  showingItems: IPageState['items'];
  selectedItems: IPageState['items'];
  listMode: 'list' | 'deleted';
  selectedItemId: string;
  isShowModalUpdateRank: boolean;
};

type IPageProps = {} & IPagePropCommon;

export default class PagePostList extends Component<IPageProps, IPageState> {
  abortController = new AbortController();

  constructor(props: IPageProps) {
    super(props);
    this.state = {
      typeId: Number(this.props.router.query.postTypeId ?? 1),
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
        PermissionUtil.getPostPermission(
          this.state.typeId,
          PostPermissionMethod.GET
        )
      )
    ) {
      this.setPageTitle();
      await this.getItems();
      this.props.setStateApp({
        isPageLoading: false,
      });
    }
  }

  async componentDidUpdate(prevProps: Readonly<IPageProps>) {
    const typeId = Number(this.props.router.query.postTypeId ?? 1);
    if (typeId !== this.state.typeId) {
      this.setState(
        {
          typeId: typeId,
        },
        async () => {
          await this.getItems();
          this.props.setStateApp({
            isPageLoading: false,
          });
        }
      );
    }
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  setPageTitle() {
    const titles: string[] = [
      ...PostUtil.getPageTitles({
        t: this.props.t,
        postTypeId: this.state.typeId,
      }),
      this.props.t('list'),
    ];
    this.props.setBreadCrumb(titles);
  }

  async getItems() {
    const result = await PostService.getMany(
      {
        typeId: [this.state.typeId],
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

        const serviceResult = await PostService.deleteMany(
          {
            _id: selectedItemId,
            typeId: this.state.typeId,
          },
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

      const serviceResult = await PostService.updateStatusMany(
        {
          _id: selectedItemId,
          typeId: this.state.typeId,
          statusId: statusId,
        },
        this.abortController.signal
      );
      loadingToast.hide();
      if (serviceResult.status) {
        this.setState(
          (state: IPageState) => {
            state.items.map((item, index) => {
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
    const serviceResult = await PostService.updateRankWithId(
      {
        _id: this.state.selectedItemId,
        typeId: this.state.typeId,
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

  navigatePage(
    type: 'termEdit' | 'edit' | 'termList',
    itemId = '',
    termTypeId = 0
  ) {
    const postTypeId = this.state.typeId;
    const pagePath = PostUtil.getPagePath(postTypeId);
    let path = '';
    switch (type) {
      case 'edit':
        path = pagePath.EDIT(itemId);
        break;
      case 'termEdit':
        path = pagePath.TERM_WITH(termTypeId).EDIT(itemId);
        break;
      case 'termList':
        path = pagePath.TERM_WITH(termTypeId).LIST;
        break;
    }
    RouteUtil.change({ props: this.props, path: path });
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
        name: this.props.t('image'),
        width: '105px',
        cell: (row) => {
          return row.contents &&
            row.contents.icon &&
            row.contents.icon.length > 0 ? (
            <small>{row.contents?.icon}</small>
          ) : (
            <div className="image pt-2 pb-2">
              <Image
                src={ImageSourceUtil.getUploadedImageSrc(row.contents?.image)}
                alt={row.contents?.title ?? ''}
                className="post-image img-fluid"
                width={75}
                height={75}
              />
            </div>
          );
        },
      },
      {
        name: this.props.t('title'),
        selector: (row) => row.contents?.title || this.props.t('[noLangAdd]'),
        cell: (row) => (
          <div className="row w-100">
            <div className="col-md-8">
              {
                <ComponentThemeToolTipMissingLanguages
                  itemLanguages={row.alternates ?? []}
                  contentLanguages={this.props.getStateApp.appData.contentLanguages}
                  t={this.props.t}
                />
              }
              {row.contents?.title || this.props.t('[noLangAdd]')}
            </div>
            <div className="col-md-4">
              {row.isFixed ? (
                <i className="mdi mdi-pin text-success fs-5"></i>
              ) : null}
            </div>
          </div>
        ),
        width: '250px',
        sortable: true,
      },
      [
        PostTypeId.Blog,
        PostTypeId.Portfolio,
        PostTypeId.Product,
        PostTypeId.BeforeAndAfter,
      ].includes(this.state.typeId)
        ? {
            name: this.props.t('category'),
            width: '250px',
            cell: (row) =>
              row.categories && row.categories.length > 0 ? (
                <div className="d-flex flex-row overflow-auto">
                  {row.categories.map((item) =>
                    typeof item != 'undefined' ? (
                      <label
                        onClick={() =>
                          this.navigatePage('termEdit', item._id, item.typeId)
                        }
                        className={`badge badge-gradient-success m-1 cursor-pointer`}
                      >
                        {item.contents?.title || this.props.t('[noLangAdd]')}
                      </label>
                    ) : null
                  )}
                </div>
              ) : (
                this.props.t('notSelected')
              ),
          }
        : {},
      [PostTypeId.Product].includes(this.state.typeId)
        ? {
            name: this.props.t('productType'),
            selector: (row) => row.eCommerce?.typeId || 0,
            sortable: true,
            cell: (row) => (
              <ComponentThemeBadgeProductType
                t={this.props.t}
                typeId={row.eCommerce?.typeId || ProductTypeId.SimpleProduct}
              />
            ),
          }
        : {},
      [PostTypeId.Product].includes(this.state.typeId)
        ? {
            name: this.props.t('price'),
            selector: (row) => ProductUtil.getPricingDefault(row).taxIncluded,
            sortable: true,
            cell: (row) => {
              return (
                <div>
                  <span>{ProductUtil.getPricingDefault(row).taxIncluded}</span>
                  <span className="ms-1">
                    {
                      ProductUtil.getCurrencyType(
                        this.props.getStateApp.appData.currencyId
                      )?.icon
                    }
                  </span>
                </div>
              );
            },
          }
        : {},
      [
        PostTypeId.Page,
        PostTypeId.Blog,
        PostTypeId.Portfolio,
        PostTypeId.BeforeAndAfter,
        PostTypeId.Product,
      ].includes(this.state.typeId)
        ? {
            name: this.props.t('views'),
            selector: (row) => row.views || 0,
            sortable: true,
          }
        : {},
      [PostTypeId.Page].includes(this.state.typeId)
        ? {
            name: this.props.t('pageType'),
            selector: (row) =>
              this.props.t(
                pageTypes.findSingle(
                  'id',
                  row.pageTypeId ? row.pageTypeId : PageTypeId.Default
                )?.langKey ?? '[noLangAdd]'
              ),
            sortable: true,
            cell: (row) => (
              <ComponentThemeBadgePageType
                t={this.props.t}
                typeId={row.pageTypeId || PageTypeId.Default}
              />
            ),
          }
        : {},
      {
        name: this.props.t('status'),
        sortable: true,
        cell: (row) => (
          <ComponentThemeBadgeStatus
            t={this.props.t}
            statusId={row.statusId}
            date={row.dateStart}
          />
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
          return (row.typeId == PostTypeId.Page &&
            PermissionUtil.checkPermissionRoleRank(
              this.props.getStateApp.sessionAuth!.user.roleId,
              UserRoleId.SuperAdmin
            )) ||
            (row.typeId != PostTypeId.Page &&
              PermissionUtil.check(
                this.props.getStateApp.sessionAuth!,
                PermissionUtil.getPostPermission(
                  this.state.typeId,
                  PostPermissionMethod.UPDATE
                )
              )) ? (
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
        PermissionUtil.getPostPermission(
          this.state.typeId,
          PostPermissionMethod.UPDATE
        )
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
    const isUserSuperAdmin = PermissionUtil.checkPermissionRoleRank(
      this.props.getStateApp.sessionAuth!.user.roleId,
      UserRoleId.SuperAdmin
    );
    const item = this.state.items.findSingle('_id', this.state.selectedItemId);
    return this.props.getStateApp.isPageLoading ? null : (
      <div className="page-post">
        <ComponentThemeModalUpdateItemRank
          t={this.props.t}
          isShow={this.state.isShowModalUpdateRank}
          onHide={() => this.setState({ isShowModalUpdateRank: false })}
          onSubmit={(rank) => this.onChangeRank(rank)}
          rank={item?.rank}
          title={item?.contents?.title}
        />
        <div className="row mb-3">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6 mb-3 mb-md-0">
                <div className="row">
                  {[
                    PostTypeId.Blog,
                    PostTypeId.Portfolio,
                    PostTypeId.Product,
                  ].includes(this.state.typeId) ? (
                    <div className="col-6">
                      <button
                        className="btn btn-gradient-success btn-lg w-100"
                        onClick={() =>
                          this.navigatePage(
                            'termList',
                            '',
                            PostTermTypeId.Category
                          )
                        }
                      >
                        <i className="fa fa-pencil-square-o"></i>{' '}
                        {this.props.t('editCategories').toCapitalizeCase()}
                      </button>
                    </div>
                  ) : null}
                  {[
                    PostTypeId.Blog,
                    PostTypeId.Portfolio,
                    PostTypeId.Page,
                    PostTypeId.Product,
                  ].includes(this.state.typeId) ? (
                    <div className="col-6">
                      <button
                        className="btn btn-gradient-info btn-edit-tag btn-lg w-100"
                        onClick={() =>
                          this.navigatePage('termList', '', PostTermTypeId.Tag)
                        }
                      >
                        <i className="fa fa-pencil-square-o"></i>{' '}
                        {this.props.t('editTags').toCapitalizeCase()}
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="col-md-6 mb-3 mb-md-0">
                <div className="row">
                  {[PostTypeId.Product].includes(this.state.typeId) ? (
                    <div className="col-6">
                      <button
                        className="btn btn-gradient-primary btn-edit-tag btn-lg w-100"
                        onClick={() =>
                          this.navigatePage(
                            'termList',
                            '',
                            PostTermTypeId.Attributes
                          )
                        }
                      >
                        <i className="fa fa-pencil-square-o"></i>{' '}
                        {this.props.t('editAttribute').toCapitalizeCase()}
                      </button>
                    </div>
                  ) : null}
                  {[PostTypeId.Product].includes(this.state.typeId) ? (
                    <div className="col-6">
                      <button
                        className="btn btn-gradient-warning btn-edit-tag btn-lg w-100"
                        onClick={() =>
                          this.navigatePage(
                            'termList',
                            '',
                            PostTermTypeId.Variations
                          )
                        }
                      >
                        <i className="fa fa-pencil-square-o"></i>{' '}
                        {this.props.t('editVariation').toCapitalizeCase()}
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 text-end">
            {PermissionUtil.check(
              this.props.getStateApp.sessionAuth!,
              PermissionUtil.getPostPermission(
                this.state.typeId,
                PostPermissionMethod.DELETE
              )
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
                  isSelectable={isUserSuperAdmin}
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
