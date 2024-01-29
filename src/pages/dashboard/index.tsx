import React, {Component} from 'react';
import dynamic from "next/dynamic";
import {PagePropCommonDocument} from "types/pageProps";
import {TableColumn} from "react-data-table-component";
import {PostTypeId, PostTypes} from "constants/index";
import {PostGetManyResultDocument} from "types/services/post";
import postService from "services/post.service";
import viewService from "services/view.service";
import {ViewGetNumberResultDocument, ViewGetStatisticsResultDocument} from "types/services/view";
import imageSourceLib from "lib/imageSource.lib";
import permissionLib from "lib/permission.lib";
import ThemeDataTable from "components/theme/table/dataTable";
import Image from "next/image"
import ThemeChartArea from "components/theme/charts/area";
import PostLib from "lib/post.lib";
import ThemeBadgeStatus from "components/theme/badge/status";
import ThemeTableUpdatedBy from "components/theme/table/updatedBy";

const WorldMap = dynamic(() => import('react-svg-worldmap').then((module) => module.WorldMap), {ssr: false});

type PageState = {
    lastPosts: PostGetManyResultDocument[]
    visitorData: {
        number: ViewGetNumberResultDocument,
        statistics: ViewGetStatisticsResultDocument
    }
    worldMapSize: "lg" | "xl" | "xxl"
};

type PageProps = {} & PagePropCommonDocument;

class PageDashboard extends Component<PageProps, PageState> {
    timer: any;
    constructor(props: PageProps) {
        super(props);
        this.state = {
            lastPosts: [],
            visitorData: {
                number: {
                    liveTotal: 0,
                    weeklyTotal: 0,
                    averageTotal: 0
                },
                statistics: {
                    day: [],
                    country: []
                }
            },
            worldMapSize: "lg",
        }
    }

    async componentDidMount() {
        this.setPageTitle();
        await this.getViewNumber();
        await this.getViewStatistics();
        await this.getLastPosts();
        this.props.setStateApp({
            isPageLoading: false
        }, () => {
            this.timerReportOne();
        })
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    setPageTitle() {
        this.props.setBreadCrumb([this.props.t("dashboard")])
    }

    timerReportOne() {
        if (this.timer) {
            clearInterval(this.timer)
        }
        this.timer = setInterval(async () => {
            await this.getViewNumber();
        }, 10000)
    }

    async getViewNumber() {
        let resData = await viewService.getNumber();

        if (resData.status) {
            if (JSON.stringify(this.state.visitorData.number) != JSON.stringify(resData.data)) {
                this.setState((state: PageState) => {
                    state.visitorData.number = resData.data;
                    return state;
                })
            }
        }
    }

    async getViewStatistics() {
        let resData = await viewService.getStatistics();

        if (resData.status) {
            this.setState((state: PageState) => {
                state.visitorData.statistics = resData.data;
                return state;
            })
        }
    }

    async getLastPosts() {
        let resData = await postService.getMany({
            langId: this.props.getStateApp.appData.mainLangId,
            count: 10,
            isRecent: true
        });
        if (resData.status) {
            this.setState({
                lastPosts: resData.data
            })
        }
    }

    setWorldMapSize(size: PageState["worldMapSize"]) {
        this.setState({
            worldMapSize: size
        });
    }

    async navigatePage(type: "termEdit" | "edit" | "listPost", postTypeId: number, itemId = "", termTypeId = 0) {
        let pagePath = PostLib.getPagePath(postTypeId);
        let path = "";
        switch (type) {
            case "edit":
                path = pagePath.edit(itemId);
                break;
            case "termEdit":
                path = pagePath.term(termTypeId).edit(itemId);
                break;
            case "listPost":
                path = pagePath.list();
                break;
        }
        await this.props.router.push(path);
    }

    get getTableColumns(): TableColumn<PageState["lastPosts"][0]>[] {
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
                            className="post-image img-fluid"
                        />
                    </div>
                )
            },
            {
                name: this.props.t("title"),
                selector: row => row.contents?.title || this.props.t("[noLangAdd]"),
                sortable: true
            },
            {
                name: this.props.t("type"),
                selector: row => row.typeId,
                sortable: true,
                cell: row => (
                    <label
                        onClick={() => this.navigatePage("listPost", row.typeId, row._id)}
                        className={`badge badge-gradient-primary cursor-pointer`}
                    >
                        {
                            this.props.t(PostTypes.findSingle("id", row.typeId)?.langKey ?? "[noLangAdd]")
                        }
                    </label>
                )
            },
            {
                name: this.props.t("status"),
                selector: row => row.statusId,
                sortable: true,
                cell: row => <ThemeBadgeStatus t={this.props.t} statusId={row.statusId} />
            },
            {
                name: this.props.t("updatedBy"),
                sortable: true,
                cell: row => <ThemeTableUpdatedBy name={row.lastAuthorId.name} updatedAt={row.updatedAt || ""} />
            },
            {
                name: "",
                button: true,
                width: "70px",
                cell: row => permissionLib.checkPermission(
                    this.props.getStateApp.sessionData.roleId,
                    this.props.getStateApp.sessionData.permissions,
                    permissionLib.getPermissionIdForPostType(row.typeId, "Edit")
                ) ? (
                    <button
                        onClick={() => this.navigatePage("edit", row.typeId, row._id)}
                        className="btn btn-gradient-warning"
                    ><i className="fa fa-pencil-square-o"></i></button>
                ) : null
            }
        ];
    }

    ReportOne = () => {
        return (
            <div className="col-12 grid-margin">
                <div className="card card-statistics">
                    <div className="row">
                        <div className="card-col col-xl-3 col-lg-3 col-md-3 col-6">
                            <div className="card-body">
                                <div
                                    className="d-flex align-items-center justify-content-center flex-column flex-sm-row">
                                    <i className="mdi mdi-account-multiple-outline text-primary ms-0 me-sm-4 icon-lg"></i>
                                    <div className="wrapper text-center text-sm-end">
                                        <p className="card-text mb-0 text-dark">{this.props.t("currentVisitors")}</p>
                                        <div className="fluid-container">
                                            <h3 className="mb-0 font-weight-medium text-dark">{this.state.visitorData.number.liveTotal}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-col col-xl-3 col-lg-3 col-md-3 col-6">
                            <div className="card-body">
                                <div
                                    className="d-flex align-items-center justify-content-center flex-column flex-sm-row">
                                    <i className="mdi mdi-target text-primary ms-0 me-sm-4 icon-lg"></i>
                                    <div className="wrapper text-center text-sm-end">
                                        <p className="card-text mb-0 text-dark">{this.props.t("dailyAverageVisitors")}</p>
                                        <div className="fluid-container">
                                            <h3 className="mb-0 font-weight-medium text-dark">{this.state.visitorData.number.averageTotal}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-col col-xl-3 col-lg-3 col-md-3 col-6">
                            <div className="card-body">
                                <div
                                    className="d-flex align-items-center justify-content-center flex-column flex-sm-row">
                                    <i className="mdi mdi-calendar-week text-primary ms-0 me-sm-4 icon-lg"></i>
                                    <div className="wrapper text-center text-sm-end">
                                        <p className="card-text mb-0 text-dark">{this.props.t("weeklyTotalVisitors")}</p>
                                        <div className="fluid-container">
                                            <h3 className="mb-0 font-weight-medium text-dark">{this.state.visitorData.number.weeklyTotal}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-col col-xl-3 col-lg-3 col-md-3 col-6">
                            <div className="card-body">
                                <div
                                    className="d-flex align-items-center justify-content-center flex-column flex-sm-row">
                                    <i className="mdi mdi-google-analytics text-primary ms-0 me-sm-4 icon-lg"></i>
                                    <div className="wrapper text-center text-sm-end">
                                        <p className="card-text mb-0 text-dark">{this.props.t("lifeTimeVisitors")}</p>
                                        <div className="fluid-container">
                                            <h3 className="mb-0 font-weight-medium text-dark">
                                                <a target="_blank" className="text-info fs-6 text-decoration-none"
                                                   href="https://analytics.google.com/">{this.props.t("clickToSee")}</a>
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    ReportTwo = () => {
        return (
            <div className="row">
                <div className="col-md-7 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="clearfix mb-4">
                                <h4 className="card-title float-start">{this.props.t("weeklyVisitorsStatistics")}</h4>
                            </div>
                            <div className="chart-container">
                                <ThemeChartArea
                                    toolTipLabel={this.props.t("visitors")}
                                    data={this.state.visitorData.statistics.day.map(view => view.total)}
                                    labels={this.state.visitorData.statistics.day.map(view => view._id)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-5 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body overflow-auto">
                            <h4 className="card-title">{this.props.t("weeklyVisitorsStatistics")} ({this.props.t("worldMap")})</h4>
                            <div className="row d-none d-lg-block">
                                <div className="col-md-12 text-end">
                                    <button className="btn btn-gradient-success btn-sm" onClick={() => this.setWorldMapSize(this.state.worldMapSize == "xl" ? "xxl" : "xl")}>
                                        <i className="fa fa-search-plus"></i>
                                    </button>
                                    <button className="btn btn-gradient-danger btn-sm" onClick={() => this.setWorldMapSize(this.state.worldMapSize == "xxl" ? "xl" : "lg")}>
                                        <i className="fa fa-search-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="row overflow-auto">
                                <WorldMap
                                    color="#b66dff"
                                    borderColor="var(--theme-worldmap-stroke-bg)"
                                    frameColor="red"
                                    strokeOpacity={0.4}
                                    backgroundColor="var(--theme-bg)"
                                    value-suffix="people"
                                    size={this.state.worldMapSize}
                                    data={this.state.visitorData.statistics.country.map(view => ({
                                        country: (view._id || window.navigator.language.slice(3)).toLowerCase(),
                                        value: view.total
                                    }))}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    LastPost = () => {
        return (
            <div className="row page-post">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">{this.props.t("lastPosts")}</h4>
                            <div className="table-post">
                                <ThemeDataTable
                                    columns={this.getTableColumns}
                                    data={this.state.lastPosts}
                                    t={this.props.t}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return this.props.getStateApp.isPageLoading ? null : (
            <div className="page-dashboard">
                <this.ReportOne/>
                <this.ReportTwo/>
                <this.LastPost/>
            </div>
        );
    }
}

export default PageDashboard;