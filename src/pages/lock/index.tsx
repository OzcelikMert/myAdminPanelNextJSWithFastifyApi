import React, {Component} from 'react'
import ThemeInputType from "components/theme/form/input/type";
import {IPagePropCommon} from "types/pageProps";
import {ThemeForm} from "components/theme/form";
import HandleForm from "library/react/handles/form";
import V from "library/variable";
import authService from "services/auth.service";
import imageSourceLib from "lib/imageSource.lib";
import PagePaths from "constants/pagePaths";
import Image from "next/image"

type PageState = {
    isSubmitting: boolean
    isWrong: boolean
    formData: {
        password: string
    }
};

type PageProps = {} & IPagePropCommon;

class PageLock extends Component<PageProps, PageState> {
    constructor(prop: any) {
        super(prop);
        this.state = {
            isSubmitting: false,
            isWrong: false,
            formData: {
                password: ""
            }
        }
    }

    componentDidMount() {
        this.setPageTitle();
        if (V.isEmpty(this.props.getStateApp.sessionData.email)) {
            return this.props.router.push(PagePaths.login());
        }
        this.props.setStateApp({
            isPageLoading: false
        })
    }

    setPageTitle() {
        this.props.setBreadCrumb([
            this.props.t("lock")
        ])
    }

    onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.setState({
            isSubmitting: true
        }, async () => {
            let resData = await authService.login({
                password: this.state.formData.password,
                email: this.props.getStateApp.sessionData.email
            });
            if (resData.status && resData.data) {
                let user = resData.data;
                this.props.setStateApp({
                    sessionData: {id: user._id}
                }, () => {
                    this.props.router.push(PagePaths.dashboard());
                });
            } else {
                this.setState({
                    isSubmitting: false,
                    isWrong: true
                })
            }
        })
    }

    render() {
        return this.props.getStateApp.isPageLoading ? null : (
            <div className="page-lock">
                <div className="content-wrapper d-flex align-items-center auth lock-full-bg h-100">
                    <div className="row w-100 align-items-center">
                        <div className="col-lg-4 mx-auto">
                            <div className="auth-form-transparent text-left p-5 text-center">
                                <Image
                                    className="lock-profile-img img-fluid"
                                    src={imageSourceLib.getUploadedImageSrc(this.props.getStateApp.sessionData.image)}
                                    alt={this.props.getStateApp.sessionData.name}
                                    width={75}
                                    height={75}
                                />
                                <h4 className="text-center text-light mb-3 mt-3">{this.props.getStateApp.sessionData.name}</h4>
                                <ThemeForm
                                    isSubmitting={this.state.isSubmitting}
                                    formAttributes={{onSubmit: (event) => this.onSubmit(event)}}
                                >
                                    <div className="row">
                                        <div className="col-md-12 mb-3">
                                            <ThemeInputType
                                                title={this.props.t("password")}
                                                type="password"
                                                name="formData.password"
                                                required={true}
                                                value={this.state.formData.password}
                                                onChange={e => HandleForm.onChangeInput(e, this)}
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            {
                                                this.state.isSubmitting
                                                    ? <button
                                                        className="btn btn-outline-light btn-lg font-weight-medium auth-form-btn w-100"
                                                        disabled={true} type={"button"}>
                                                        <i className="fa fa-spinner fa-spin me-1"></i>
                                                        {this.props.t("loading") + "..."}
                                                    </button>
                                                    : <button
                                                        type="submit"
                                                        className={`btn btn-outline-${this.state.isWrong ? "danger" : "info"} btn-lg font-weight-medium auth-form-btn w-100`}
                                                    >
                                                        {this.props.t("login")}
                                                    </button>
                                            }
                                        </div>
                                    </div>
                                </ThemeForm>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PageLock;
