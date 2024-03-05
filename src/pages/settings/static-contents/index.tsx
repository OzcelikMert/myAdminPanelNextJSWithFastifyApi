import React, {Component} from 'react'
import {IPagePropCommon} from "types/pageProps";
import {ComponentFieldSet, ComponentForm, ComponentFormSelect, ComponentFormType} from "components/elements/form";
import {SettingService} from "services/setting.service";
import ComponentToast from "components/elements/toast";
import {ISettingUpdateStaticContentParamService} from "types/services/setting.service";
import {ISettingStaticContentModel} from "types/models/setting.model";
import {PermissionUtil} from "utils/permission.util";
import {SettingsEndPointPermission} from "constants/endPointPermissions/settings.endPoint.permission";
import {SettingProjectionKeys} from "constants/settingProjections";
import {UserRoleId} from "constants/userRoles";
import {StaticContentTypeId, staticContentTypes} from "constants/staticContentTypes";
import Swal from "sweetalert2";
import ComponentPageSettingsStaticContentsTypeInput from "components/pages/settings/staticContents/typeInput";
import {IThemeFormSelectValue} from "components/elements/form/input/select";
import {cloneDeepWith} from "lodash";

type IPageState = {
    isSubmitting: boolean
    formData: ISettingUpdateStaticContentParamService,
    selectedData?: ISettingStaticContentModel
    types: IThemeFormSelectValue[]
};

type IPageProps = {} & IPagePropCommon;

class PageSettingsStaticContents extends Component<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
        this.state = {
            isSubmitting: false,
            types: [],
            formData: {
                staticContents: []
            }
        }
    }

    async componentDidMount() {
        if(PermissionUtil.checkAndRedirect(this.props, SettingsEndPointPermission.UPDATE_STATIC_CONTENT)){
            this.setPageTitle();
            await this.getSettings();
            this.getTypes();
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
        this.props.setBreadCrumb([this.props.t("settings"), this.props.t("staticContents")])
    }

    async getSettings() {
        let serviceResult = await SettingService.get({langId: this.props.getStateApp.appData.currentLangId, projection: SettingProjectionKeys.StaticContent})
        if (serviceResult.status && serviceResult.data) {
            let setting = serviceResult.data;
            this.setState((state: IPageState) => {
                state.formData = {
                    staticContents: setting.staticContents?.map(staticLanguage => ({
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

    getTypes() {
        this.setState((state: IPageState) => {
            state.types = staticContentTypes.map(type => ({
                label: this.props.t(type.langKey),
                value: type.id
            }))
            return state;
        })
    }

    onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.setState({
            isSubmitting: true
        }, async () => {
            let serviceResult = await SettingService.updateStaticContent({
                staticContents: this.state.formData.staticContents
            });
            if (serviceResult.status) {
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
            state.formData.staticContents = [{
                _id: String.createId(),
                label: "",
                rank: state.formData.staticContents.length + 1,
                typeId: StaticContentTypeId.Text,
                elementId: "",
                contents: {
                    langId: this.props.getStateApp.appData.currentLangId
                }
            }, ...state.formData.staticContents]
            return state;
        })
    }

    onAccept(index: number) {
        this.setState((state: IPageState) => {
            state.formData.staticContents[index] = state.selectedData!;
            state.selectedData = undefined;
            return state;
        })
    }

    async onDelete(index: number) {
        let result = await Swal.fire({
            title: this.props.t("deleteAction"),
            html: `<b>'${this.state.formData.staticContents[index].elementId}'</b> ${this.props.t("deleteItemQuestionWithItemName")}`,
            confirmButtonText: this.props.t("yes"),
            cancelButtonText: this.props.t("no"),
            icon: "question",
            showCancelButton: true
        });

        if (result.isConfirmed) {
            this.setState((state: IPageState) => {
                state.formData.staticContents.splice(index, 1);
                state.selectedData = undefined;
                return state;
            })
        }
    }

    onEdit(index: number) {
        this.setState((state: IPageState) => {
            state.selectedData = cloneDeepWith(this.state.formData.staticContents[index]);
            return state;
        })
    }

    onCancelEdit() {
        this.setState((state: IPageState) => {
            state.selectedData = undefined;
            return state;
        })
    }

    StaticContent = (props: ISettingStaticContentModel, index: number) => {
        return (
            <div className="col-md-12 mt-4">
                <ComponentFieldSet
                    legend={props.label}
                    legendElement={
                        PermissionUtil.checkPermissionRoleRank(this.props.getStateApp.sessionAuth!.user.roleId, UserRoleId.SuperAdmin)
                            ? (<span>
                                <i className="mdi mdi-pencil-box text-warning fs-1 cursor-pointer ms-2"
                                   onClick={() => this.onEdit(index)}></i>
                                <i className="mdi mdi-minus-box text-danger fs-1 cursor-pointer ms-2"
                                   onClick={() => this.onDelete(index)}></i>
                            </span>)
                            : undefined
                    }
                >
                    <div className="row mt-2">
                        <div className="col-md-12">
                            <ComponentPageSettingsStaticContentsTypeInput
                                {...this.props}
                                data={props}
                                onChange={(key, value) => this.onInputChange(props.contents, key, value)}
                            />
                        </div>
                    </div>
                </ComponentFieldSet>
            </div>
        )
    }

    EditStaticContent = (props: ISettingStaticContentModel, index: number) => {
        return (
            <div className="col-md-12 mt-3">
                <ComponentFieldSet legend={this.props.t("newStaticContent")}>
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <ComponentFormType
                                title={`${this.props.t("title")}*`}
                                placeholder={this.props.t("title")}
                                type="text"
                                value={props.label}
                                onChange={e => this.onInputChange(props, "label", e.target.value)}
                            />
                        </div>
                        <div className="col-md-12 mt-3">
                            <ComponentFormType
                                title={`${this.props.t("elementId")}*`}
                                type="text"
                                value={props.elementId}
                                onChange={e => this.onInputChange(props, "elementId", e.target.value)}
                            />
                        </div>
                        <div className="col-md-12 mt-3">
                            <ComponentFormSelect
                                title={this.props.t("typeId")}
                                placeholder={this.props.t("typeId")}
                                options={this.state.types}
                                value={this.state.types.filter(item => item.value == props.typeId)}
                                onChange={(item: any, e) => this.onInputChange(props, "typeId", item.value)}
                            />
                        </div>
                        <div className="col-md-12 mt-3">
                            <ComponentFormType
                                title={`${this.props.t("rank")}*`}
                                type="number"
                                required={true}
                                value={props.rank}
                                onChange={e => this.onInputChange(props, "rank", e.target.value)}
                            />
                        </div>
                        <div className="col-md-12 mt-3">
                            <div className="row">
                                <div className="col-md-6">
                                    <button type="button" className="btn btn-gradient-success btn-lg"
                                            onClick={() => this.onAccept(index)}>{this.props.t("okay")}</button>
                                </div>
                                <div className="col-md-6 text-end">
                                    <button type="button" className="btn btn-gradient-dark btn-lg"
                                            onClick={() => this.onCancelEdit()}>{this.props.t("cancel")}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </ComponentFieldSet>
            </div>
        )
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
                                        <div className="row">
                                            {
                                                PermissionUtil.checkPermissionRoleRank(this.props.getStateApp.sessionAuth!.user.roleId, UserRoleId.SuperAdmin)
                                                    ? <div className="col-md-7">
                                                        <button type={"button"} className="btn btn-gradient-success btn-lg"
                                                                onClick={() => this.onCreate()}>+ {this.props.t("newStaticContent")}
                                                        </button>
                                                    </div> : null
                                            }
                                            <div className="col-md-7 mt-2">
                                                <div className="row">
                                                    {
                                                        this.state.formData.staticContents?.orderBy("rank", "asc").map((item, index) =>
                                                            this.state.selectedData && this.state.selectedData._id == item._id
                                                                ? this.EditStaticContent(this.state.selectedData,  index)
                                                                : this.StaticContent(item, index)
                                                        )
                                                    }
                                                </div>
                                            </div>
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

export default PageSettingsStaticContents;
