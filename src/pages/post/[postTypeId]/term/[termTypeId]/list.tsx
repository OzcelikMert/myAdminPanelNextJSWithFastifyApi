import React, {Component} from 'react'
import {
    PostTermTypeId,
    PostTypeId,
    Status,
    StatusId
} from "constants/index";
import {IPagePropCommon} from "types/pageProps";
import {TableColumn} from "react-data-table-component";
import {ThemeToggleMenuItemDocument} from "components/theme/table/toggleMenu";
import Swal from "sweetalert2";
import {IPostTermGetResultService} from "types/services/postTerm.service";
import postTermService from "services/postTerm.service";
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

type PageState = {
    typeId: PostTermTypeId
    postTypeId: PostTypeId
    searchKey: string
    items: IPostTermGetResultService[],
    showingItems: PageState["items"]
    selectedItems: PageState["items"]
    listMode: "list" | "deleted"
    selectedItemId: string
    isShowModalUpdateRank: boolean
};

type PageProps = {} & IPagePropCommon;

export default class PagePostTermList extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            typeId: Number(this.props.router.query.termTypeId ?? 1),
            postTypeId: Number(this.props.router.query.postTypeId ?? 1),
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
            ...postLib.getPageTitles({
                t: this.props.t,
                postTypeId: this.state.postTypeId,
                termTypeId: this.state.typeId
            }),
            this.props.t("list")
        ];

        this.props.setBreadCrumb(titles);
    }

    async getItems() {
        let items = (await postTermService.getMany({
            typeId: [this.state.typeId],
            postTypeId: this.state.postTypeId,
            langId: this.props.getStateApp.pageData.langId,
            withPostCount: [PostTermTypeId.Category].includes(this.state.typeId),
            ignoreDefaultLanguage: true
        })).data;
        this.setState({
            items: items,
            showingItems: items.filter(item => item.statusId !== StatusId.Deleted)
        })
    }

    async onChangeStatus(statusId: number) {
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

                let resData = await postTermService.deleteMany({
                    _id: selectedItemId,
                    typeId: this.state.typeId,
                    postTypeId: this.state.postTypeId
                })

                loadingToast.hide();
                if (resData.status) {
                    this.setState((state: PageState) => {
                        state.items = state.items.filter(item => !selectedItemId.includes(item._id))
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

            let resData = await postTermService.updateManyStatus({
                _id: selectedItemId,
                typeId: this.state.typeId,
                postTypeId: this.state.postTypeId,
                statusId: statusId
            });

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
        let resData = await postTermService.updateOneRank({
            _id: this.state.selectedItemId,
            rank: rank,
            postTypeId: this.state.postTypeId,
            typeId: this.state.typeId
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

    navigatePage(type: "add" | "back" | "edit", postTermId = "") {
        let postTypeId = this.state.postTypeId;
        let postTermTypeId = this.state.typeId;
        let pagePath = PostLib.getPagePath(postTypeId);
        let path = "";
        switch (type) {
            case "add":
                path = pagePath.term(postTermTypeId).add();
                break;
            case "edit":
                path = pagePath.term(postTermTypeId).edit(postTermId);
                break;
            case "back":
                path = pagePath.list();
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
                    permissionLib.getPermissionIdForPostType(this.state.postTypeId, "Delete")
                ) ? [StatusId.Deleted] : []
            )
        ).map(item => ({label: this.props.t(item.langKey), value: item.id, icon: getStatusIcon(item.id)}))
    }

    get getTableColumns(): TableColumn<PageState["showingItems"][0]>[] {
        return [
            {
                name: this.props.t("image"),
                width: "105px",
                cell: row => (
                    <div className="image pt-2 pb-2">
                        <Image
                            src={imageSourceLib.getUploadedImageSrc(row.contents?.image)}
                            alt={row.contents?.title ?? ""}
                            width={75}
                            height={75}
                            className="img-fluid"
                        />
                    </div>
                )
            },
            {
                name: this.props.t("name"),
                selector: row => row.contents?.title || this.props.t("[noLangAdd]"),
                sortable: true,
            },
            {
                name: this.props.t("main"),
                selector: row => row.mainId ? row.mainId.contents?.title || this.props.t("[noLangAdd]") : this.props.t("notSelected"),
                sortable: true
            },
            (
                [PostTermTypeId.Category].includes(this.state.typeId) ?
                    {
                        name: this.props.t("numberOfUses"),
                        sortable: true,
                        selector: row => row.postCount ?? 0,
                    } : {}
            ),
            {
                name: this.props.t("status"),
                sortable: true,
                cell: row => <ThemeBadgeStatus t={this.props.t} statusId={row.statusId}/>
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
                    permissionLib.getPermissionIdForPostType(row.postTypeId, "Edit")
                ) ? (
                    <button
                        className="btn btn-gradient-warning"
                        onClick={() => this.navigatePage("edit", row._id)}
                    ><i className="fa fa-pencil-square-o"></i></button>
                ) : null
            }
        ];
    }

    render() {
        let item = this.state.items.findSingle("_id", this.state.selectedItemId);
        return this.props.getStateApp.isPageLoading ? null : (
            <div className="page-post-term">
                <ThemeModalUpdateItemRank
                    t={this.props.t}
                    isShow={this.state.isShowModalUpdateRank}
                    onHide={() => this.setState({isShowModalUpdateRank: false})}
                    onSubmit={rank => this.onChangeRank(rank)}
                    rank={item?.rank}
                    title={item?.contents?.title}
                />
                <div className="row">
                    <div className="col-md-3 mb-3">
                        <div className="row">
                            <div className="col-6">
                                <button className="btn btn-gradient-dark btn-lg w-100"
                                        onClick={() => this.navigatePage("back")}>
                                    <i className="mdi mdi-arrow-left"></i> {this.props.t("returnBack")}
                                </button>
                            </div>
                            <div className="col-6 text-end">
                                {
                                    permissionLib.checkPermission(
                                        this.props.getStateApp.sessionData.roleId,
                                        this.props.getStateApp.sessionData.permissions,
                                        permissionLib.getPermissionIdForPostType(this.state.postTypeId, "Add")
                                    ) ? <button className="btn btn-gradient-info btn-lg w-100"
                                                onClick={() => this.navigatePage("add")}>
                                        + {this.props.t("addNew")}
                                    </button> : null
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9 mb-3 text-end">
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
                                    columns={this.getTableColumns}
                                    data={this.state.showingItems}
                                    onSelect={rows => this.onSelect(rows)}
                                    onSearch={searchKey => this.onSearch(searchKey)}
                                    selectedRows={this.state.selectedItems}
                                    t={this.props.t}
                                    isSelectable={(
                                        permissionLib.checkPermission(
                                            this.props.getStateApp.sessionData.roleId,
                                            this.props.getStateApp.sessionData.permissions,
                                            permissionLib.getPermissionIdForPostType(this.state.postTypeId, "Edit")
                                        ) ||
                                        permissionLib.checkPermission(
                                            this.props.getStateApp.sessionData.roleId,
                                            this.props.getStateApp.sessionData.permissions,
                                            permissionLib.getPermissionIdForPostType(this.state.postTypeId, "Delete")
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
