import React, {Component} from 'react'
import {IPagePropCommon} from "types/pageProps";
import {ComponentFieldSet, ComponentForm, ComponentFormType} from "components/elements/form";
import {SettingService} from "services/setting.service";
import ComponentToast from "components/elements/toast";
import {ISettingUpdateContactFormParamService} from "types/services/setting.service";
import {ISettingContactFormModel} from 'types/models/setting.model';
import {SettingProjectionKeys} from "constants/settingProjections";
import {UserRoleId} from "constants/userRoles";
import {PermissionUtil} from "utils/permission.util";
import {SettingsEndPointPermission} from "constants/endPointPermissions/settings.endPoint.permission";

type IPageState = {
    isSubmitting: boolean
    formData: ISettingUpdateContactFormParamService
};

type IPageProps = {} & IPagePropCommon;

class PageSettingsContactForms extends Component<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
        this.state = {
            isSubmitting: false,
            formData: {
                contactForms: []
            }
        }
    }

    async componentDidMount() {
        if(PermissionUtil.checkAndRedirect(this.props, SettingsEndPointPermission.UPDATE_CONTACT_FORM)){
            this.setPageTitle();
            await this.getSettings();
            this.props.setStateApp({
                isPageLoading: false
            })
        }
    }

    setPageTitle() {
        this.props.setBreadCrumb([this.props.t("settings"), this.props.t("contactForms")])
    }

    async getSettings() {
        let serviceResult = await SettingService.get({projection: SettingProjectionKeys.ContactForm})
        if (serviceResult.status && serviceResult.data) {
            let setting = serviceResult.data;
            this.setState((state: IPageState) => {
                state.formData = {
                    contactForms: setting.contactForms ?? []
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
            let serviceResult = await SettingService.updateContactForm(this.state.formData);
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
            state.formData.contactForms = [{
                _id: String.createId(),
                key: "",
                port: 465,
                outGoingServer: "",
                inComingServer: "",
                outGoingEmail: "",
                name: "",
                password: "",
                email: ""
            }, ...state.formData.contactForms];
            return state;
        })
    }

    onAccept(data: ISettingContactFormModel) {
        this.setState((state: IPageState) => {
            data.isEditing = false;
            return state;
        })
    }

    onDelete(data: ISettingContactFormModel[], index: number) {
        this.setState((state: IPageState) => {
            data.splice(index, 1);
            return state;
        })
    }

    onEdit(data: ISettingContactFormModel) {
        this.setState((state: IPageState) => {
            data.isEditing = true;
            return state;
        })
    }

    ContactForms = () => {
        const ContactForm = (contactFormProps: ISettingContactFormModel, contactFormIndex: number) => {
            return (
                <div className="col-md-12 mt-4">
                    <ComponentFieldSet
                        legend={`${this.props.t("contactForm")} (#${contactFormProps.key})`}
                        legendElement={
                            this.props.getStateApp.sessionAuth?.user.roleId == UserRoleId.SuperAdmin
                                ? <i className="mdi mdi-pencil-box text-warning fs-3 cursor-pointer"
                                     onClick={() => this.onEdit(contactFormProps)}></i>
                                : undefined
                        }
                    >
                        <div className="row">
                            <div className="col-md-12 mt-4">
                                <ComponentFormType
                                    type="text"
                                    title={this.props.t("name")}
                                    value={contactFormProps.name}
                                    onChange={e => this.onInputChange(contactFormProps, "name", e.target.value)}
                                />
                            </div>
                            <div className="col-md-12 mt-4">
                                <ComponentFormType
                                    type="text"
                                    title={this.props.t("outGoingEmail")}
                                    value={contactFormProps.outGoingEmail}
                                    onChange={e => this.onInputChange(contactFormProps, "outGoingEmail", e.target.value)}
                                />
                            </div>
                            <div className="col-md-12 mt-4">
                                <ComponentFormType
                                    type="text"
                                    title={this.props.t("email")}
                                    value={contactFormProps.email}
                                    onChange={e => this.onInputChange(contactFormProps, "email", e.target.value)}
                                />
                            </div>
                            <div className="col-md-12 mt-4">
                                <ComponentFormType
                                    type="password"
                                    title={this.props.t("password")}
                                    value={contactFormProps.password}
                                    onChange={e => this.onInputChange(contactFormProps, "password", e.target.value)}
                                />
                            </div>
                            <div className="col-md-12 mt-4">
                                <ComponentFormType
                                    type="text"
                                    title={this.props.t("outGoingServer")}
                                    value={contactFormProps.outGoingServer}
                                    onChange={e => this.onInputChange(contactFormProps, "outGoingServer", e.target.value)}
                                />
                            </div>
                            <div className="col-md-12 mt-4">
                                <ComponentFormType
                                    type="text"
                                    title={this.props.t("inComingServer")}
                                    value={contactFormProps.inComingServer}
                                    onChange={e => this.onInputChange(contactFormProps, "inComingServer", e.target.value)}
                                />
                            </div>
                            <div className="col-md-12 mt-4">
                                <ComponentFormType
                                    type="text"
                                    title={this.props.t("port")}
                                    value={contactFormProps.port}
                                    onChange={e => this.onInputChange(contactFormProps, "port", e.target.value)}
                                />
                            </div>
                        </div>
                    </ComponentFieldSet>
                </div>
            )
        }

        const EditContactForm = (contactFormProps: ISettingContactFormModel, contactFormIndex: number) => {
            return (
                <div className="col-md-12 mt-3">
                    <ComponentFieldSet legend={this.props.t("newContactForm")}>
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <ComponentFormType
                                    title={`${this.props.t("key")}*`}
                                    type="text"
                                    required={true}
                                    value={contactFormProps.key}
                                    onChange={e => this.onInputChange(contactFormProps, "key", e.target.value)}
                                />
                            </div>
                            <div className="col-md-12 mt-3">
                                <button type={"button"} className="btn btn-gradient-success btn-lg"
                                        onClick={() => this.onAccept(contactFormProps)}>{this.props.t("okay")}</button>
                                <button type={"button"} className="btn btn-gradient-danger btn-lg"
                                        onClick={() => this.onDelete(this.state.formData.contactForms, contactFormIndex)}>{this.props.t("delete")}</button>
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
                                    onClick={() => this.onCreate()}>+ {this.props.t("newContactForm")}
                            </button>
                        </div> : null
                }
                <div className="col-md-7 mt-2">
                    <div className="row">
                        {
                            this.state.formData.contactForms?.map((item, index) =>
                                item.isEditing
                                    ? EditContactForm(item, index)
                                    : ContactForm(item, index))
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
                                        <this.ContactForms/>
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

export default PageSettingsContactForms;
