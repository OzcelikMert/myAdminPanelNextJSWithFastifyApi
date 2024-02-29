import React, {Component, FormEvent} from 'react'
import {Tab, Tabs} from "react-bootstrap";
import {ComponentForm, ComponentFormSelect, ComponentFormType} from "components/elements/form"
import {IPagePropCommon} from "types/pageProps";
import V from "library/variable";
import ReactHandleFormLibrary from "library/react/handles/form";
import Swal from "sweetalert2";
import {ILanguageUpdateWithIdParamService} from "types/services/language.service";
import {LanguageService} from "services/language.service";
import Image from "next/image";
import {ThemeFormSelectValueDocument} from "components/elements/form/input/select";
import {PermissionUtil} from "utils/permission.util";
import {LanguageEndPointPermission} from "constants/endPointPermissions/language.endPoint.permission";
import {StatusId} from "constants/status";
import {ComponentUtil} from "utils/component.util";
import {EndPoints} from "constants/endPoints";
import {ImageSourceUtil} from "utils/imageSource.util";

type IPageState = {
    mainTabActiveKey: string
    status: ThemeFormSelectValueDocument[]
    flags: ThemeFormSelectValueDocument[]
    isSubmitting: boolean
    mainTitle: string
    formData: ILanguageUpdateWithIdParamService,
};

type IPageProps = {} & IPagePropCommon;

export default class PageSettingLanguageAdd extends Component<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
        this.state = {
            mainTabActiveKey: `general`,
            status: [],
            flags: [],
            isSubmitting: false,
            mainTitle: "",
            formData: {
                _id: this.props.router.query._id as string ?? "",
                statusId: StatusId.Active,
                locale: "",
                shortKey: "",
                title: "",
                image: "",
                rank: 0
            }
        }
    }

    async componentDidMount() {
        let permission = this.state.formData._id ? LanguageEndPointPermission.UPDATE : LanguageEndPointPermission.ADD;
        if(PermissionUtil.checkAndRedirect(this.props, permission)){
            await this.getFlags();
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

    setPageTitle() {
        let titles: string[] = [
            this.props.t("settings"),
            this.props.t("languages"),
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
                StatusId.Disabled
            ], this.props.t);
            return state;
        })
    }

    async getFlags() {
        let serviceResult = await LanguageService.getFlags({});
        if (serviceResult.status && serviceResult.data) {
            this.setState((state: IPageState) => {
                state.flags = [{value: "", label: this.props.t("notSelected")}];
                state.flags = serviceResult.data!.map(item => ({
                    value: item,
                    label: item.split(".")[0].toUpperCase()
                }))
                return state;
            })
        }
    }

    async getItem() {
        let serviceResult = await LanguageService.getWithId({_id: this.state.formData._id});
        if (serviceResult.status && serviceResult.data) {
            const item = serviceResult.data;

            await new Promise(resolve => {
                this.setState((state: IPageState) => {
                    state.formData = {
                        ...state.formData,
                        ...item,
                    };

                    return state;
                }, () => resolve(1));
            })
        } else {
            await this.navigatePage();
        }
    }

    async navigatePage(isReload?: boolean) {
        let pagePath = EndPoints.LANGUAGE_WITH.LIST;
        await this.props.router.push(pagePath);
        if(isReload){
            window.location.reload();
        }
    }

    onSubmit(event: FormEvent) {
        event.preventDefault();
        this.setState({
            isSubmitting: true
        }, async () => {
            let params = {
                ...this.state.formData
            };

            let serviceResult = await ((params._id)
                ? LanguageService.updateWithId(params)
                : LanguageService.add(params));
            this.setState({
                isSubmitting: false
            });
            if(serviceResult.status){
                Swal.fire({
                    title: this.props.t("successful"),
                    text: `${this.props.t((V.isEmpty(this.state.formData._id)) ? "itemAdded" : "itemEdited")}!`,
                    icon: "success",
                    timer: 1000,
                    timerProgressBar: true,
                    didClose: () => this.navigatePage(true)
                })
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
                        title={`${this.props.t("rank")}*`}
                        name="formData.rank"
                        type="number"
                        required={true}
                        value={this.state.formData.rank}
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
                    <div className="row">
                        <div className="col-1 m-auto">
                            <Image
                                src={ImageSourceUtil.getUploadedFlagSrc(this.state.formData.image)}
                                alt={this.state.formData.image}
                                className="img-fluid img-sm"
                                width={100}
                                height={75}
                            />
                        </div>
                        <div className="col-11">
                            <ComponentFormSelect
                                title={this.props.t("image")}
                                name="formData.image"
                                options={this.state.flags}
                                value={this.state.flags.findSingle("value", this.state.formData.image || "")}
                                onChange={(item: any, e) => ReactHandleFormLibrary.onChangeSelect(e.name, item.value, this)}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-7 mb-3">
                    <ComponentFormType
                        title={`${this.props.t("title")}*`}
                        name="formData.title"
                        type="text"
                        required={true}
                        value={this.state.formData.title}
                        onChange={e => ReactHandleFormLibrary.onChangeInput(e, this)}
                    />
                </div>
                <div className="col-md-7 mb-3">
                    <ComponentFormType
                        title={`${this.props.t("shortKey")}*`}
                        name="formData.shortKey"
                        type="text"
                        required={true}
                        value={this.state.formData.shortKey}
                        onChange={e => ReactHandleFormLibrary.onChangeInput(e, this)}
                    />
                </div>
                <div className="col-md-7 mb-3">
                    <ComponentFormType
                        title={`${this.props.t("locale")}*`}
                        name="formData.locale"
                        type="text"
                        required={true}
                        value={this.state.formData.locale}
                        onChange={e => ReactHandleFormLibrary.onChangeInput(e, this)}
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
