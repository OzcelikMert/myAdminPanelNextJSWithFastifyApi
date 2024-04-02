import React, {Component, FormEvent} from 'react'
import {Tab, Tabs} from "react-bootstrap";
import {ComponentForm, ComponentFormCheckBox, ComponentFormSelect, ComponentFormType} from "components/elements/form"
import {IPagePropCommon} from "types/pageProps";
import V from "library/variable";
import ReactHandleFormLibrary from "library/react/handles/form";
import {INavigationUpdateWithIdParamService} from "types/services/navigation.service";
import {NavigationService} from "services/navigation.service";
import {IThemeFormSelectValue} from "components/elements/form/input/select";
import {PermissionUtil} from "utils/permission.util";
import {NavigationEndPointPermission} from "constants/endPointPermissions/navigation.endPoint.permission";
import {ComponentUtil} from "utils/component.util";
import {StatusId} from "constants/status";
import {EndPoints} from "constants/endPoints";
import {RouteUtil} from "utils/route.util";
import ComponentToast from "components/elements/toast";

type IPageState = {
    items: IThemeFormSelectValue[]
    mainTabActiveKey: string
    status: IThemeFormSelectValue[]
    isSubmitting: boolean
    mainTitle: string
    formData: INavigationUpdateWithIdParamService,
};

type IPageProps = {} & IPagePropCommon;

export default class PageNavigationAdd extends Component<IPageProps, IPageState> {
    abortController = new AbortController();

    constructor(props: IPageProps) {
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
                    langId: this.props.getStateApp.appData.currentLangId,
                    title: "",
                    url: "",
                },
            }
        }
    }

    async componentDidMount() {
        let permission = this.state.formData._id ? NavigationEndPointPermission.UPDATE : NavigationEndPointPermission.ADD;
        if(PermissionUtil.checkAndRedirect(this.props, permission)){
            await this.getItems();
            this.getStatus();
            if (this.state.formData._id) {
                await this.getItem();
            }
            this.setPageTitle();
            this.props.setStateApp({
                isPageLoading: false
            })
        }
    }

    async componentDidUpdate(prevProps: IPagePropCommon) {
        if (prevProps.getStateApp.appData.currentLangId != this.props.getStateApp.appData.currentLangId) {
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

    componentWillUnmount() {
        this.abortController.abort();
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
        this.setState((state: IPageState) => {
            state.status = ComponentUtil.getStatusForSelect([
                StatusId.Active,
                StatusId.InProgress
            ], this.props.t);
            state.formData.statusId = StatusId.Active;
            return state;
        })
    }

    async getItems() {
        let serviceResult = await NavigationService.getMany({
            langId: this.props.getStateApp.appData.mainLangId,
            statusId: StatusId.Active,
        }, this.abortController.signal);
        if (serviceResult.status && serviceResult.data) {
            this.setState((state: IPageState) => {
                state.items = [{value: "", label: this.props.t("notSelected")}];
                serviceResult.data!.forEach(item => {
                    if (!V.isEmpty(this.state.formData._id)) {
                        if (this.state.formData._id == item._id) return;
                    }
                    state.items.push({
                        value: item._id,
                        label: item.contents?.title || this.props.t("[noLangAdd]")
                    });
                });
                state.formData.rank = state.items.length;
                return state;
            })
        }
    }

    async getItem() {
        let serviceResult = await NavigationService.getWithId({
            _id: this.state.formData._id,
            langId: this.props.getStateApp.appData.currentLangId
        }, this.abortController.signal);
        if (serviceResult.status && serviceResult.data) {
            const item = serviceResult.data;

            await new Promise(resolve => {
                this.setState((state: IPageState) => {
                    state.formData = {
                        ...state.formData,
                        ...item,
                        mainId: item.mainId?._id || "",
                        contents: {
                            ...state.formData.contents,
                            ...item.contents,
                            langId: this.props.getStateApp.appData.currentLangId,
                        }
                    };

                    if (this.props.getStateApp.appData.currentLangId == this.props.getStateApp.appData.mainLangId) {
                        state.mainTitle = state.formData.contents.title || "";
                    }

                    return state;
                }, () => resolve(1));
            })
        } else {
            await this.navigatePage();
        }
    }

    async navigatePage() {
        let pagePath = EndPoints.NAVIGATION_WITH.LIST;
        await RouteUtil.change({props: this.props, path: pagePath});
    }

    async onSubmit(event: FormEvent) {
        event.preventDefault();
        this.setState({
            isSubmitting: true
        }, async () => {
            let params = {
                ...this.state.formData
            };

            let serviceResult = await ((params._id)
                ? NavigationService.updateWithId(params, this.abortController.signal)
                : NavigationService.add(params, this.abortController.signal));
            this.setState({
                isSubmitting: false
            });
            if(serviceResult.status){
                new ComponentToast({
                    type: "success",
                    title: this.props.t("successful"),
                    content: `${this.props.t(this.state.formData._id ? "itemEdited" : "itemAdded")}!`
                });
                if (!this.state.formData._id) {
                    await this.navigatePage();
                }
            }
        })
    }

    TabOptions = () => {
        return (
            <div className="row">
                <div className="col-md-7 mb-3">
                    <ComponentFormSelect
                        title={this.props.t("status")}
                        name="formData.statusId"
                        options={this.state.status}
                        value={this.state.status?.findSingle("value", this.state.formData.statusId)}
                        onChange={(item: any, e) => ReactHandleFormLibrary.onChangeSelect(e.name, item.value, this)}
                    />
                </div>
                <div className="col-md-7 mb-3">
                    <ComponentFormType
                        title={this.props.t("rank")}
                        name="formData.rank"
                        type="number"
                        required={true}
                        value={this.state.formData.rank}
                        onChange={e => ReactHandleFormLibrary.onChangeInput(e, this)}
                    />
                </div>
                <div className="col-md-7">
                    <ComponentFormCheckBox
                        title={this.props.t("primary")}
                        name="formData.isPrimary"
                        checked={Boolean(this.state.formData.isPrimary)}
                        onChange={e => ReactHandleFormLibrary.onChangeInput(e, this)}
                    />
                </div>
                <div className="col-md-7">
                    <ComponentFormCheckBox
                        title={this.props.t("secondary")}
                        name="formData.isSecondary"
                        checked={Boolean(this.state.formData.isSecondary)}
                        onChange={e => ReactHandleFormLibrary.onChangeInput(e, this)}
                    />
                </div>
            </div>
        );
    }

    TabGeneral = () => {
        return (
            <div className="row">
                <div className="col-md-7 mb-3">
                    <ComponentFormType
                        title={`${this.props.t("title")}*`}
                        name="formData.contents.title"
                        type="text"
                        required={true}
                        value={this.state.formData.contents.title}
                        onChange={e => ReactHandleFormLibrary.onChangeInput(e, this)}
                    />
                </div>
                <div className="col-md-7 mb-3">
                    <ComponentFormType
                        title={`${this.props.t("url")}*`}
                        name="formData.contents.url"
                        type="text"
                        required={true}
                        value={this.state.formData.contents.url}
                        onChange={e => ReactHandleFormLibrary.onChangeInput(e, this)}
                    />
                </div>
                <div className="col-md-7 mb-3">
                    <ComponentFormSelect
                        title={this.props.t("main")}
                        name="formData.mainId"
                        placeholder={this.props.t("chooseMain")}
                        options={this.state.items}
                        value={this.state.items.findSingle("value", this.state.formData.mainId || "")}
                        onChange={(item: any, e) => ReactHandleFormLibrary.onChangeSelect(e.name, item.value, this)}
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
                    <ComponentForm
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
                    </ComponentForm>
                </div>
            </div>
        )
    }
}
