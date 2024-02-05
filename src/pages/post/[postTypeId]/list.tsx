import React, {Component} from 'react'
import {PageTypeId, PageTypes, PostTermTypeId, PostTypeId, Status, StatusId} from "constants/index";
import {PagePropCommonDocument} from "types/pageProps";
import {TableColumn} from "react-data-table-component";
import {ThemeToggleMenuItemDocument} from "components/theme/table/toggleMenu";
import Swal from "sweetalert2";
import postService from "services/post.service";
import {PostGetManyResultDocument} from "types/services/post.service";
import imageSourceLib from "lib/imageSource.lib";
import permissionLib from "lib/permission.lib";
import ThemeToast from "components/theme/toast";
import ThemeDataTable from "components/theme/table/dataTable";
import Image from "next/image"
import PostLib from "lib/post.lib";
import postLib from "lib/post.lib";
import ThemeBadgeStatus, {getStatusIcon} from "components/theme/badge/status";
import ThemeTableUpdatedBy from "components/theme/table/updatedBy";
import ThemeModalUpdateItemRank from "components/theme/modal/updateItemRank";
import {ProductTypeId} from "constants/productTypes";
import productLib from "lib/product.lib";
import {CurrencyId} from "constants/currencyTypes";
import ThemeBadgeProductType from "components/theme/badge/productType";
import ThemeBadgePageType from "components/theme/badge/pageType";

type PageState = {
    typeId: PostTypeId
    searchKey: string
    items: PostGetManyResultDocument[],
    showingItems: PageState["items"]
    selectedItems: PageState["items"]
    listMode: "list" | "deleted"
    selectedItemId: string
    isShowModalUpdateRank: boolean
};

type PageProps = {} & PagePropCommonDocument;

export default class PagePostList extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            typeId: Number(this.props.router.query.postTypeId ?? 1),
            searchKey: "",
            selectedItems: [],
            listMode: "list",
            items: [],
            showingItems: [],
            selectedItemId: "",
            isShowModalUpdateRank: false
        }
    }

    async componentDidMount() {
        this.setPageTitle();
        await this.getItems();
        this.props.setStateApp({
            isPageLoading: false
        })
    }

    async componentDidUpdate(prevProps: Readonly<PageProps>) {
        let typeId = Number(this.props.router.query.postTypeId ?? 1);
        if (typeId !== this.state.typeId) {
            this.setState({
                typeId: typeId
            }, async () => {
                await this.getItems();
                this.props.setStateApp({
                    isPageLoading: false
                })
            })

        }

        if (prevProps.getStateApp.pageData.langId != this.props.getStateApp.pageData.langId) {
            this.props.setStateApp({
                isPageLoading: true
            }, async () => {
                await this.getItems()
                this.props.setStateApp({
                    isPageLoading: false
                })
            })
        }
    }

    setPageTitle() {
        let titles: string[] = [
            ...postLib.getPageTitles({t: this.props.t, postTypeId: this.state.typeId}),
            this.props.t("list")
        ];
        this.props.setBreadCrumb(titles);
    }

    async getItems() {
        let items = (await postService.getMany({
            typeId: [this.state.typeId],
            langId: this.props.getStateApp.pageData.langId,
            ignoreDefaultLanguage: true
        })).data;
        this.setState((state: PageState) => {
            state.items = items;
            state.showingItems = items.filter(item => item.statusId !== StatusId.Deleted);
            return state;
        });
    }

    onChangeStatus = async (statusId: number) => {
        let selectedItemId = this.state.selectedItems.map(item => item._id);
        if (statusId === StatusId.Deleted && this.state.listMode === "deleted") {
            let result = await Swal.fire({
                title: this.props.t("deleteAction"),
                text: this.props.t("deleteSelectedItemsQuestion"),
                confirmButtonText: this.props.t("yes"),
                cancelButtonText: this.props.t("no"),
                icon: "question",
                showCancelButton: true
            });
            if (result.isConfirmed) {
                const loadingToast = new ThemeToast({
                    content: this.props.t("deleting"),
                    type: "loading"
                });

                let resData = await postService.deleteMany({_id: selectedItemId, typeId: this.state.typeId})
                loadingToast.hide();
                if (resData.status) {
                    this.setState((state: PageState) => {
                        state.items = state.items.filter(item => !selectedItemId.includes(item._id));
                        return state;
                    }, () => {
                        new ThemeToast({
                            type: "success",
                            title: this.props.t("successful"),
                            content: this.props.t("itemDeleted")
                        })
                        this.onChangeListMode(this.state.listMode);
                    })
                }
            }
        } else {
            const loadingToast = new ThemeToast({
                content: this.props.t("updating"),
                type: "loading"
            });

            let resData = await postService.updateManyStatus({
                _id: selectedItemId,
                typeId: this.state.typeId,
                statusId: statusId
            })
            loadingToast.hide();
            if (resData.status) {
                this.setState((state: PageState) => {
                    state.items.map((item, index) => {
                        if (selectedItemId.includes(item._id)) {
                            item.statusId = statusId;
                        }
                    })
                    return state;
                }, () => {
                    new ThemeToast({
                        type: "success",
                        title: this.props.t("successful"),
                        content: this.props.t("statusUpdated")
                    })
                    this.onChangeListMode(this.state.listMode);
                })
            }
        }
    }

    async onChangeRank(rank: number) {
        let resData = await postService.updateOneRank({
            _id: this.state.selectedItemId,
            typeId: this.state.typeId,
            rank: rank
        });

        if(resData.status){
            this.setState((state: PageState) => {
                let item = this.state.items.findSingle("_id", this.state.selectedItemId);
                if(item){
                    item.rank = rank;
                }
                return state;
            }, () => {
                this.onChangeListMode(this.state.listMode)
                let item = this.state.items.findSingle("_id", this.state.selectedItemId);
                new ThemeToast({
                    type: "success",
                    title: this.props.t("successful"),
                    content: `'${item?.contents?.title}' ${this.props.t("itemEdited")}`,
                    timeOut: 3
                })
            })
        }
    }

    onSelect(selectedRows: PageState["showingItems"]) {
        this.setState((state: PageState) => {
            state.selectedItems = selectedRows;
            return state;
        })
    }

    onSearch(searchKey: string) {
        this.setState({
            searchKey: searchKey,
            showingItems: this.state.showingItems.filter(item => (item.contents?.title ?? "").toLowerCase().search(searchKey) > -1)
        })
    }

    onChangeListMode(mode: PageState["listMode"]) {
        this.setState((state: PageState) => {
            state.listMode = mode;
            state.showingItems = [];
            state.selectedItems = [];
            if (mode === "list") {
                state.showingItems = state.items.findMulti("statusId", StatusId.Deleted, false);
            } else {
                state.showingItems = state.items.findMulti("statusId", StatusId.Deleted);
            }
            return state;
        }, () => this.onSearch(this.state.searchKey))
    }

    navigatePage(type: "termEdit" | "edit" | "termList", itemId = "", termTypeId = 0) {
        let postTypeId = this.state.typeId;
        let pagePath = PostLib.getPagePath(postTypeId);
        let path = "";
        switch (type) {
            case "edit":
                path = pagePath.edit(itemId);
                break;
            case "termEdit":
                path = pagePath.term(termTypeId).edit(itemId);
                break;
            case "termList":
                path = pagePath.term(termTypeId).list();
                break;
        }
        this.props.router.push(path);
    }

    get getToggleMenuItems(): ThemeToggleMenuItemDocument[] {
        return Status.findMulti("id", [
                StatusId.Active,
                StatusId.Pending,
                StatusId.InProgress
            ].concat(
                permissionLib.checkPermission(
                    this.props.getStateApp.sessionData.roleId,
                    this.props.getStateApp.sessionData.permissions,
                    permissionLib.getPermissionIdForPostType(this.state.typeId, "Delete")
                ) ? [StatusId.Deleted] : []
            )
        ).map(item => ({label: this.props.t(item.langKey), value: item.id, icon: getStatusIcon(item.id)}))
    }

    get getTableColumns(): TableColumn<PageState["showingItems"][0]>[] {
        return [
            {
                name: this.props.t("image"),
                width: "105px",
                cell: row => {
                    return Boolean(row.contents && row.contents.icon && row.contents.icon.length > 0)
                        ? <small>{row.contents?.icon}</small>
                        : <div className="image pt-2 pb-2">
                            <Image
                                src={imageSourceLib.getUploadedImageSrc(row.contents?.image)}
                                alt={row.contents?.title ?? ""}
                                className="post-image img-fluid"
                                width={75}
                                height={75}
                            />
                        </div>
                }
            },
            {
                name: this.props.t("title"),
                selector: row => row.contents?.title || this.props.t("[noLangAdd]"),
                cell: row => (
                    <div className="row w-100">
                        <div className="col-md-8">
                            {row.contents?.title || this.props.t("[noLangAdd]")}
                        </div>
                        <div className="col-md-4">
                            {
                                row.isFixed
                                    ? <i className="mdi mdi-pin text-success fs-5"></i>
                                    : null
                            }
                        </div>
                    </div>
                ),
                width: "250px",
                sortable: true
            },
            (
                [PostTypeId.Blog, PostTypeId.Portfolio, PostTypeId.Product, PostTypeId.BeforeAndAfter].includes(this.state.typeId)
                    ? {
                        name: this.props.t("category"),
                        cell: row => row.categories && row.categories.length > 0
                            ? <div className="d-flex flex-row flex-wrap">
                                {
                                    row.categories.map(item => {
                                            if (typeof item === "undefined") {
                                                return <label
                                                    className={`badge badge-gradient-danger m-1`}
                                                >{this.props.t("deleted")}</label>
                                            } else {
                                                return <label
                                                    onClick={() => this.navigatePage("termEdit", item._id, item.typeId)}
                                                    className={`badge badge-gradient-success m-1 cursor-pointer`}
                                                >{item.contents?.title || this.props.t("[noLangAdd]")}</label>
                                            }
                                        }
                                    )
                                }
                            </div> : this.props.t("notSelected")

                    } : {}
            ),
            (
                [PostTypeId.Product].includes(this.state.typeId)
                    ? {
                        name: this.props.t("productType"),
                        selector: row => row.eCommerce?.typeId || 0,
                        sortable: true,
                        cell: row => <ThemeBadgeProductType t={this.props.t} productTypeId={row.eCommerce?.typeId || ProductTypeId.SimpleProduct} />
                    } : {}
            ),
            (
                [PostTypeId.Product].includes(this.state.typeId)
                    ? {
                        name: this.props.t("price"),
                        selector: row => productLib.getPricingDefault(row).taxIncluded,
                        sortable: true,
                        cell: row => {
                            return (
                                <div>
                                    <span>{productLib.getPricingDefault(row).taxIncluded}</span>
                                    <span className="ms-1">{productLib.getCurrencyType(this.props.getStateApp.appData.currencyId)?.icon}</span>
                                </div>
                            );
                        },
                    } : {}
            ),
            (
                [PostTypeId.Page, PostTypeId.Blog, PostTypeId.Portfolio, PostTypeId.BeforeAndAfter, PostTypeId.Product].includes(this.state.typeId)
                    ? {
                        name: this.props.t("views"),
                        selector: row => row.views || 0,
                        sortable: true
                    } : {}
            ),
            (
                [PostTypeId.Page].includes(this.state.typeId)
                    ? {
                        name: this.props.t("pageType"),
                        selector: row => this.props.t(PageTypes.findSingle("id", (row.pageTypeId ? row.pageTypeId : PageTypeId.Default))?.langKey ?? "[noLangAdd]"),
                        sortable: true,
                        cell: row => <ThemeBadgePageType t={this.props.t} pageTypeId={row.pageTypeId || PageTypeId.Default} />
                    } : {}
            ),
            {
                name: this.props.t("status"),
                sortable: true,
                cell: row => <ThemeBadgeStatus t={this.props.t} statusId={row.statusId} />
            },
            {
                name: this.props.t("updatedBy"),
                sortable: true,
                cell: row => <ThemeTableUpdatedBy name={row.lastAuthorId.name} updatedAt={row.updatedAt || ""} />
            },
            {
                name: this.props.t("rank"),
                sortable: true,
                selector: row => row.rank ?? 0,
                cell: row => {
                    return  (
                        <span className="cursor-pointer" onClick={() => this.setState({selectedItemId: row._id, isShowModalUpdateRank: true})}>
                            {row.rank ?? 0} <i className="fa fa-pencil-square-o"></i>
                        </span>
                    )
                }
            },
            {
                name: this.props.t("createdDate"),
                sortable: true,
                selector: row => new Date(row.createdAt || "").toLocaleDateString(),
                sortFunction: (a, b) => ThemeDataTable.dateSort(a, b)
            },
            {
                name: "",
                width: "70px",
                button: true,
                cell: row => permissionLib.checkPermission(
                    this.props.getStateApp.sessionData.roleId,
                    this.props.getStateApp.sessionData.permissions,
                    permissionLib.getPermissionIdForPostType(row.typeId, "Edit")
                ) ? (
                    <button
                        onClick={() => this.navigatePage("edit", row._id)}
                        className="btn btn-gradient-warning"
                    ><i className="fa fa-pencil-square-o"></i></button>
                ) : null
            }
        ];
    }

    render() {
        let item = this.state.items.findSingle("_id", this.state.selectedItemId);
        return this.props.getStateApp.isPageLoading ? null : (
            <div className="page-post">
                <ThemeModalUpdateItemRank
                    t={this.props.t}
                    isShow={this.state.isShowModalUpdateRank}
                    onHide={() => this.setState({isShowModalUpdateRank: false})}
                    onSubmit={rank => this.onChangeRank(rank)}
                    rank={item?.rank}
                    title={item?.contents?.title}
                />
                <div className="row mb-3">
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-6 mb-3 mb-md-0">
                                <div className="row">
                                    {
                                        [PostTypeId.Blog, PostTypeId.Portfolio, PostTypeId.Product].includes(this.state.typeId)
                                            ? <div className="col-6">
                                                <button className="btn btn-gradient-success btn-lg w-100"
                                                        onClick={() => this.navigatePage("termList", "", PostTermTypeId.Category)}>
                                                    <i className="fa fa-pencil-square-o"></i> {this.props.t("editCategories").toCapitalizeCase()}
                                                </button>
                                            </div> : null
                                    }
                                    {
                                        [PostTypeId.Blog, PostTypeId.Portfolio, PostTypeId.Page, PostTypeId.Product].includes(this.state.typeId)
                                            ? <div className="col-6">
                                                <button className="btn btn-gradient-info btn-edit-tag btn-lg w-100"
                                                        onClick={() => this.navigatePage("termList", "", PostTermTypeId.Tag)}>
                                                    <i className="fa fa-pencil-square-o"></i> {this.props.t("editTags").toCapitalizeCase()}
                                                </button>
                                            </div> : null
                                    }
                                </div>
                            </div>
                            <div className="col-md-6 mb-3 mb-md-0">
                                <div className="row">
                                    {
                                        [PostTypeId.Product].includes(this.state.typeId)
                                            ? <div className="col-6">
                                                <button className="btn btn-gradient-primary btn-edit-tag btn-lg w-100"
                                                        onClick={() => this.navigatePage("termList", "", PostTermTypeId.Attributes)}>
                                                    <i className="fa fa-pencil-square-o"></i> {this.props.t("editAttribute").toCapitalizeCase()}
                                                </button>
                                            </div> : null
                                    }
                                    {
                                        [PostTypeId.Product].includes(this.state.typeId)
                                            ? <div className="col-6">
                                                <button className="btn btn-gradient-warning btn-edit-tag btn-lg w-100"
                                                        onClick={() => this.navigatePage("termList", "", PostTermTypeId.Variations)}>
                                                    <i className="fa fa-pencil-square-o"></i> {this.props.t("editVariation").toCapitalizeCase()}
                                                </button>
                                            </div> : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 text-end">
                        {
                            this.state.listMode === "list"
                                ? <button className="btn btn-gradient-danger btn-lg list-mode-btn"
                                          onClick={() => this.onChangeListMode("deleted")}>
                                    <i className="mdi mdi-delete"></i> {this.props.t("trash")} ({this.state.items.findMulti("statusId", StatusId.Deleted).length})
                                </button>
                                : <button className="btn btn-gradient-success btn-lg list-mode-btn"
                                          onClick={() => this.onChangeListMode("list")}>
                                    <i className="mdi mdi-view-list"></i> {this.props.t("list")} ({this.state.items.findMulti("statusId", StatusId.Deleted, false).length})
                                </button>
                        }
                    </div>
                </div>
                <div className="grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="table-post">
                                <ThemeDataTable
                                    columns={this.getTableColumns.filter(column => typeof column.name !== "undefined")}
                                    data={this.state.showingItems}
                                    onSelect={rows => this.onSelect(rows)}
                                    onSearch={searchKey => this.onSearch(searchKey)}
                                    selectedRows={this.state.selectedItems}
                                    t={this.props.t}
                                    isSelectable={(
                                        permissionLib.checkPermission(
                                            this.props.getStateApp.sessionData.roleId,
                                            this.props.getStateApp.sessionData.permissions,
                                            permissionLib.getPermissionIdForPostType(this.state.typeId, "Edit")
                                        ) ||
                                        permissionLib.checkPermission(
                                            this.props.getStateApp.sessionData.roleId,
                                            this.props.getStateApp.sessionData.permissions,
                                            permissionLib.getPermissionIdForPostType(this.state.typeId, "Delete")
                                        )
                                    )}
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
        )
    }
}
