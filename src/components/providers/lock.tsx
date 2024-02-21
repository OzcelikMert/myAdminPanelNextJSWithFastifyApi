import React, {Component} from 'react'
import ThemeInputType from "components/elements/form/input/type";
import {IPagePropCommon} from "types/pageProps";
import {ComponentForm} from "components/elements/form";
import ReactHandleFormLibrary from "library/react/handles/form";
import V from "library/variable";
import {AuthService} from "services/auth.service";
import Image from "next/image"
import {EndPoints} from "constants/endPoints";
import {ImageSourceUtil} from "utils/imageSource.util";

type IPageState = {
    isSubmitting: boolean
    isWrong: boolean
    formData: {
        password: string
    }
};

type IPageProps = {
    children?: JSX.Element
} & IPagePropCommon;

export default class ComponentProviderLock extends Component<IPageProps, IPageState> {
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

    onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.setState({
            isSubmitting: true
        }, async () => {
            let resData = await AuthService.login({
                password: this.state.formData.password,
                email: this.props.getStateApp.sessionAuth?.user.email ?? ""
            });
            if (resData.status && resData.data) {
                let resultSession = await AuthService.getSession();
                if(resultSession.status && resultSession.data){
                    this.setState({
                        isSubmitting: false,
                        formData: {
                            password: ""
                        }
                    }, () => {
                        this.props.setStateApp({
                            sessionAuth: resultSession.data,
                            isLock: false,
                            isPageLoading: true
                        });
                    })
                    return;
                }
            }

            this.setState({
                isSubmitting: false,
                isWrong: true
            });
        })
    }

    render() {
        if (
            ![EndPoints.LOGIN].includes(this.props.router.pathname) &&
            this.props.getStateApp.isLock
        ) {
            return (
                <div className="component-provider-lock">
                    <div className="content-wrapper d-flex align-items-center lock-full-bg h-100">
                        <div className="row w-100 align-items-center">
                            <div className="col-lg-4 mx-auto">
                                <div className="auth-form text-left p-5 text-center">
                                    <Image
                                        className="lock-profile-img img-fluid"
                                        src={ImageSourceUtil.getUploadedImageSrc(this.props.getStateApp.sessionAuth?.user.image)}
                                        alt={this.props.getStateApp.sessionAuth?.user.name ?? ""}
                                        width={75}
                                        height={75}
                                    />
                                    <h4 className="text-center text-light mb-3 mt-3">{this.props.getStateApp.sessionAuth?.user.name}</h4>
                                    <ComponentForm
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
                                                    onChange={e => ReactHandleFormLibrary.onChangeInput(e, this)}
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
                                    </ComponentForm>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}