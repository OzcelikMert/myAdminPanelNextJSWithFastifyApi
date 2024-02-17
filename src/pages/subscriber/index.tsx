import React, {Component} from 'react'
import {IPagePropCommon} from "types/pageProps";
import  {TableColumn} from "react-data-table-component";
import Swal from "sweetalert2";
import ComponentToast from "components/elements/toast";
import {ISubscriberGetResultService} from "types/services/subscriber.service";
import {SubscriberService} from "services/subscriber.service";
import {ThemeToggleMenuItemDocument} from "components/elements/table/toggleMenu";
import ComponentDataTable from "components/elements/table/dataTable";
import {getStatusIcon} from "components/theme/badge/status";
import {status, StatusId} from "constants/status";
import {PermissionUtil} from "utils/permission.util";
import {SubscriberEndPointPermission} from "constants/endPointPermissions/subscriber.endPoint.permission";

type IPageState = {
    searchKey: string
    items: ISubscriberGetResultService[]
    showingItems: IPageState["items"]
    selectedItems: IPageState["items"]
};

type IPageProps = {} & IPagePropCommon;

export default class PageSubscribers extends Component<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
        this.state = {
            searchKey: "",
            showingItems: [],
            items: [],
            selectedItems: [],
        }
    }

    async componentDidMount() {
        if(PermissionUtil.checkAndRedirect(this.props, SubscriberEndPointPermission.GET)){
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
            this.props.t("subscribers")
        ])
    }

    async getItems() {
        let result = (await SubscriberService.getMany({}));

        if(result.status && result.data){
            this.setState({
                items: result.data
            }, () => this.onSearch(this.state.searchKey));
        }
    }

    async onChangeStatus(statusId: number) {
        let selectedItemId = this.state.selectedItems.map(item => item._id);

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

            let resData = await SubscriberService.getMany({
                _id: selectedItemId
            });
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
                    this.onSearch(this.state.searchKey)
                })
            }
        }
    }

    onSelect(selectedRows: IPageState["items"]) {
        this.setState((state: IPageState) => {
            state.selectedItems = selectedRows;
            return state;
        })
    }

    onSearch(searchKey: string) {
        this.setState({
            searchKey: searchKey,
            showingItems: this.state.items.filter(item => item.email.toLowerCase().search(searchKey) > -1)
        })
    }

    get getToggleMenuItems(): ThemeToggleMenuItemDocument[] {
        return status.findMulti("id", [
                StatusId.Deleted
            ]
        ).map(item => ({label: this.props.t(item.langKey), value: item.id, icon: getStatusIcon(item.id)}))
    }

    get getTableColumns(): TableColumn<IPageState["items"][0]>[] {
        return [
            {
                name: this.props.t("email"),
                selector: row => row.email,
                sortable: true,
            },
            {
                name: this.props.t("createdDate"),
                sortable: true,
                selector: row => new Date(row.createdAt || "").toLocaleDateString(),
                sortFunction: (a, b) => ComponentDataTable.dateSort(a, b)
            },
        ];
    }

    render() {
        return this.props.getStateApp.isPageLoading ? null : (
            <div className="page-settings">
                <div className="grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="table-post">
                                <ComponentDataTable
                                    columns={this.getTableColumns}
                                    data={this.state.showingItems}
                                    selectedRows={this.state.selectedItems}
                                    i18={{
                                        search: this.props.t("search"),
                                        noRecords: this.props.t("noRecords")
                                    }}
                                    onSelect={rows => this.onSelect(rows)}
                                    onSearch={searchKey => this.onSearch(searchKey)}
                                    isSelectable={(
                                        PermissionUtil.check(this.props.getStateApp.sessionAuth!, SubscriberEndPointPermission.DELETE)
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
