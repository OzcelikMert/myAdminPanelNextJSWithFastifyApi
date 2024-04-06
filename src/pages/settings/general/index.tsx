import React, {Component} from 'react'
import {IPagePropCommon} from "types/pageProps";
import {ComponentFieldSet, ComponentForm, ComponentFormSelect, ComponentFormType} from "@components/elements/form";
import ReactHandleFormLibrary from "@library/react/handles/form";
import {SettingService} from "@services/setting.service";
import {ServerInfoService} from "@services/serverInfo.service";
import ComponentToast from "@components/elements/toast";
import ComponentThemeChooseImage from "@components/theme/chooseImage";
import {ISettingUpdateGeneralParamService} from "types/services/setting.service";
import {Tab, Tabs} from "react-bootstrap";
import Image from "next/image"
import {IThemeFormSelectValue} from "@components/elements/form/input/select";
import {IServerInfoGetResultService} from "types/services/serverInfo.service";
import {LocalStorageUtil} from "@utils/localStorage.util";
import {PermissionUtil} from "@utils/permission.util";
import {SettingsEndPointPermission} from "@constants/endPointPermissions/settings.endPoint.permission";
import {SettingProjectionKeys} from "@constants/settingProjections";
import {languages} from "@constants/languages";
import {ComponentUtil} from "@utils/component.util";
import {ImageSourceUtil} from "@utils/imageSource.util";
import {UserRoleId} from "@constants/userRoles";
import ComponentSpinnerDonut from "@components/elements/spinners/donut";

type IPageState = {
    panelLanguages: IThemeFormSelectValue[]
    isSubmitting: boolean
    serverInfo: IServerInfoGetResultService
    formData: ISettingUpdateGeneralParamService & { panelLangId: string },
    mainTabActiveKey: string
    isServerInfoLoading: boolean
    isLogoSelection: boolean
    isLogoSecondSelection: boolean
    isIconSelection: boolean
}

type IPageProps = {} & IPagePropCommon;

export default class PageSettingsGeneral extends Component<IPageProps, IPageState> {
    abortController = new AbortController();

    constructor(props: IPageProps) {
        super(props);
        this.state = {
            isIconSelection: false,
            isLogoSecondSelection: false,
            isLogoSelection: false,
            isServerInfoLoading: true,
            panelLanguages: [],
            isSubmitting: false,
            mainTabActiveKey: `general`,
            serverInfo: {
                cpu: "0",
                storage: "0",
                memory: "0"
            },
            formData: {
                contact: {},
                panelLangId: LocalStorageUtil.getLanguageId().toString()
            }
        }
    }

    async componentDidMount() {
        if (PermissionUtil.checkAndRedirect(this.props, SettingsEndPointPermission.UPDATE_GENERAL)) {
            this.setPageTitle();
            this.getServerDetails();
            this.getPanelLanguages();
            await this.getSettings();
            this.props.setStateApp({
                isPageLoading: false
            })
        }
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    setPageTitle() {
        this.props.setBreadCrumb([this.props.t("settings"), this.props.t("general")])
    }

    async getSettings() {
        let serviceResult = await SettingService.get({projection: SettingProjectionKeys.General}, this.abortController.signal)
        if (serviceResult.status && serviceResult.data) {
            let setting = serviceResult.data;
            this.setState((state: IPageState) => {
                state.formData = {
                    ...this.state.formData,
                    logo: setting.logo,
                    logoTwo: setting.logoTwo,
                    icon: setting.icon,
                    head: setting.head,
                    script: setting.script,
                    contact: {
                        ...setting.contact
                    },
                }
                return state;
            })
        }
    }

    getPanelLanguages() {
        this.setState({
            panelLanguages: ComponentUtil.getPanelLanguageForSelect(languages)
        })
    }

    async getServerDetails() {
        let serviceResult = await ServerInfoService.get(this.abortController.signal);
        if (serviceResult.status && serviceResult.data) {
            this.setState({
                serverInfo: serviceResult.data,
                isServerInfoLoading: false
            })
        }
    }

    onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.setState({
            isSubmitting: true
        }, async () => {
            let serviceResult = await SettingService.updateGeneral({
                ...this.state.formData,
                head: this.state.formData.head,
                script: this.state.formData.script,
            }, this.abortController.signal);
            if (serviceResult.status) {
                new ComponentToast({
                    type: "success",
                    title: this.props.t("successful"),
                    content: this.props.t("settingsUpdated")
                })
            }
            this.setState({
                isSubmitting: false
            }, () => {
                if (this.state.formData.panelLangId != LocalStorageUtil.getLanguageId().toString()) {
                    let language = languages.findSingle("id", Number(this.state.formData.panelLangId));
                    if (language) {
                        LocalStorageUtil.setLanguageId((Number(this.state.formData.panelLangId)));
                        window.location.reload();
                    }
                }
            })
        })
    }

    TabTools = () => {
        return (
            <div className="row">
                <div className="col-md-7 mb-3">
                    <ComponentFormType
                        title={this.props.t("head")}
                        name="formData.head"
                        type="textarea"
                        value={this.state.formData.head}
                        onChange={e => ReactHandleFormLibrary.onChangeInput(e, this)}
                    />
                </div>
                <div className="col-md-7 mb-3">
                    <ComponentFormType
                        title={this.props.t("script")}
                        name="formData.script"
                        type="textarea"
                        value={this.state.formData.script}
                        onChange={e => ReactHandleFormLibrary.onChangeInput(e, this)}
                    />
                </div>
            </div>
        );
    }

    TabContact = () => {
        return (
            <div className="row">
                <div className="col-md-7 mb-3">
                    <ComponentFormType
                        title={this.props.t("email")}
                        name="formData.contact.email"
                        type="email"
                        value={this.state.formData.contact?.email}
                        onChange={e => ReactHandleFormLibrary.onChangeInput(e, this)}
                    />
                </div>
                <div className="col-md-7 mb-3">
                    <ComponentFormType
                        title={this.props.t("phone")}
                        name="formData.contact.phone"
                        type="tel"
                        value={this.state.formData.contact?.phone}
                        onChange={e => ReactHandleFormLibrary.onChangeInput(e, this)}
                    />
                </div>
                <div className="col-md-7 mb-3">
                    <ComponentFormType
                        title={this.props.t("address")}
                        name="formData.contact.address"
                        type="text"
                        value={this.state.formData.contact?.address}
                        onChange={e => ReactHandleFormLibrary.onChangeInput(e, this)}
                    />
                </div>
                ,
                <div className="col-md-7 mb-3">
                    <ComponentFormType
                        title={this.props.t("addressMap")}
                        name="formData.contact.addressMap"
                        type="text"
                        value={this.state.formData.contact?.addressMap}
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
                    <ComponentFieldSet legend={this.props.t("logo")}>
                        <ComponentThemeChooseImage
                            {...this.props}
                            isShow={this.state.isLogoSelection}
                            onHide={() => this.setState({isLogoSelection: false})}
                            onSelected={images => this.setState((state: IPageState) => {
                                state.formData.logo = images[0];
                                return state;
                            })}
                            isMulti={false}
                        />
                        <div>
                            <Image
                                src={ImageSourceUtil.getUploadedImageSrc(this.state.formData.logo)}
                                alt="Empty Image"
                                className="post-image img-fluid"
                                width={100}
                                height={100}
                            />
                            <button
                                type="button"
                                className="btn btn-gradient-warning btn-xs ms-1"
                                onClick={() => this.setState({isLogoSelection: true})}
                            ><i className="fa fa-pencil-square-o"></i></button>
                        </div>
                    </ComponentFieldSet>
                </div>
                <div className="col-md-7 mb-3">
                    <ComponentFieldSet legend={this.props.t("logo") + " - 2"}>
                        <ComponentThemeChooseImage
                            {...this.props}
                            isShow={this.state.isLogoSecondSelection}
                            onHide={() => this.setState({isLogoSecondSelection: false})}
                            onSelected={images => this.setState((state: IPageState) => {
                                state.formData.logoTwo = images[0];
                                return state;
                            })}
                            isMulti={false}
                        />
                        <div>
                            <Image
                                src={ImageSourceUtil.getUploadedImageSrc(this.state.formData.logoTwo)}
                                alt="Empty Image"
                                className="post-image img-fluid"
                                width={100}
                                height={100}
                            />
                            <button
                                type="button"
                                className="btn btn-gradient-warning btn-xs ms-1"
                                onClick={() => this.setState({isLogoSecondSelection: true})}
                            ><i className="fa fa-pencil-square-o"></i></button>
                        </div>
                    </ComponentFieldSet>
                </div>
                <div className="col-md-7 mb-3">
                    <ComponentFieldSet legend={this.props.t("icon")}>
                        <ComponentThemeChooseImage
                            {...this.props}
                            isShow={this.state.isIconSelection}
                            onHide={() => this.setState({isIconSelection: false})}
                            onSelected={images => this.setState((state: IPageState) => {
                                state.formData.icon = images[0];
                                return state;
                            })}
                            isMulti={false}
                        />
                        <div>
                            <Image
                                src={ImageSourceUtil.getUploadedImageSrc(this.state.formData.icon)}
                                alt="Empty Image"
                                className="post-image img-fluid"
                                width={100}
                                height={100}
                            />
                            <button
                                type="button"
                                className="btn btn-gradient-warning btn-xs ms-1"
                                onClick={() => this.setState({isIconSelection: true})}
                            ><i className="fa fa-pencil-square-o"></i></button>
                        </div>
                    </ComponentFieldSet>
                </div>
                <div className="col-md-7 mb-3">
                    <ComponentFormSelect
                        title={this.props.t("adminPanelLanguage").toCapitalizeCase()}
                        name="formData.panelLangId"
                        isMulti={false}
                        isSearchable={false}
                        options={this.state.panelLanguages}
                        value={this.state.panelLanguages.findSingle("value", this.state.formData.panelLangId)}
                        onChange={(item: any, e) => ReactHandleFormLibrary.onChangeSelect(e.name, item.value, this)}
                    />
                </div>
            </div>
        );
    }

    ServerInfo = () => {
        return (
            <div className="col-12 grid-margin">
                <div className="card card-statistics">
                    <div className="row">
                        <div className="card-col col-xl-4 col-lg-4 col-md-4 col-6">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-center flex-column flex-sm-row ">
                                    <i className="mdi mdi-harddisk text-primary ms-0 me-sm-4 icon-lg"></i>
                                    <div className="wrapper text-center text-sm-end">
                                        <p className="card-text mb-0 text-dark">{this.props.t("storage")}</p>
                                        <div className="fluid-container position-relative">
                                            {
                                                this.state.isServerInfoLoading ? <ComponentSpinnerDonut/> :
                                                    <h3 className="mb-0 font-weight-medium text-dark">{this.state.serverInfo.storage}%</h3>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-col col-xl-4 col-lg-4 col-md-4 col-6">
                            <div className="card-body">
                                <div
                                    className="d-flex align-items-center justify-content-center flex-column flex-sm-row">
                                    <i className="mdi mdi-memory text-primary ms-0 me-sm-4 icon-lg"></i>
                                    <div className="wrapper text-center text-sm-end">
                                        <p className="card-text mb-0 text-dark">{this.props.t("memory")}</p>
                                        <div className="fluid-container position-relative">
                                            {
                                                this.state.isServerInfoLoading ? <ComponentSpinnerDonut/> :
                                                    <h3 className="mb-0 font-weight-medium text-dark">{this.state.serverInfo.memory}%</h3>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-col col-xl-4 col-lg-4 col-md-4 col-6">
                            <div className="card-body">
                                <div
                                    className="d-flex align-items-center justify-content-center flex-column flex-sm-row">
                                    <i className="fa fa-microchip text-primary ms-0 me-sm-4 icon-lg"></i>
                                    <div className="wrapper text-center text-sm-end">
                                        <p className="card-text mb-0 text-dark">{this.props.t("processor")}</p>
                                        <div className="fluid-container position-relative">
                                            {
                                                this.state.isServerInfoLoading ? <ComponentSpinnerDonut/> :
                                                    <h3 className="mb-0 font-weight-medium text-dark">{this.state.serverInfo.cpu}%</h3>
                                            }
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

    render() {
        return this.props.getStateApp.isPageLoading ? null : (
            <div className="page-settings">
                <div className="row">
                    <this.ServerInfo/>
                </div>
                <div className="row">
                    <div className="col-md-12">
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
                                                <Tab eventKey="contact" title={this.props.t("contact")}>
                                                    <this.TabContact/>
                                                </Tab>
                                                {
                                                    this.props.getStateApp.sessionAuth?.user.roleId == UserRoleId.SuperAdmin
                                                        ? <Tab eventKey="tools" title={this.props.t("tools")}>
                                                            <this.TabTools/>
                                                        </Tab> : null
                                                }
                                            </Tabs>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ComponentForm>
                    </div>
                </div>

            </div>
        )
    }
}
