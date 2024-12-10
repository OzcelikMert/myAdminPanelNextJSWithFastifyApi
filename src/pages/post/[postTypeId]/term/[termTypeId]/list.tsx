import React, { Component } from 'react';
import { IPagePropCommon } from 'types/pageProps';
import { TableColumn } from 'react-data-table-component';
import { IThemeToggleMenuItem } from '@components/elements/table/toggleMenu';
import Swal from 'sweetalert2';
import { IPostTermGetResultService } from 'types/services/postTerm.service';
import { PostTermService } from '@services/postTerm.service';
import ComponentToast from '@components/elements/toast';
import ComponentDataTable from '@components/elements/table/dataTable';
import Image from 'next/image';
import ComponentThemeBadgeStatus, {
  getStatusIcon,
} from '@components/theme/badge/status';
import ComponentTableUpdatedBy from '@components/elements/table/updatedBy';
import ComponentThemeModalUpdateItemRank from '@components/theme/modal/updateItemRank';
import { PostTermTypeId } from '@constants/postTermTypes';
import { PostTypeId } from '@constants/postTypes';
import { PermissionUtil, PostPermissionMethod } from '@utils/permission.util';
import { PostUtil } from '@utils/post.util';
import { status, StatusId } from '@constants/status';
import { ImageSourceUtil } from '@utils/imageSource.util';
import { RouteUtil } from '@utils/route.util';
import ComponentThemeToolTipMissingLanguages from '@components/theme/tooltip/missingLanguages';

type IPageState = {
  typeId: PostTermTypeId;
  postTypeId: PostTypeId;
  searchKey: string;
  items: IPostTermGetResultService[];
  showingItems: IPageState['items'];
  selectedItems: IPageState['items'];
  listMode: 'list' | 'deleted';
  selectedItemId: string;
  isShowModalUpdateRank: boolean;
};

type IPageProps = {} & IPagePropCommon;

export default class PagePostTermList extends Component<
  IPageProps,
  IPageState
> {
  abortController = new AbortController();

  constructor(props: IPageProps) {
    super(props);
    this.state = {
      typeId: Number(this.props.router.query.termTypeId ?? 1),
      postTypeId: Number(this.props.router.query.postTypeId ?? 1),
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
          this.state.postTypeId,
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

  componentWillUnmount() {
    this.abortController.abort();
  }

  setPageTitle() {
    const titles: string[] = [
      ...PostUtil.getPageTitles({
        t: this.props.t,
        postTypeId: this.state.postTypeId,
        termTypeId: this.state.typeId,
      }),
      this.props.t('list'),
    ];

    this.props.setBreadCrumb(titles);
  }

  async getItems() {
    const result = await PostTermService.getMany(
      {
        typeId: [this.state.typeId],
        postTypeId: this.state.postTypeId,
        langId: this.props.getStateApp.appData.currentLangId,
        withPostCount: [PostTermTypeId.Category].includes(this.state.typeId),
      },
      this.abortController.signal
    );

    if (result.status && result.data) {
      this.setState({
        items: result.data!,
        showingItems: result.data!.filter(
          (item) => item.statusId !== StatusId.Deleted
        ),
      });
    }
  }

  async onChangeStatus(statusId: number) {
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

        const serviceResult = await PostTermService.deleteMany(
          {
            _id: selectedItemId,
            typeId: this.state.typeId,
            postTypeId: this.state.postTypeId,
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

      const serviceResult = await PostTermService.updateStatusMany(
        {
          _id: selectedItemId,
          typeId: this.state.typeId,
          postTypeId: this.state.postTypeId,
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
  }

  async onChangeRank(rank: number) {
    const serviceResult = await PostTermService.updateRankWithId(
      {
        _id: this.state.selectedItemId,
        rank: rank,
        postTypeId: this.state.postTypeId,
        typeId: this.state.typeId,
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

  navigatePage(type: 'add' | 'back' | 'edit', postTermId = '') {
    const postTypeId = this.state.postTypeId;
    const postTermTypeId = this.state.typeId;
    const pagePath = PostUtil.getPagePath(postTypeId);
    let path = '';
    switch (type) {
      case 'add':
        path = pagePath.TERM_WITH(postTermTypeId).ADD;
        break;
      case 'edit':
        path = pagePath.TERM_WITH(postTermTypeId).EDIT(postTermId);
        break;
      case 'back':
        path = pagePath.LIST;
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
        cell: (row) => (
          <div className="image pt-2 pb-2">
            <Image
              src={ImageSourceUtil.getUploadedImageSrc(row.contents?.image)}
              alt={row.contents?.title ?? ''}
              width={75}
              height={75}
              className="img-fluid"
            />
          </div>
        ),
      },
      {
        name: this.props.t('title'),
        selector: (row) => row.contents?.title || this.props.t('[noLangAdd]'),
        sortable: true,
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
              {row.contents?.title || this.props.t('[noLangAdd]')}
            </div>
          </div>
        ),
        width: '250px',
      },
      [PostTermTypeId.Category, PostTermTypeId.Variations].includes(
        this.state.typeId
      )
        ? {
            name: this.props.t('main'),
            selector: (row) =>
              row.parentId
                ? row.parentId.contents?.title || this.props.t('[noLangAdd]')
                : this.props.t('notSelected'),
            sortable: true,
          }
        : {},
      [PostTermTypeId.Category].includes(this.state.typeId)
        ? {
            name: this.props.t('numberOfUses'),
            sortable: true,
            selector: (row) => row.postCount ?? 0,
          }
        : {},
      {
        name: this.props.t('views'),
        selector: (row) => row.views || 0,
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
            PermissionUtil.getPostPermission(
              this.state.postTypeId,
              PostPermissionMethod.UPDATE
            )
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
        PermissionUtil.getPostPermission(
          this.state.postTypeId,
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
    const item = this.state.items.findSingle('_id', this.state.selectedItemId);
    return this.props.getStateApp.isPageLoading ? null : (
      <div className="page-post-term">
        <ComponentThemeModalUpdateItemRank
          t={this.props.t}
          isShow={this.state.isShowModalUpdateRank}
          onHide={() => this.setState({ isShowModalUpdateRank: false })}
          onSubmit={(rank) => this.onChangeRank(rank)}
          rank={item?.rank}
          title={item?.contents?.title}
        />
        <div className="row">
          <div className="col-md-3 mb-3">
            <div className="row">
              <div className="col-6">
                <button
                  className="btn btn-gradient-dark btn-lg w-100"
                  onClick={() => this.navigatePage('back')}
                >
                  <i className="mdi mdi-arrow-left"></i>{' '}
                  {this.props.t('returnBack')}
                </button>
              </div>
              <div className="col-6 text-end">
                {PermissionUtil.check(
                  this.props.getStateApp.sessionAuth!,
                  PermissionUtil.getPostPermission(
                    this.state.postTypeId,
                    PostPermissionMethod.ADD
                  )
                ) ? (
                  <button
                    className="btn btn-gradient-info btn-lg w-100"
                    onClick={() => this.navigatePage('add')}
                  >
                    + {this.props.t('addNew')}
                  </button>
                ) : null}
              </div>
            </div>
          </div>
          <div className="col-md-9 mb-3 text-end">
            {PermissionUtil.check(
              this.props.getStateApp.sessionAuth!,
              PermissionUtil.getPostPermission(
                this.state.postTypeId,
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
                  columns={this.getTableColumns}
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
                      PermissionUtil.getPostPermission(
                        this.state.postTypeId,
                        PostPermissionMethod.UPDATE
                      )
                    ) ||
                    PermissionUtil.check(
                      this.props.getStateApp.sessionAuth!,
                      PermissionUtil.getPostPermission(
                        this.state.postTypeId,
                        PostPermissionMethod.DELETE
                      )
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
