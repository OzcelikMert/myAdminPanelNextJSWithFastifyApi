import React, {Component} from 'react'
import {PagePropCommonDocument} from "types/pageProps";
import {ThemeFieldSet, ThemeForm, ThemeFormSelect, ThemeFormType} from "components/theme/form";
import HandleForm from "library/react/handles/form";
import {Languages, StatusId, UserRoleId} from "constants/index";
import settingService from "services/setting.service";
import languageService from "services/language.service";
import ServerInfoDocument from "types/services/serverInfo";
import serverInfoService from "services/serverInfo.service";
import ThemeToast from "components/theme/toast";
import ThemeChooseImage from "components/theme/chooseImage";
import imageSourceLib from "lib/imageSource.lib";
import {SettingUpdateGeneralParamDocument} from "types/services/setting";
import {Tab, Tabs} from "react-bootstrap";
import localStorageUtil from "utils/localStorage.util";
import Spinner from "react-bootstrap/Spinner";
import Image from "next/image"
import {ThemeFormSelectValueDocument} from "components/theme/form/input/select";

type PageState = {
    languages: ThemeFormSelectValueDocument[]
    panelLanguages: ThemeFormSelectValueDocument[]
    isSubmitting: boolean
    serverInfo: ServerInfoDocument
    formData: SettingUpdateGeneralParamDocument & { panelLangId: string },
    mainTabActiveKey: string
    isServerInfoLoading: boolean
    isLogoSelection: boolean
    isLogoSecondSelection: boolean
    isIconSelection: boolean
}

type PageProps = {} & PagePropCommonDocument;

export default class PageSettingsGeneral extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            isIconSelection: false,
            isLogoSecondSelection: false,
            isLogoSelection: false,
            isServerInfoLoading: true,
            languages: [],
            panelLanguages: [],
            isSubmitting: false,
            mainTabActiveKey: `general`,
            serverInfo: {
                cpu: "0",
                storage: "0",
                memory: "0"
            },
            formData: {
                defaultLangId: "",
                contact: {},
                panelLangId: localStorageUtil.adminLanguage.get.toString()
            }
        }
    }

    async componentDidMount() {
        this.setPageTitle();
        this.getServerDetails();
        this.getPanelLanguages();
        await this.getLanguages();
        await this.getSettings();
        this.props.setStateApp({
            isPageLoading: false
        })
    }

    setPageTitle() {
        this.props.setBreadCrumb([this.props.t("settings"), this.props.t("general")])
    }

    async getSettings() {
        let resData = await settingService.get({projection: "general"})
        if (resData.status && resData.data) {
            let setting = resData.data;
            this.setState((state: PageState) => {
                state.formData = {
                    ...this.state.formData,
                    logo: setting.logo,
                    logoTwo: setting.logoTwo,
                    icon: setting.icon,
                    head: setting.head,
                    script: setting.script,
                    defaultLangId: setting.defaultLangId,
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
            panelLanguages: Languages.map(language => ({
                label: language.title,
                value: language.id.toString()
            }))
        })
    }

    async getLanguages() {
        let resData = await languageService.getMany({statusId: StatusId.Active})
        if (resData.status) {
            this.setState({
                languages: resData.data.map(lang => ({
                    label: lang.title,
                    value: lang._id
                }))
            })
        }
    }

    async getServerDetails() {
        let resData = await serverInfoService.get();
        if (resData.status) {
            this.setState({
                serverInfo: resData.data,
                isServerInfoLoading: false
            })
        }
    }

    onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.setState({
            isSubmitting: true
        }, async () => {
            let resData = await settingService.updateGeneral({
                ...this.state.formData,
                head: this.state.formData.head,
                script: this.state.formData.script,
            });
            if (resData.status) {
                this.props.setStateApp({
                    pageData: {
                        mainLangId: this.state.formData.defaultLangId
                    }
                }, () => {
                    new ThemeToast({
                        type: "success",
                        title: this.props.t("successful"),
                        content: this.props.t("settingsUpdated")
                    })
                });
            }
            this.setState({
                isSubmitting: false
            }, () => {
                if (this.state.formData.panelLangId != localStorageUtil.adminLanguage.get.toString()) {
                    let language = Languages.findSingle("id", Number(this.state.formData.panelLangId));
                    if (language) {
                        localStorageUtil.adminLanguage.set(Number(this.state.formData.panelLangId));
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
                    <ThemeFormType
                        title={this.props.t("head")}
                        name="formData.head"
                        type="textarea"
                        value={this.state.formData.head}
                        onChange={e => HandleForm.onChangeInput(e, this)}
                    />
                </div>
                <div className="col-md-7 mb-3">
                    <ThemeFormType
                        title={this.props.t("script")}
                        name="formData.script"
                        type="textarea"
                        value={this.state.formData.script}
                        onChange={e => HandleForm.onChangeInput(e, this)}
                    />
                </div>
            </div>
        );
    }

    TabContact = () => {
        return (
            <div className="row">
                <div className="col-md-7 mb-3">
                    <ThemeFormType
                        title={this.props.t("email")}
                        name="formData.contact.email"
                        type="email"
                        value={this.state.formData.contact?.email}
                        onChange={e => HandleForm.onChangeInput(e, this)}
                    />
                </div>
                <div className="col-md-7 mb-3">
                    <ThemeFormType
                        title={this.props.t("phone")}
                        name="formData.contact.phone"
                        type="tel"
                        value={this.state.formData.contact?.phone}
                        onChange={e => HandleForm.onChangeInput(e, this)}
                    />
                </div>
                <div className="col-md-7 mb-3">
                    <ThemeFormType
                        title={this.props.t("address")}
                        name="formData.contact.address"
                        type="text"
                        value={this.state.formData.contact?.address}
                        onChange={e => HandleForm.onChangeInput(e, this)}
                    />
                </div>
                ,
                <div className="col-md-7 mb-3">
                    <ThemeFormType
                        title={this.props.t("addressMap")}
                        name="formData.contact.addressMap"
                        type="text"
                        value={this.state.formData.contact?.addressMap}
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
                    <ThemeFormSelect
                        title={this.props.t("websiteMainLanguage").toCapitalizeCase()}
                        name="formData.defaultLangId"
                        isMulti={false}
                        isSearchable={false}
                        options={this.state.languages}
                        value={this.state.languages.findSingle("value", this.state.formData.defaultLangId || "")}
                        onChange={(item: any, e) => HandleForm.onChangeSelect(e.name, item.value, this)}
                    />
                </div>
                <div className="col-md-7 mb-3">
                    <ThemeFieldSet legend={this.props.t("logo")}>
                        <ThemeChooseImage
                            {...this.props}
                            isShow={this.state.isLogoSelection}
                            onHide={() => this.setState({isLogoSelection: false})}
                            onSelected={images => this.setState((state: PageState) => {
                                state.formData.logo = images[0];
                                return state;
                            })}
                            isMulti={false}
                        />
                        <div>
                            <Image
                                src={imageSourceLib.getUploadedImageSrc(this.state.formData.logo)}
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
                    </ThemeFieldSet>
                </div>
                <div className="col-md-7 mb-3">
                    <ThemeFieldSet legend={this.props.t("logo") + " - 2"}>
                        <ThemeChooseImage
                            {...this.props}
                            isShow={this.state.isLogoSecondSelection}
                            onHide={() => this.setState({isLogoSecondSelection: false})}
                            onSelected={images => this.setState((state: PageState) => {
                                state.formData.logoTwo = images[0];
                                return state;
                            })}
                            isMulti={false}
                        />
                        <div>
                            <Image
                                src={imageSourceLib.getUploadedImageSrc(this.state.formData.logoTwo)}
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
                    </ThemeFieldSet>
                </div>
                <div className="col-md-7 mb-3">
                    <ThemeFieldSet legend={this.props.t("icon")}>
                        <ThemeChooseImage
                            {...this.props}
                            isShow={this.state.isIconSelection}
                            onHide={() => this.setState({isIconSelection: false})}
                            onSelected={images => this.setState((state: PageState) => {
                                state.formData.icon = images[0];
                                return state;
                            })}
                            isMulti={false}
                        />
                        <div>
                            <Image
                                src={imageSourceLib.getUploadedImageSrc(this.state.formData.icon)}
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
                    </ThemeFieldSet>
                </div>
                <div className="col-md-7 mb-3">
                    <ThemeFormSelect
                        title={this.props.t("adminPanelLanguage").toCapitalizeCase()}
                        name="formData.panelLangId"
                        isMulti={false}
                        isSearchable={false}
                        options={this.state.panelLanguages}
                        value={this.state.panelLanguages.findSingle("value", this.state.formData.panelLangId)}
                        onChange={(item: any, e) => HandleForm.onChangeSelect(e.name, item.value, this)}
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
                                <div
                                    className="d-flex align-items-center justify-content-center flex-column flex-sm-row">
                                    <i className="mdi mdi-harddisk text-primary ms-0 me-sm-4 icon-lg"></i>
                                    <div className="wrapper text-center text-sm-end">
                                        <p className="card-text mb-0 text-dark">{this.props.t("storage")}</p>
                                        <div className="fluid-container">
                                            {
                                                this.state.isServerInfoLoading ? <Spinner/> :
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
                                        <div className="fluid-container">
                                            {
                                                this.state.isServerInfoLoading ? <Spinner/> :
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
                                        <div className="fluid-container">
                                            {
                                                this.state.isServerInfoLoading ? <Spinner/> :
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
                                                <Tab eventKey="contact" title={this.props.t("contact")}>
                                                    <this.TabContact/>
                                                </Tab>
                                                {
                                                    this.props.getStateApp.sessionData.roleId == UserRoleId.SuperAdmin
                                                        ? <Tab eventKey="tools" title={this.props.t("tools")}>
                                                            <this.TabTools/>
                                                        </Tab> : null
                                                }
                                            </Tabs>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ThemeForm>
                    </div>
                </div>

            </div>
        )
    }
}
