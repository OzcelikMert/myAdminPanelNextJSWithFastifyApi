import React, {Component} from 'react'
import {IPagePropCommon} from "types/pageProps";
import {TableColumn} from "react-data-table-component";
import ThemeDataTable from "components/theme/table/dataTable";
import PagePaths from "constants/pagePaths";
import {ILanguageGetResultService} from "types/services/language.service";
import languageService from "services/language.service";
import Image from "next/image";
import imageSourceLib from "lib/imageSource.lib";
import ThemeBadgeStatus from "components/theme/badge/status";
import ThemeModalUpdateItemRank from "components/theme/modal/updateItemRank";
import ThemeToast from "components/theme/toast";

type PageState = {
    searchKey: string
    items: ILanguageGetResultService[],
    showingItems: ILanguageGetResultService[]
    selectedItemId: string
    isShowModalUpdateRank: boolean
};

type PageProps = {} & IPagePropCommon;

export default class PageSettingLanguageList extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            searchKey: "",
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

    setPageTitle() {
        this.props.setBreadCrumb([
            this.props.t("settings"),
            this.props.t("languages"),
            this.props.t("list")
        ])
    }

    async getItems() {
        let items = (await languageService.getMany({})).data;
        this.setState((state: PageState) => {
            state.items = items;
            state.showingItems = items;
            return state;
        });
    }

    async onChangeRank(rank: number) {
        let resData = await languageService.updateOneRank({
            _id: this.state.selectedItemId,
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
                this.onSearch(this.state.searchKey)
                let item = this.state.items.findSingle("_id", this.state.selectedItemId);
                new ThemeToast({
                    type: "success",
                    title: this.props.t("successful"),
                    content: `'${item?.title}' ${this.props.t("itemEdited")}`,
                    timeOut: 3
                })
            })
        }
    }

    onSearch(searchKey: string) {
        this.setState({
            searchKey: searchKey,
            showingItems: this.state.showingItems.filter(item => (item.title ?? "").toLowerCase().search(searchKey) > -1)
        })
    }

    navigatePage(type: "edit", itemId = "") {
        let pagePath = PagePaths.settings().language();
        let path = "";
        switch(type){
            case "edit": path = pagePath.edit(itemId); break;
        }
        this.props.router.push(path);
    }

    get getTableColumns(): TableColumn<PageState["showingItems"][0]>[] {
        return [
            {
                name: this.props.t("image"),
                width: "105px",
                cell: row => (
                    <div className="image mt-2 mb-2">
                        <Image
                            src={imageSourceLib.getUploadedFlagSrc(row.image)}
                            alt={row.title}
                            width={75}
                            height={75}
                            className="img-fluid"
                        />
                    </div>
                )
            },
            {
                name: this.props.t("title"),
                selector: row => row.title,
                cell: row => (
                    <div className="row w-100">
                        <div className="col-md-12">{row.title} ({row.shortKey}-{row.locale})</div>
                    </div>
                ),
                width: "250px",
                sortable: true
            },
            {
                name: this.props.t("status"),
                sortable: true,
                cell: row => <ThemeBadgeStatus t={this.props.t} statusId={row.statusId} />
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
                cell: row => (
                    <button
                        onClick={() => this.navigatePage("edit", row._id)}
                        className="btn btn-gradient-warning"
                    ><i className="fa fa-pencil-square-o"></i></button>
                )
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
                    title={item?.title}
                />
                <div className="grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="table-post">
                                <ThemeDataTable
                                    columns={this.getTableColumns.filter(column => typeof column.name !== "undefined")}
                                    data={this.state.showingItems}
                                    onSearch={searchKey => this.onSearch(searchKey)}
                                    t={this.props.t}
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
