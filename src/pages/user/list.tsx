import React, {Component} from 'react'
import {PagePropCommonDocument} from "types/pageProps";
import {PermissionId, Status, UserRoleId, userRoles} from "constants/index";
import {TableColumn} from "react-data-table-component";
import Swal from "sweetalert2";
import {UserGetResultDocument} from "types/services/user.service";
import ThemeUsersProfileCard from "components/theme/users/profileCard";
import userService from "services/user.service";
import imageSourceLib from "lib/imageSource.lib";
import permissionLib from "lib/permission.lib";
import ThemeToast from "components/theme/toast";
import PagePaths from "constants/pagePaths";
import ThemeDataTable from "components/theme/table/dataTable";
import Image from "next/image"
import ThemeBadgeStatus from "components/theme/badge/status";
import ThemeBadgeUserRole from "components/theme/badge/userRole";

type PageState = {
    searchKey: string
    items: UserGetResultDocument[]
    showingItems: PageState["items"]
    isViewItemInfo: boolean
    selectedItemId: string
};

type PageProps = {} & PagePropCommonDocument;

export default class PageUserList extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            searchKey: "",
            showingItems: [],
            items: [],
            isViewItemInfo: false,
            selectedItemId: ""
        }
    }

    async componentDidMount() {
        this.setPageTitle();
        await this.getItems();
        this.props.setStateApp({
            isPageLoading: false
        })
    }

    setPageTitle() {
        this.props.setBreadCrumb([
            this.props.t("settings"),
            this.props.t("users"),
            this.props.t("list"),
        ])
    }

    async getItems() {
        let items = (await userService.getMany({})).data;
        items = items.orderBy("roleId", "desc");
        this.setState((state: PageState) => {
            state.items = state.items.sort(item => {
                let sort = 0;
                if (item._id == this.props.getStateApp.sessionData.id) {
                    sort = 1;
                }
                return sort;
            })
            state.items = items.filter(item => item.roleId != UserRoleId.SuperAdmin);
            return state;
        }, () => this.onSearch(this.state.searchKey));
    }

    async onDelete(userId: string) {
        let item = this.state.items.findSingle("_id", userId);
        if (item) {
            let result = await Swal.fire({
                title: this.props.t("deleteAction"),
                html: `<b>'${item.name}'</b> ${this.props.t("deleteItemQuestionWithItemName")}`,
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

                let resData = await userService.deleteOne({_id: userId})
                loadingToast.hide();
                if (resData.status) {
                    this.setState((state: PageState) => {
                        state.items = state.items.filter(item => userId !== item._id);
                        return state;
                    }, () => {
                        new ThemeToast({
                            type: "success",
                            title: this.props.t("successful"),
                            content: this.props.t("itemDeleted")
                        })
                    })
                }
            }
        }
    }

    onViewUser(userId: string) {
        this.setState({
            isViewItemInfo: true,
            selectedItemId: userId
        })
    }

    onSearch(searchKey: string) {
        this.setState({
            searchKey: searchKey,
            showingItems: this.state.items.filter(item => item.name.toLowerCase().search(searchKey) > -1)
        })
    }

    navigatePage(type: "edit", itemId = "") {
        let path = PagePaths.settings().user().edit(itemId)
        this.props.router.push(path);
    }

    get getTableColumns(): TableColumn<PageState["items"][0]>[] {
        return [
            {
                name: this.props.t("image"),
                width: "105px",
                cell: row => (
                    <div className="image mt-2 mb-2">
                        <Image
                            src={imageSourceLib.getUploadedImageSrc(row.image)}
                            alt={row.name}
                            width={75}
                            height={75}
                            className="img-fluid"
                        />
                        <span className={`availability-status ${row.isOnline ? "online" : "offline"}`}></span>
                    </div>
                )
            },
            {
                name: this.props.t("name"),
                selector: row => row.name,
                sortable: true,
                cell: row => (
                    <b>{row.name}</b>
                )
            },
            {
                id: "userRole",
                name: this.props.t("role"),
                selector: row => userRoles.findSingle("id", row.roleId)?.rank ?? 0,
                sortable: true,
                cell: row => <ThemeBadgeUserRole t={this.props.t} userRoleId={row.roleId} />
            },
            {
                name: this.props.t("status"),
                selector: row => Status.findSingle("id", row.statusId)?.rank ?? 0,
                sortable: true,
                cell: row => <ThemeBadgeStatus t={this.props.t} statusId={row.statusId} />
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
                cell: row => (
                    <button
                        onClick={() => this.onViewUser(row._id)}
                        className="btn btn-gradient-info"
                    ><i className="mdi mdi-eye"></i></button>
                )
            },
            {
                name: "",
                button: true,
                width: "70px",
                cell: row => {
                    let sessionUserRole = userRoles.findSingle("id", this.props.getStateApp.sessionData.roleId);
                    let rowUserRole = userRoles.findSingle("id", row.roleId);
                    return (
                        (sessionUserRole && rowUserRole) &&
                        (rowUserRole.rank < sessionUserRole.rank) &&
                        permissionLib.checkPermission(
                            this.props.getStateApp.sessionData.roleId,
                            this.props.getStateApp.sessionData.permissions,
                            PermissionId.UserEdit
                        )
                    ) ? <button
                        onClick={() => this.navigatePage("edit", row._id)}
                        className="btn btn-gradient-warning"
                    ><i className="fa fa-pencil-square-o"></i>
                    </button> : null;
                }
            },
            {
                name: "",
                button: true,
                width: "70px",
                cell: row => {
                    let sessionUserRole = userRoles.findSingle("id", this.props.getStateApp.sessionData.roleId);
                    let rowUserRole = userRoles.findSingle("id", row.roleId);
                    return (
                        (sessionUserRole && rowUserRole) &&
                        (rowUserRole.rank < sessionUserRole.rank) &&
                        permissionLib.checkPermission(
                            this.props.getStateApp.sessionData.roleId,
                            this.props.getStateApp.sessionData.permissions,
                            PermissionId.UserDelete
                        )
                    ) ? <button
                        onClick={() => this.onDelete(row._id)}
                        className="btn btn-gradient-danger"
                    ><i className="mdi mdi-trash-can-outline"></i>
                    </button> : null;
                }
            }
        ];
    }

    render() {
        return this.props.getStateApp.isPageLoading ? null : (
            <div className="page-user">
                {
                    (() => {
                        let userInfo = this.state.items.findSingle("_id", this.state.selectedItemId);
                        return userInfo ? <ThemeUsersProfileCard
                            router={this.props.router}
                            t={this.props.t}
                            onClose={() => {
                                this.setState({isViewItemInfo: false})
                            }}
                            isShow={this.state.isViewItemInfo}
                            userInfo={userInfo}
                            langId={this.props.getStateApp.sessionData.langId}
                        /> : null
                    })()
                }
                <div className="grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="table-user">
                                <ThemeDataTable
                                    columns={this.getTableColumns}
                                    data={this.state.showingItems}
                                    t={this.props.t}
                                    onSearch={searchKey => this.onSearch(searchKey)}
                                    isSearchable={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
