import React, {Component} from 'react'
import {PagePropCommonDocument} from "types/pageProps";
import {ThemeFieldSet, ThemeForm, ThemeFormType} from "components/theme/form";
import {UserRoleId} from "constants/index";
import settingService from "services/setting.service";
import ThemeToast from "components/theme/toast";
import {
    SettingUpdateStaticLanguageParamDocument
} from "types/services/setting";
import {SettingStaticLanguageDocument} from "types/models/setting";

type PageState = {
    isSubmitting: boolean
    formData: SettingUpdateStaticLanguageParamDocument,
};

type PageProps = {} & PagePropCommonDocument;

class PageSettingsStaticLanguages extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            isSubmitting: false,
            formData: {
                staticLanguages: []
            }
        }
    }

    async componentDidMount() {
        this.setPageTitle();
        await this.getSettings();
        this.props.setStateApp({
            isPageLoading: false
        })
    }

    async componentDidUpdate(prevProps: PagePropCommonDocument) {
        if (prevProps.getStateApp.pageData.langId != this.props.getStateApp.pageData.langId) {
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
        let resData = await settingService.get({langId: this.props.getStateApp.pageData.langId, projection: "staticLanguage"})
        if (resData.status && resData.data) {
            let setting = resData.data;
            this.setState((state: PageState) => {
                state.formData = {
                    staticLanguages: setting.staticLanguages?.map(staticLanguage => ({
                        ...staticLanguage,
                        contents: {
                            ...staticLanguage.contents,
                            langId: this.props.getStateApp.pageData.langId
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
            let resData = await settingService.updateStaticLanguage({
                staticLanguages: this.state.formData.staticLanguages
            });
            if (resData.status) {
                new ThemeToast({
                    type: "success",
                    title: this.props.t("successful"),
                    content: this.props.t("settingsUpdated")
                })
            }

            this.setState({isSubmitting: false})
        })
    }

    onInputChange(data: any, key: string, value: any) {
        this.setState((state: PageState) => {
            data[key] = value;
            return state;
        })
    }

    onCreate() {
        this.setState((state: PageState) => {
            state.formData.staticLanguages = [{
                _id: String.createId(),
                isEditing: true,
                langKey: "",
                title: "",
                contents: {
                    langId: this.props.getStateApp.pageData.langId,
                    content: ""
                }
            }, ...state.formData.staticLanguages]
            return state;
        })
    }

    onAccept(data: SettingStaticLanguageDocument) {
        this.setState((state: PageState) => {
            data.isEditing = false;
            return state;
        })
    }

    onDelete(data: SettingStaticLanguageDocument[], index: number) {
        this.setState((state: PageState) => {
            data.remove(index);
            return state;
        })
    }

    onEdit(data: SettingStaticLanguageDocument, index: number) {
        this.setState((state: PageState) => {
            data.isEditing = true;
            return state;
        })
    }

    StaticLanguages = () => {
        const StaticLanguage = (staticLanguageProps: SettingStaticLanguageDocument, staticLanguageIndex: number) => {
            return (
                <div className="col-md-12 mt-4">
                    <ThemeFieldSet
                        legend={`${this.props.t("staticLanguages")} (#${staticLanguageProps.langKey})`}
                        legendElement={
                            this.props.getStateApp.sessionData.roleId == UserRoleId.SuperAdmin
                                ? <i className="mdi mdi-pencil-box text-warning fs-3 cursor-pointer"
                                     onClick={() => this.onEdit(staticLanguageProps, staticLanguageIndex)}></i>
                                : undefined
                        }
                    >
                        <div className="row mt-2">
                            <div className="col-md-12">
                                <ThemeFormType
                                    type="text"
                                    title={staticLanguageProps.title}
                                    value={staticLanguageProps.contents.content}
                                    onChange={e => this.onInputChange(staticLanguageProps.contents, "content", e.target.value)}
                                />
                            </div>
                        </div>
                    </ThemeFieldSet>
                </div>
            )
        }

        const EditStaticLanguage = (staticLanguageProps: SettingStaticLanguageDocument, staticLanguageIndex: number) => {
            return (
                <div className="col-md-12 mt-3">
                    <ThemeFieldSet legend={this.props.t("newStaticLanguage")}>
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <ThemeFormType
                                    title={`${this.props.t("langKey")}*`}
                                    placeholder={this.props.t("langKey")}
                                    type="text"
                                    value={staticLanguageProps.langKey}
                                    onChange={e => this.onInputChange(staticLanguageProps, "langKey", e.target.value)}
                                />
                            </div>
                            <div className="col-md-12 mt-3">
                                <ThemeFormType
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
                    </ThemeFieldSet>
                </div>
            )
        }

        return (
            <div className="row">
                {
                    this.props.getStateApp.sessionData.roleId == UserRoleId.SuperAdmin
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
                                        <this.StaticLanguages/>
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

export default PageSettingsStaticLanguages;
