import React, {Component} from 'react'
import {IPagePropCommon} from "types/pageProps";
import {TableColumn} from "react-data-table-component";
import Swal from "sweetalert2";
import {IUserGetResultService} from "types/services/user.service";
import ComponentThemeUsersProfileCard from "components/theme/users/profileCard";
import {UserService} from "services/user.service";
import ComponentToast from "components/elements/toast";
import ComponentDataTable from "components/elements/table/dataTable";
import Image from "next/image"
import ComponentThemeBadgeStatus from "components/theme/badge/status";
import ComponentThemeBadgeUserRole from "components/theme/badge/userRole";
import {UserRoleId, userRoles} from "constants/userRoles";
import {PermissionUtil} from "utils/permission.util";
import {UserEndPointPermission} from "constants/endPointPermissions/user.endPoint.permission";
import {EndPoints} from "constants/endPoints";
import {ImageSourceUtil} from "utils/imageSource.util";
import {status} from "constants/status";

type IPageState = {
    searchKey: string
    items: IUserGetResultService[]
    showingItems: IPageState["items"]
    isViewItemInfo: boolean
    selectedItemId: string
};

type IPageProps = {} & IPagePropCommon;

export default class PageUserList extends Component<IPageProps, IPageState> {
    constructor(props: IPageProps) {
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
        if(PermissionUtil.checkAndRedirect(this.props, UserEndPointPermission.GET)){
            this.setPageTitle();
            await this.getItems();
            this.props.setStateApp({
                isPageLoading: false
            })
        }
    }

    setPageTitle() {
        this.props.setBreadCrumb([
            this.props.t("settings"),
            this.props.t("users"),
            this.props.t("list"),
        ])
    }

    async getItems() {
        let result = (await UserService.getMany({}));
        if(result.status && result.data){
            let items = result.data.orderBy("roleId", "desc");
            this.setState((state: IPageState) => {
                state.items = state.items.sort(item => {
                    let sort = 0;
                    if (item._id == this.props.getStateApp.sessionAuth!.user.userId) {
                        sort = 1;
                    }
                    return sort;
                })
                state.items = items.filter(item => item.roleId != UserRoleId.SuperAdmin);
                return state;
            }, () => this.onSearch(this.state.searchKey));
        }
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
                const loadingToast = new ComponentToast({
                    content: this.props.t("deleting"),
                    type: "loading"
                });

                let resData = await UserService.deleteOne({_id: userId})
                loadingToast.hide();
                if (resData.status) {
                    this.setState((state: IPageState) => {
                        state.items = state.items.filter(item => userId !== item._id);
                        return state;
                    }, () => {
                        new ComponentToast({
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
        let path = EndPoints.USER_WITH.EDIT(itemId);
        this.props.router.push(path);
    }

    get getTableColumns(): TableColumn<IPageState["items"][0]>[] {
        return [
            {
                name: this.props.t("image"),
                width: "105px",
                cell: row => (
                    <div className="image mt-2 mb-2">
                        <Image
                            src={ImageSourceUtil.getUploadedImageSrc(row.image)}
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
                cell: row => <ComponentThemeBadgeUserRole t={this.props.t} userRoleId={row.roleId} />
            },
            {
                name: this.props.t("status"),
                selector: row => status.findSingle("id", row.statusId)?.rank ?? 0,
                sortable: true,
                cell: row => <ComponentThemeBadgeStatus t={this.props.t} statusId={row.statusId} />
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
                    let sessionUserRole = userRoles.findSingle("id", this.props.getStateApp.sessionAuth?.user.roleId);
                    let rowUserRole = userRoles.findSingle("id", row.roleId);
                    return (
                        (sessionUserRole && rowUserRole) &&
                        (rowUserRole.rank < sessionUserRole.rank) &&
                        PermissionUtil.check(
                            this.props.getStateApp.sessionAuth!,
                            UserEndPointPermission.UPDATE
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
                    let sessionUserRole = userRoles.findSingle("id", this.props.getStateApp.sessionAuth?.user.roleId);
                    let rowUserRole = userRoles.findSingle("id", row.roleId);
                    return (
                        (sessionUserRole && rowUserRole) &&
                        (rowUserRole.rank < sessionUserRole.rank) &&
                        PermissionUtil.check(
                            this.props.getStateApp.sessionAuth!,
                            UserEndPointPermission.DELETE
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
                        return userInfo ? <ComponentThemeUsersProfileCard
                            router={this.props.router}
                            t={this.props.t}
                            onClose={() => {
                                this.setState({isViewItemInfo: false})
                            }}
                            isShow={this.state.isViewItemInfo}
                            userInfo={userInfo}
                        /> : null
                    })()
                }
                <div className="grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="table-user">
                                <ComponentDataTable
                                    columns={this.getTableColumns}
                                    data={this.state.showingItems}
                                    i18={{
                                        search: this.props.t("search"),
                                        noRecords: this.props.t("noRecords")
                                    }}
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
