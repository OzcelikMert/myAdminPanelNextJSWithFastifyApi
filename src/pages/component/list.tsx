import React, {Component} from 'react'
import {IPagePropCommon} from "types/pageProps";
import {PermissionId, UserRoleId} from "constants/index";
import {TableColumn} from "react-data-table-component";
import Swal from "sweetalert2";
import permissionLib from "lib/permission.lib";
import ComponentToast from "components/elements/toast";
import {IComponentGetResultService} from "types/services/component.service";
import componentService from "services/component.service";
import PagePaths from "constants/pagePaths";
import ComponentDataTable from "components/elements/table/dataTable";
import ComponentTableUpdatedBy from "components/elements/table/updatedBy";
import ComponentThemeModalUpdateItemRank from "components/theme/modal/updateItemRank";

type IPageState = {
    searchKey: string
    items: IComponentGetResultService[]
    showingItems: IPageState["items"]
    selectedItemId: string
    isShowModalUpdateRank: boolean
};

type IPageProps = {} & IPagePropCommon;

export default class PageComponentList extends Component<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
        this.state = {
            searchKey: "",
            showingItems: [],
            items: [],
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

    setPageTitle() {
        this.props.setBreadCrumb([
            this.props.t("components"),
            this.props.t("list"),
        ])
    }

    async getItems() {
        let items = (await componentService.getMany({langId: this.props.getStateApp.pageData.langId})).data;
        this.setState((state: IPageState) => {
            state.items = items;
            return state;
        }, () => this.onSearch(this.state.searchKey));
    }

    async onDelete(_id: string) {
        let item = this.state.items.findSingle("_id", _id);
        if (item) {
            let result = await Swal.fire({
                title: this.props.t("deleteAction"),
                html: `<b>'${this.props.t(item.langKey)}'</b> ${this.props.t("deleteItemQuestionWithItemName")}`,
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
                let resData = await componentService.delete({_id: [_id]});
                loadingToast.hide();
                if (resData.status) {
                    this.setState({
                        items: this.state.items.findMulti("_id", _id, false)
                    }, () => {
                        this.onSearch(this.state.searchKey);
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

    onSearch(searchKey: string) {
        this.setState({
            searchKey: searchKey,
            showingItems: this.state.items.filter(item => this.props.t(item.langKey).toLowerCase().search(searchKey) > -1)
        })
    }

    navigatePage(type: "edit", itemId = "") {
        let path = PagePaths.component().edit(itemId)
        this.props.router.push(path);
    }

    get getTableColumns(): TableColumn<IPageState["items"][0]>[] {
        return [
            {
                name: this.props.t("title"),
                selector: row => this.props.t(row.langKey),
                sortable: true
            },
            {
                name: this.props.t("updatedBy"),
                sortable: true,
                cell: row => <ComponentTableUpdatedBy name={row.lastAuthorId.name} updatedAt={row.updatedAt || ""} />
            },
            {
                name: this.props.t("createdDate"),
                sortable: true,
                selector: row => new Date(row.createdAt || "").toLocaleDateString(),
                sortFunction: (a, b) => ComponentDataTable.dateSort(a, b)
            },
            {
                name: "",
                button: true,
                width: "70px",
                cell: row => permissionLib.checkPermission(
                    this.props.getStateApp.sessionData.roleId,
                    this.props.getStateApp.sessionData.permissions,
                    PermissionId.ComponentEdit
                ) ? (
                    <button
                        onClick={() => this.navigatePage("edit", row._id)}
                        className="btn btn-gradient-warning"
                    ><i className="fa fa-pencil-square-o"></i>
                    </button>
                ) : null
            },
            (
                this.props.getStateApp.sessionData.roleId == UserRoleId.SuperAdmin
                    ? {
                        name: "",
                        button: true,
                        width: "70px",
                        cell: row => (
                            <button
                                onClick={() => this.onDelete(row._id)}
                                className="btn btn-gradient-danger"
                            ><i className="mdi mdi-trash-can-outline"></i>
                            </button>
                        )
                    } : {}
            )
        ];
    }

    render() {
        let item = this.state.items.findSingle("_id", this.state.selectedItemId);
        return this.props.getStateApp.isPageLoading ? null : (
            <div className="page-post">
                <div className="grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="table-post">
                                <ComponentDataTable
                                    columns={this.getTableColumns.filter(column => typeof column.name !== "undefined")}
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
