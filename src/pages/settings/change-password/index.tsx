import React, {Component, FormEvent} from 'react'
import {PagePropCommonDocument} from "types/pageProps";
import {ThemeForm, ThemeFormType} from "components/theme/form";
import HandleForm from "library/react/handles/form";
import profileService from "services/profile.service";
import ThemeToast from "components/theme/toast";

type PageState = {
    isSubmitting: boolean
    formData: {
        password: string,
        newPassword: string,
        confirmPassword: string
    }
};

type PageProps = {} & PagePropCommonDocument;

export default class PageChangePassword extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            isSubmitting: false,
            formData: {
                password: "",
                confirmPassword: "",
                newPassword: ""
            }
        }
    }

    componentDidMount() {
        this.setPageTitle();
        this.props.setStateApp({
            isPageLoading: false
        })
    }

    setPageTitle() {
        this.props.setBreadCrumb([this.props.t("settings"), this.props.t("changePassword")])
    }

    onSubmit(event: FormEvent) {
        event.preventDefault();
        if (this.state.formData.newPassword !== this.state.formData.confirmPassword) {
            new ThemeToast({
                type: "error",
                title: this.props.t("error"),
                content: this.props.t("passwordsNotEqual")
            })
            return;
        }

        this.setState({
            isSubmitting: true
        }, async () => {
            let resData = await profileService.changePassword(this.state.formData);
            if (resData.status) {
                new ThemeToast({
                    type: "success",
                    title: this.props.t("successful"),
                    content: this.props.t("passwordUpdated")
                })
            } else {
                new ThemeToast({
                    type: "error",
                    title: this.props.t("error"),
                    content: this.props.t("wrongPassword")
                })
            }

            this.setState({
                isSubmitting: false
            })
        })
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
                                        <div className="row">
                                            <div className="col-md-7 mb-3">
                                                <ThemeFormType
                                                    title={`${this.props.t("password")}*`}
                                                    name="formData.password"
                                                    type="password"
                                                    autoComplete={"new-password"}
                                                    required={true}
                                                    value={this.state.formData.password}
                                                    onChange={e => HandleForm.onChangeInput(e, this)}
                                                />
                                            </div>
                                            <div className="col-md-7 mb-3">
                                                <ThemeFormType
                                                    title={`${this.props.t("newPassword")}*`}
                                                    name="formData.newPassword"
                                                    type="password"
                                                    autoComplete={"new-password"}
                                                    required={true}
                                                    value={this.state.formData.newPassword}
                                                    onChange={e => HandleForm.onChangeInput(e, this)}
                                                />
                                            </div>
                                            <div className="col-md-7 mb-3">
                                                <ThemeFormType
                                                    title={`${this.props.t("confirmPassword")}*`}
                                                    name="formData.confirmPassword"
                                                    type="password"
                                                    autoComplete={"new-password"}
                                                    required={true}
                                                    value={this.state.formData.confirmPassword}
                                                    onChange={e => HandleForm.onChangeInput(e, this)}
                                                />
                                            </div>
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
