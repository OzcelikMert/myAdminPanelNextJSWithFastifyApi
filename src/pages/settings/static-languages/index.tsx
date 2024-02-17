import React, {Component} from 'react'
import {IPagePropCommon} from "types/pageProps";
import {ComponentFieldSet, ComponentForm, ComponentFormType} from "components/elements/form";
import {SettingService} from "services/setting.service";
import ComponentToast from "components/elements/toast";
import {ISettingUpdateStaticLanguageParamService} from "types/services/setting.service";
import {ISettingStaticLanguageModel} from "types/models/setting.model";
import {PermissionUtil} from "utils/permission.util";
import {SettingsEndPointPermission} from "constants/endPointPermissions/settings.endPoint.permission";
import {SettingProjectionKeys} from "constants/settingProjections";
import {UserRoleId} from "constants/userRoles";

type IPageState = {
    isSubmitting: boolean
    formData: ISettingUpdateStaticLanguageParamService,
};

type IPageProps = {} & IPagePropCommon;

class PageSettingsStaticLanguages extends Component<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
        this.state = {
            isSubmitting: false,
            formData: {
                staticLanguages: []
            }
        }
    }

    async componentDidMount() {
        if(PermissionUtil.checkAndRedirect(this.props, SettingsEndPointPermission.UPDATE_STATIC_LANGUAGE)){
            this.setPageTitle();
            await this.getSettings();
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
                await this.getSettings()
                this.props.setStateApp({
                    isPageLoading: false
                })
            })
        }
    }

    setPageTitle() {
        this.props.setBreadCrumb([this.props.t("settings"), this.props.t("staticLanguages")])
    }

    async getSettings() {
        let resData = await SettingService.get({langId: this.props.getStateApp.appData.currentLangId, projection: SettingProjectionKeys.StaticLanguage})
        if (resData.status && resData.data) {
            let setting = resData.data;
            this.setState((state: IPageState) => {
                state.formData = {
                    staticLanguages: setting.staticLanguages?.map(staticLanguage => ({
                        ...staticLanguage,
                        contents: {
                            ...staticLanguage.contents,
                            langId: this.props.getStateApp.appData.currentLangId
                        }
                    })) ?? []
                }
                return state;
            })
        }
    }

    onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.setState({
            isSubmitting: true
        }, async () => {
            let resData = await SettingService.updateStaticLanguage({
                staticLanguages: this.state.formData.staticLanguages
            });
            if (resData.status) {
                new ComponentToast({
                    type: "success",
                    title: this.props.t("successful"),
                    content: this.props.t("settingsUpdated")
                })
            }

            this.setState({isSubmitting: false})
        })
    }

    onInputChange(data: any, key: string, value: any) {
        this.setState((state: IPageState) => {
            data[key] = value;
            return state;
        })
    }

    onCreate() {
        this.setState((state: IPageState) => {
            state.formData.staticLanguages = [{
                _id: String.createId(),
                isEditing: true,
                langKey: "",
                title: "",
                contents: {
                    langId: this.props.getStateApp.appData.currentLangId,
                    content: ""
                }
            }, ...state.formData.staticLanguages]
            return state;
        })
    }

    onAccept(data: ISettingStaticLanguageModel) {
        this.setState((state: IPageState) => {
            data.isEditing = false;
            return state;
        })
    }

    onDelete(data: ISettingStaticLanguageModel[], index: number) {
        this.setState((state: IPageState) => {
            data.remove(index);
            return state;
        })
    }

    onEdit(data: ISettingStaticLanguageModel, index: number) {
        this.setState((state: IPageState) => {
            data.isEditing = true;
            return state;
        })
    }

    StaticLanguages = () => {
        const StaticLanguage = (staticLanguageProps: ISettingStaticLanguageModel, staticLanguageIndex: number) => {
            return (
                <div className="col-md-12 mt-4">
                    <ComponentFieldSet
                        legend={`${this.props.t("staticLanguages")} (#${staticLanguageProps.langKey})`}
                        legendElement={
                            this.props.getStateApp.sessionAuth?.user.roleId == UserRoleId.SuperAdmin
                                ? <i className="mdi mdi-pencil-box text-warning fs-3 cursor-pointer"
                                     onClick={() => this.onEdit(staticLanguageProps, staticLanguageIndex)}></i>
                                : undefined
                        }
                    >
                        <div className="row mt-2">
                            <div className="col-md-12">
                                <ComponentFormType
                                    type="text"
                                    title={staticLanguageProps.title}
                                    value={staticLanguageProps.contents.content}
                                    onChange={e => this.onInputChange(staticLanguageProps.contents, "content", e.target.value)}
                                />
                            </div>
                        </div>
                    </ComponentFieldSet>
                </div>
            )
        }

        const EditStaticLanguage = (staticLanguageProps: ISettingStaticLanguageModel, staticLanguageIndex: number) => {
            return (
                <div className="col-md-12 mt-3">
                    <ComponentFieldSet legend={this.props.t("newStaticLanguage")}>
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <ComponentFormType
                                    title={`${this.props.t("langKey")}*`}
                                    placeholder={this.props.t("langKey")}
                                    type="text"
                                    value={staticLanguageProps.langKey}
                                    onChange={e => this.onInputChange(staticLanguageProps, "langKey", e.target.value)}
                                />
                            </div>
                            <div className="col-md-12 mt-3">
                                <ComponentFormType
                                    title={`${this.props.t("title")}`}
                                    placeholder={this.props.t("title")}
                                    type="text"
                                    value={staticLanguageProps.title}
                                    onChange={e => this.onInputChange(staticLanguageProps, "title", e.target.value)}
                                />
                            </div>
                            <div className="col-md-12 mt-3">
                                <button type={"button"} className="btn btn-gradient-success btn-lg"
                                        onClick={() => this.onAccept(staticLanguageProps)}>{this.props.t("okay")}</button>
                                <button type={"button"} className="btn btn-gradient-danger btn-lg"
                                        onClick={() => this.onDelete(this.state.formData.staticLanguages, staticLanguageIndex)}><i className="mdi mdi-trash-can-outline"></i> {this.props.t("delete")}</button>
                            </div>
                        </div>
                    </ComponentFieldSet>
                </div>
            )
        }

        return (
            <div className="row">
                {
                    this.props.getStateApp.sessionAuth?.user.roleId == UserRoleId.SuperAdmin
                        ? <div className="col-md-7">
                            <button type={"button"} className="btn btn-gradient-success btn-lg"
                                    onClick={() => this.onCreate()}>+ {this.props.t("newStaticLanguage")}
                            </button>
                        </div> : null
                }
                <div className="col-md-7 mt-2">
                    <div className="row">
                        {
                            this.state.formData.staticLanguages?.map((item, index) =>
                                item.isEditing
                                    ? EditStaticLanguage(item, index)
                                    : StaticLanguage(item, index))
                        }
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return this.props.getStateApp.isPageLoading ? null : (
            <div className="page-settings">
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
                                        <this.StaticLanguages/>
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

export default PageSettingsStaticLanguages;
