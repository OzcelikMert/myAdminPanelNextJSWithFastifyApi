import React, {Component} from 'react'
import {IPagePropCommon} from "types/pageProps";
import {ComponentFieldSet, ComponentForm, ComponentFormSelect, ComponentFormType} from "components/elements/form";
import {UserRoleId} from "constants/index";
import settingService from "services/setting.service";
import ComponentToast from "components/elements/toast";
import {
    ISettingUpdateSocialMediaParamService,
} from "types/services/setting.service";
import { ISettingSocialMediaModel } from 'types/models/setting.model';

type IPageState = {
    isSubmitting: boolean
    formData: ISettingUpdateSocialMediaParamService,
};

type IPageProps = {} & IPagePropCommon;

export default class PageSettingsSocialMedia extends Component<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
        this.state = {
            isSubmitting: false,
            formData: {
                socialMedia: []
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

    setPageTitle() {
        this.props.setBreadCrumb([this.props.t("settings"), this.props.t("socialMedia")])
    }

    async getSettings() {
        let resData = await settingService.get({projection: "socialMedia"})
        if (resData.status && resData.data) {
            let setting = resData.data;
            this.setState((state: IPageState) => {
                state.formData = {
                    socialMedia: setting.socialMedia || []
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
            let resData = await settingService.updateSocialMedia(this.state.formData)
            if (resData.status) {
                new ComponentToast({
                    type: "success",
                    title: this.props.t("successful"),
                    content: this.props.t("settingsUpdated")
                })
            }

            this.setState({
                isSubmitting: false
            })
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
            state.formData.socialMedia = [{
                _id: String.createId(),
                elementId: "",
                url: "",
                title: ""
            }, ...state.formData.socialMedia];
            return state;
        })
    }

    onAccept(data: ISettingSocialMediaModel) {
        this.setState((state: IPageState) => {
            data.isEditing = false;
            return state;
        })
    }

    onDelete(data: ISettingSocialMediaModel[], index: number) {
        this.setState((state: IPageState) => {
            data.remove(index);
            return state;
        })
    }

    onEdit(data: ISettingSocialMediaModel) {
        this.setState((state: IPageState) => {
            data.isEditing = true;
            return state;
        })
    }

    SocialMediaPlatforms = () => {
        const SocialMedia = (props: ISettingSocialMediaModel, index: number) => {
            return (
                <div className="col-md-12 mt-3">
                    <ComponentFieldSet
                        legend={`${this.props.t("socialMedia")} (#${props.elementId})`}
                        legendElement={
                            this.props.getStateApp.sessionData.roleId == UserRoleId.SuperAdmin
                                ? <i className="mdi mdi-pencil-box text-warning fs-3 cursor-pointer"
                                     onClick={() => this.onEdit(props)}></i>
                                : undefined
                        }
                    >
                        <div className="row mt-2">
                            <div className="col-md-12">
                                <ComponentFormType
                                    type="url"
                                    title={props.title}
                                    value={props.url}
                                    onChange={e => this.onInputChange(props, "url", e.target.value)}
                                />
                            </div>
                        </div>
                    </ComponentFieldSet>
                </div>
            )
        }

        const EditSocialMedia = (props: ISettingSocialMediaModel, index: number) => {
            return (
                <div className="col-md-12 mt-3">
                    <ComponentFieldSet legend={this.props.t("newSocialMedia")}>
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <ComponentFormType
                                    type="text"
                                    title={this.props.t("elementId")}
                                    value={props.elementId}
                                    onChange={e => this.onInputChange(props, "elementId", e.target.value)}
                                />
                            </div>
                            <div className="col-md-12 mt-3">
                                <ComponentFormType
                                    type="text"
                                    title={this.props.t("title")}
                                    value={props.title}
                                    onChange={e => this.onInputChange(props, "title", e.target.value)}
                                />
                            </div>
                            <div className="col-md-12 mt-3">
                                <button type={"button"} className="btn btn-gradient-success btn-lg"
                                        onClick={() => this.onAccept(props)}>{this.props.t("okay")}</button>
                                <button type={"button"} className="btn btn-gradient-danger btn-lg"
                                        onClick={() => this.onDelete(this.state.formData.socialMedia, index)}>{this.props.t("delete")}</button>
                            </div>
                        </div>
                    </ComponentFieldSet>
                </div>
            )
        }

        return (
            <div className="row">
                {
                    this.props.getStateApp.sessionData.roleId == UserRoleId.SuperAdmin
                        ? <div className="col-md-7">
                            <button type={"button"} className="btn btn-gradient-success btn-lg"
                                    onClick={() => this.onCreate()}>+ {this.props.t("newSocialMedia")}
                            </button>
                        </div> : null
                }
                <div className="col-md-7 mt-2">
                    <div className="row">
                        {
                            this.state.formData.socialMedia?.map((item, index) =>
                                item.isEditing
                                    ? EditSocialMedia(item, index)
                                    : SocialMedia(item, index)
                            )
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
                                        <this.SocialMediaPlatforms/>
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
