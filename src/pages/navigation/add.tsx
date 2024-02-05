import React, {Component, FormEvent} from 'react'
import {Tab, Tabs} from "react-bootstrap";
import {ThemeForm, ThemeFormSelect, ThemeFormType} from "components/theme/form"
import {StatusId} from "constants/index";
import {PagePropCommonDocument} from "types/pageProps";
import V from "library/variable";
import HandleForm from "library/react/handles/form";
import staticContentLib from "lib/staticContent.lib";
import Swal from "sweetalert2";
import {NavigationUpdateOneParamDocument} from "types/services/navigation.service";
import navigationService from "services/navigation.service";
import PagePaths from "constants/pagePaths";
import {ThemeFormSelectValueDocument} from "components/theme/form/input/select";

type PageState = {
    items: ThemeFormSelectValueDocument[]
    mainTabActiveKey: string
    status: ThemeFormSelectValueDocument[]
    isSubmitting: boolean
    mainTitle: string
    formData: NavigationUpdateOneParamDocument,
};

type PageProps = {} & PagePropCommonDocument;

export default class PageNavigationAdd extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            mainTabActiveKey: `general`,
            items: [],
            status: [],
            isSubmitting: false,
            mainTitle: "",
            formData: {
                _id: this.props.router.query._id as string ?? "",
                statusId: 0,
                rank: 0,
                contents: {
                    langId: this.props.getStateApp.pageData.langId,
                    title: "",
                    url: "",
                },
            }
        }
    }

    async componentDidMount() {
        this.setPageTitle();
        await this.getItems();
        this.getStatus();
        if (this.state.formData._id) {
            await this.getItem();
        }
        this.props.setStateApp({
            isPageLoading: false
        })
    }

    async componentDidUpdate(prevProps: PagePropCommonDocument) {
        if (prevProps.getStateApp.pageData.langId != this.props.getStateApp.pageData.langId) {
            this.props.setStateApp({
                isPageLoading: true
            }, async () => {
                await this.getItem()
                this.props.setStateApp({
                    isPageLoading: false
                })
            })
        }
    }

    setPageTitle() {
        let titles: string[] = [
            this.props.t("navigations"),
            this.props.t(this.state.formData._id ? "edit" : "add")
        ];
        if (this.state.formData._id) {
            titles.push(this.state.mainTitle)
        }
        this.props.setBreadCrumb(titles);
    }

    getStatus() {
        this.setState((state: PageState) => {
            state.status = staticContentLib.getStatusForSelect([
                StatusId.Active,
                StatusId.InProgress,
                StatusId.Pending
            ], this.props.t);
            state.formData.statusId = StatusId.Active;
            return state;
        })
    }

    async getItems() {
        let resData = await navigationService.getMany({
            langId: this.props.getStateApp.appData.mainLangId,
            statusId: StatusId.Active,
        });
        if (resData.status) {
            this.setState((state: PageState) => {
                state.items = [{value: "", label: this.props.t("notSelected")}];
                resData.data.forEach(item => {
                    if (!V.isEmpty(this.state.formData._id)) {
                        if (this.state.formData._id == item._id) return;
                    }
                    state.items.push({
                        value: item._id,
                        label: item.contents?.title || this.props.t("[noLangAdd]")
                    });
                });
                return state;
            })
        }
    }

    async getItem() {
        let resData = await navigationService.getOne({
            _id: this.state.formData._id,
            langId: this.props.getStateApp.pageData.langId
        });
        if (resData.status) {
            if (resData.data) {
                const item = resData.data;

                this.setState((state: PageState) => {
                    state.formData = {
                        ...state.formData,
                        ...item,
                        mainId: item.mainId?._id || "",
                        contents: {
                            ...state.formData.contents,
                            ...item.contents,
                            langId: this.props.getStateApp.pageData.langId,
                        }
                    };

                    if (this.props.getStateApp.pageData.langId == this.props.getStateApp.appData.mainLangId) {
                        state.mainTitle = state.formData.contents.title || "";
                    }

                    return state;
                }, () => {
                    this.setPageTitle();
                })
            }
        } else {
            this.navigatePage();
        }
    }

    navigatePage() {
        let pagePath = PagePaths.navigation();
        let path = pagePath.list();
        this.props.router.push(path);
    }

    onSubmit(event: FormEvent) {
        event.preventDefault();
        this.setState({
            isSubmitting: true
        }, async () => {
            let params = {
                ...this.state.formData
            };

            let resData = await ((params._id)
                ? navigationService.updateOne(params)
                : navigationService.add(params));
            this.setState({
                isSubmitting: false
            }, () => this.setMessage())
        })
    }

    setMessage() {
        Swal.fire({
            title: this.props.t("successful"),
            text: `${this.props.t((V.isEmpty(this.state.formData._id)) ? "itemAdded" : "itemEdited")}!`,
            icon: "success",
            timer: 1000,
            timerProgressBar: true,
            didClose: () => this.onCloseSuccessMessage()
        })
    }

    onCloseSuccessMessage() {
        if (!this.state.formData._id) {
            this.navigatePage();
        }
    }

    TabOptions = () => {
        return (
            <div className="row">
                <div className="col-md-7 mb-3">
                    <ThemeFormSelect
                        title={this.props.t("status")}
                        name="formData.statusId"
                        options={this.state.status}
                        value={this.state.status?.findSingle("value", this.state.formData.statusId)}
                        onChange={(item: any, e) => HandleForm.onChangeSelect(e.name, item.value, this)}
                    />
                </div>
                <div className="col-md-7 mb-3">
                    <ThemeFormType
                        title={this.props.t("rank")}
                        name="formData.rank"
                        type="number"
                        required={true}
                        value={this.state.formData.rank}
                        onChange={e => HandleForm.onChangeInput(e, this)}
                    />
                </div>
            </div>
        );
    }

    TabGeneral = () => {
        return (
            <div className="row">
                <div className="col-md-7 mb-3">
                    <ThemeFormType
                        title={`${this.props.t("title")}*`}
                        name="formData.contents.title"
                        type="text"
                        required={true}
                        value={this.state.formData.contents.title}
                        onChange={e => HandleForm.onChangeInput(e, this)}
                    />
                </div>
                <div className="col-md-7 mb-3">
                    <ThemeFormType
                        title={`${this.props.t("url")}*`}
                        name="formData.contents.url"
                        type="text"
                        required={true}
                        value={this.state.formData.contents.url}
                        onChange={e => HandleForm.onChangeInput(e, this)}
                    />
                </div>
                <div className="col-md-7 mb-3">
                    <ThemeFormSelect
                        title={this.props.t("main")}
                        name="formData.mainId"
                        placeholder={this.props.t("chooseMain")}
                        options={this.state.items}
                        value={this.state.items.findSingle("value", this.state.formData.mainId || "")}
                        onChange={(item: any, e) => HandleForm.onChangeSelect(e.name, item.value, this)}
                    />
                </div>
            </div>
        );
    }

    render() {
        return this.props.getStateApp.isPageLoading ? null : (
            <div className="page-post">
                <div className="row mb-3">
                    <div className="col-md-3">
                        <div className="row">
                            <div className="col-6">
                                <button className="btn btn-gradient-dark btn-lg btn-icon-text w-100"
                                        onClick={() => this.navigatePage()}>
                                    <i className="mdi mdi-arrow-left"></i> {this.props.t("returnBack")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <ThemeForm
                        isActiveSaveButton={true}
                        saveButtonText={this.props.t("save")}
                        saveButtonLoadingText={this.props.t("loading")}
                        isSubmitting={this.state.isSubmitting}
                        formAttributes={{onSubmit: (event) => this.onSubmit(event)}}
                    >
                        <div className="grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="theme-tabs">
                                        <Tabs
                                            onSelect={(key: any) => this.setState({mainTabActiveKey: key})}
                                            activeKey={this.state.mainTabActiveKey}
                                            className="mb-5"
                                            transition={false}>
                                            <Tab eventKey="general" title={this.props.t("general")}>
                                                <this.TabGeneral/>
                                            </Tab>
                                            <Tab eventKey="options" title={this.props.t("options")}>
                                                <this.TabOptions/>
                                            </Tab>
                                        </Tabs>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ThemeForm>
                </div>
            </div>
        )
    }
}
