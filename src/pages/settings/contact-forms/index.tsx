import React, {Component} from 'react'
import {PagePropCommonDocument} from "types/pageProps";
import {ThemeFieldSet, ThemeForm, ThemeFormType} from "components/theme/form";
import {UserRoleId} from "constants/index";
import settingService from "services/setting.service";
import ThemeToast from "components/theme/toast";
import {SettingUpdateContactFormParamDocument} from "types/services/setting.service";
import {SettingContactFormDocument} from 'types/models/setting.model';

type PageState = {
    isSubmitting: boolean
    formData: SettingUpdateContactFormParamDocument
};

type PageProps = {} & PagePropCommonDocument;

class PageSettingsContactForms extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            isSubmitting: false,
            formData: {
                contactForms: []
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
        this.props.setBreadCrumb([this.props.t("settings"), this.props.t("contactForms")])
    }

    async getSettings() {
        let resData = await settingService.get({projection: "contactForm"})
        if (resData.status && resData.data) {
            let setting = resData.data;
            this.setState((state: PageState) => {
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
            let resData = await settingService.updateContactForm(this.state.formData);
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

    onAccept(data: SettingContactFormDocument) {
        this.setState((state: PageState) => {
            data.isEditing = false;
            return state;
        })
    }

    onDelete(data: SettingContactFormDocument[], index: number) {
        this.setState((state: PageState) => {
            data.splice(index, 1);
            return state;
        })
    }

    onEdit(data: SettingContactFormDocument) {
        this.setState((state: PageState) => {
            data.isEditing = true;
            return state;
        })
    }

    ContactForms = () => {
        const ContactForm = (contactFormProps: SettingContactFormDocument, contactFormIndex: number) => {
            return (
                <div className="col-md-12 mt-4">
                    <ThemeFieldSet
                        legend={`${this.props.t("contactForm")} (#${contactFormProps.key})`}
                        legendElement={
                            this.props.getStateApp.sessionData.roleId == UserRoleId.SuperAdmin
                                ? <i className="mdi mdi-pencil-box text-warning fs-3 cursor-pointer"
                                     onClick={() => this.onEdit(contactFormProps)}></i>
                                : undefined
                        }
                    >
                        <div className="row">
                            <div className="col-md-12 mt-4">
                                <ThemeFormType
                                    type="text"
                                    title={this.props.t("name")}
                                    value={contactFormProps.name}
                                    onChange={e => this.onInputChange(contactFormProps, "name", e.target.value)}
                                />
                            </div>
                            <div className="col-md-12 mt-4">
                                <ThemeFormType
                                    type="text"
                                    title={this.props.t("outGoingEmail")}
                                    value={contactFormProps.outGoingEmail}
                                    onChange={e => this.onInputChange(contactFormProps, "outGoingEmail", e.target.value)}
                                />
                            </div>
                            <div className="col-md-12 mt-4">
                                <ThemeFormType
                                    type="text"
                                    title={this.props.t("email")}
                                    value={contactFormProps.email}
                                    onChange={e => this.onInputChange(contactFormProps, "email", e.target.value)}
                                />
                            </div>
                            <div className="col-md-12 mt-4">
                                <ThemeFormType
                                    type="password"
                                    title={this.props.t("password")}
                                    value={contactFormProps.password}
                                    onChange={e => this.onInputChange(contactFormProps, "password", e.target.value)}
                                />
                            </div>
                            <div className="col-md-12 mt-4">
                                <ThemeFormType
                                    type="text"
                                    title={this.props.t("outGoingServer")}
                                    value={contactFormProps.outGoingServer}
                                    onChange={e => this.onInputChange(contactFormProps, "outGoingServer", e.target.value)}
                                />
                            </div>
                            <div className="col-md-12 mt-4">
                                <ThemeFormType
                                    type="text"
                                    title={this.props.t("inComingServer")}
                                    value={contactFormProps.inComingServer}
                                    onChange={e => this.onInputChange(contactFormProps, "inComingServer", e.target.value)}
                                />
                            </div>
                            <div className="col-md-12 mt-4">
                                <ThemeFormType
                                    type="text"
                                    title={this.props.t("port")}
                                    value={contactFormProps.port}
                                    onChange={e => this.onInputChange(contactFormProps, "port", e.target.value)}
                                />
                            </div>
                        </div>
                    </ThemeFieldSet>
                </div>
            )
        }

        const EditContactForm = (contactFormProps: SettingContactFormDocument, contactFormIndex: number) => {
            return (
                <div className="col-md-12 mt-3">
                    <ThemeFieldSet legend={this.props.t("newContactForm")}>
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <ThemeFormType
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
                                        <this.ContactForms/>
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

export default PageSettingsContactForms;
