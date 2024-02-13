import React, {Component} from 'react'
import {PermissionId, Status, StatusId} from "constants/index";
import {IPagePropCommon} from "types/pageProps";
import {TableColumn} from "react-data-table-component";
import Swal from "sweetalert2";
import permissionLib from "lib/permission.lib";
import ComponentToast from "components/elements/toast";
import ComponentDataTable from "components/elements/table/dataTable";
import {INavigationGetResultService} from "types/services/navigation.service";
import navigationService from "services/navigation.service";
import PagePaths from "constants/pagePaths";
import {ThemeToggleMenuItemDocument} from "components/elements/table/toggleMenu";
import ComponentThemeBadgeStatus, {getStatusIcon} from "components/theme/badge/status";
import ComponentTableUpdatedBy from "components/elements/table/updatedBy";
import ComponentThemeModalUpdateItemRank from "components/theme/modal/updateItemRank";

type IPageState = {
    searchKey: string
    items: INavigationGetResultService[],
    showingItems: INavigationGetResultService[]
    selectedItems: INavigationGetResultService[]
    listMode: "list" | "deleted"
    selectedItemId: string
    isShowModalUpdateRank: boolean
};

type IPageProps = {} & IPagePropCommon;

export default class PageNavigationList extends Component<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
        this.state = {
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

    async componentDidUpdate(prevProps: Readonly<IPageProps>) {
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
        this.props.setBreadCrumb([
            this.props.t("navigations"),
            this.props.t("list")
        ])
    }

    async getItems() {
        let items = (await navigationService.getMany({
            langId: this.props.getStateApp.pageData.langId,
            ignoreDefaultLanguage: true
        })).data;
        this.setState((state: IPageState) => {
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
                const loadingToast = new ComponentToast({
                    content: this.props.t("deleting"),
                    type: "loading"
                });

                let resData = await navigationService.deleteMany({_id: selectedItemId});
                loadingToast.hide();
                if (resData.status) {
                    this.setState((state: IPageState) => {
                        state.items = state.items.filter(item => !selectedItemId.includes(item._id));
                        return state;
                    }, () => {
                        new ComponentToast({
                            type: "success",
                            title: this.props.t("successful"),
                            content: this.props.t("itemDeleted")
                        })
                        this.onChangeListMode(this.state.listMode);
                    })
                }
            }
        } else {
            const loadingToast = new ComponentToast({
                content: this.props.t("updating"),
                type: "loading"
            });
            let resData = await navigationService.updateManyStatus({_id: selectedItemId, statusId: statusId});
            loadingToast.hide();
            if (resData.status) {
                this.setState((state: IPageState) => {
                    state.items.map(item => {
                        if (selectedItemId.includes(item._id)) {
                            item.statusId = statusId;
                        }
                    })
                    return state;
                }, () => {
                    new ComponentToast({
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
        let resData = await navigationService.updateOneRank({
            _id: this.state.selectedItemId,
            rank: rank
        });

        if(resData.status){
            this.setState((state: IPageState) => {
                let item = this.state.items.findSingle("_id", this.state.selectedItemId);
                if(item){
                    item.rank = rank;
                }
                return state;
            }, () => {
                this.onChangeListMode(this.state.listMode)
                let item = this.state.items.findSingle("_id", this.state.selectedItemId);
                new ComponentToast({
                    type: "success",
                    title: this.props.t("successful"),
                    content: `'${item?.contents?.title}' ${this.props.t("itemEdited")}`,
                    timeOut: 3
                })
            })
        }
    }

    onSelect(selectedRows: IPageState["showingItems"]) {
        this.setState((state: IPageState) => {
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

    onChangeListMode(mode: IPageState["listMode"]) {
        this.setState((state: IPageState) => {
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

    navigatePage(type: "edit", itemId = "") {
        let pagePath = PagePaths.navigation();
        let path = "";
        switch (type) {
            case "edit":
                path = pagePath.edit(itemId);
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
                    PermissionId.NavigationDelete
                ) ? [StatusId.Deleted] : []
            )
        ).map(item => ({label: this.props.t(item.langKey), value: item.id, icon: getStatusIcon(item.id)}))
    }

    get getTableColumns(): TableColumn<IPageState["showingItems"][0]>[] {
        return [
            {
                name: this.props.t("title"),
                selector: row => row.contents?.title || this.props.t("[noLangAdd]"),
                cell: row => (
                    <div className="row w-100">
                        <div className="col-md-12">{row.contents?.title || this.props.t("[noLangAdd]")}</div>
                    </div>
                ),
                width: "250px",
                sortable: true
            },
            {
                name: this.props.t("main"),
                selector: row => row.mainId ? row.mainId.contents?.title || this.props.t("[noLangAdd]") : this.props.t("notSelected"),
                sortable: true
            },
            {
                name: this.props.t("status"),
                sortable: true,
                cell: row => <ComponentThemeBadgeStatus t={this.props.t} statusId={row.statusId}/>
            },
            {
                name: this.props.t("updatedBy"),
                sortable: true,
                cell: row => <ComponentTableUpdatedBy name={row.lastAuthorId.name} updatedAt={row.updatedAt || ""}/>
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
                sortFunction: (a, b) => ComponentDataTable.dateSort(a, b)
            },
            {
                name: "",
                width: "70px",
                button: true,
                cell: row => permissionLib.checkPermission(
                    this.props.getStateApp.sessionData.roleId,
                    this.props.getStateApp.sessionData.permissions,
                    PermissionId.NavigationEdit
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
            <div className="page-navigation">
                <ComponentThemeModalUpdateItemRank
                    t={this.props.t}
                    isShow={this.state.isShowModalUpdateRank}
                    onHide={() => this.setState({isShowModalUpdateRank: false})}
                    onSubmit={rank => this.onChangeRank(rank)}
                    rank={item?.rank}
                    title={item?.contents?.title}
                />
                <div className="row mb-3">
                    <div className="col-md-3"></div>
                    <div className="col-md-9 text-end">
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
                                <ComponentDataTable
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
                                            PermissionId.NavigationEdit
                                        ) ||
                                        permissionLib.checkPermission(
                                            this.props.getStateApp.sessionData.roleId,
                                            this.props.getStateApp.sessionData.permissions,
                                            PermissionId.NavigationDelete
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
