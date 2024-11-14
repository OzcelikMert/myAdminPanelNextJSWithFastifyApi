import React, { Component } from 'react';
import ThemeInputType from '@components/elements/form/input/type';
import { IPagePropCommon } from 'types/pageProps';
import {
  ComponentForm,
  ComponentFormCheckBox,
} from '@components/elements/form';
import { HandleFormLibrary } from '@library/react/handles/form';
import { AuthService } from '@services/auth.service';
import { IUserGetResultService } from 'types/services/user.service';
import Image from 'next/image';
import { EndPoints } from '@constants/endPoints';
import { StatusId } from '@constants/status';
import { RouteUtil } from '@utils/route.util';
import { LocalStorageUtil } from '@utils/localStorage.util';

type IPageState = {
  isSubmitting: boolean;
  isWrong: boolean;
  user?: IUserGetResultService;
  formData: {
    email: string;
    password: string;
    keepMe: boolean;
  };
};

type IPageProps = {} & IPagePropCommon;

class PageLogin extends Component<IPageProps, IPageState> {
  abortController = new AbortController();

  constructor(prop: any) {
    super(prop);
    this.state = {
      isWrong: false,
      isSubmitting: false,
      formData: {
        email: LocalStorageUtil.getKeepMeEmail(),
        password: '',
        keepMe: LocalStorageUtil.getKeepMeEmail().length > 0,
      },
    };
  }

  componentDidMount() {
    this.setPageTitle();
    this.props.setStateApp({
      isPageLoading: false,
    });
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  setPageTitle() {
    this.props.setBreadCrumb([this.props.t('login')]);
  }

  onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.setState(
      {
        isWrong: false,
        isSubmitting: true,
      },
      async () => {
        const serviceResult = await AuthService.login(
          this.state.formData,
          this.abortController.signal
        );
        if (serviceResult.data) {
          if (serviceResult.status) {
            const resultSession = await AuthService.getSession(
              this.abortController.signal
            );
            if (resultSession.status && resultSession.data) {
              this.props.setStateApp(
                {
                  sessionAuth: resultSession.data,
                },
                () => {
                  if (this.state.formData.keepMe) {
                    LocalStorageUtil.setKeepMeEmail(this.state.formData.email);
                  } else if (LocalStorageUtil.getKeepMeEmail().length > 0) {
                    LocalStorageUtil.setKeepMeEmail('');
                  }
                  RouteUtil.change({
                    props: this.props,
                    path: EndPoints.DASHBOARD,
                  });
                }
              );
            }
          } else {
            if (serviceResult.data._id) {
              this.setState({
                user: serviceResult.data,
              });
            } else {
              this.setState({
                isWrong: true,
              });
            }
          }
        } else {
          this.setState({
            isWrong: true,
          });
        }
        this.setState({
          isSubmitting: false,
        });
      }
    );
  }

  LoginForm = () => {
    return (
      <ComponentForm
        isSubmitting={this.state.isSubmitting}
        formAttributes={{ onSubmit: (event) => this.onSubmit(event) }}
        enterToSubmit={true}
      >
        <div className="row">
          <div className="col-md-12 mb-3">
            <ThemeInputType
              title={this.props.t('email')}
              type="email"
              name="formData.email"
              required={true}
              value={this.state.formData.email}
              onChange={(e) => HandleFormLibrary.onChangeInput(e, this)}
            />
          </div>
          <div className="col-md-12 mb-3">
            <ThemeInputType
              title={this.props.t('password')}
              type="password"
              name="formData.password"
              required={true}
              value={this.state.formData.password}
              onChange={(e) => HandleFormLibrary.onChangeInput(e, this)}
            />
          </div>
          <div className="col-md-12 mb-3">
            <ComponentFormCheckBox
              name="formData.keepMe"
              title={this.props.t('keepMe')}
              checked={this.state.formData.keepMe}
              onChange={(e) => HandleFormLibrary.onChangeInput(e, this)}
            />
          </div>
          <div className="col-md-12">
            {this.state.isWrong ? (
              <p className="fw-bold text-danger">
                {this.props.t('wrongEmailOrPassword')}
              </p>
            ) : null}
            {this.state.user?.statusId == StatusId.Banned ? (
              <div>
                <p className="fw-bold text-danger">
                  {this.props.t('yourAccountIsBanned')}
                </p>
                <p className="fw-bold text-danger">
                  {this.props.t('banDateEnd')}:
                  <span className="text-muted ms-1">
                    {new Date(
                      this.state.user?.banDateEnd || ''
                    ).toLocaleDateString()}
                  </span>
                </p>
                <p className="fw-bold text-danger">
                  {this.props.t('banComment')}:
                  <span className="text-muted ms-1">
                    {this.state.user?.banComment}
                  </span>
                </p>
              </div>
            ) : null}
            {this.state.user?.statusId == StatusId.Pending ? (
              <div>
                <p className="fw-bold text-danger">
                  {this.props.t('yourAccountIsPending')}
                </p>
              </div>
            ) : null}
            {this.state.user?.statusId == StatusId.Disabled ? (
              <div>
                <p className="fw-bold text-danger">
                  {this.props.t('yourAccountIsDisabled')}
                </p>
              </div>
            ) : null}
          </div>
          <div className="col-md-12">
            <button
              type="submit"
              className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn w-100"
              disabled={this.state.isSubmitting}
            >
              {this.props.t('login')}
            </button>
          </div>
        </div>
      </ComponentForm>
    );
  };

  render() {
    return this.props.getStateApp.isPageLoading ? null : (
      <div className="page-login">
        <div className="d-flex align-items-stretch auth-img-bg h-100">
          <div className="row flex-grow">
            <div className="col-lg-6 d-flex align-items-center justify-content-center login-half-form">
              <div className="auth-form-transparent text-left p-3">
                <h4 className="text-center">{this.props.t('loginPanel')}</h4>
                <this.LoginForm />
              </div>
            </div>
            <div className="col-lg-6 login-half-bg d-flex flex-row">
              <div className="brand-logo">
                <Image
                  src="/images/ozcelikLogo.png"
                  alt="Özçelik Software"
                  width={150}
                  height={100}
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PageLogin;
