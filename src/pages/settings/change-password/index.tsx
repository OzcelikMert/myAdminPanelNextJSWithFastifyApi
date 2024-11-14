import React, { Component, FormEvent } from 'react';
import { IPagePropCommon } from 'types/pageProps';
import { ComponentForm, ComponentFormType } from '@components/elements/form';
import { HandleFormLibrary } from '@library/react/handles/form';
import ComponentToast from '@components/elements/toast';
import { UserService } from '@services/user.service';

type IPageState = {
  isSubmitting: boolean;
  formData: {
    password: string;
    newPassword: string;
    confirmPassword: string;
  };
};

type IPageProps = {} & IPagePropCommon;

export default class PageChangePassword extends Component<
  IPageProps,
  IPageState
> {
  abortController = new AbortController();

  constructor(props: IPageProps) {
    super(props);
    this.state = {
      isSubmitting: false,
      formData: {
        password: '',
        confirmPassword: '',
        newPassword: '',
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
    this.props.setBreadCrumb([
      this.props.t('settings'),
      this.props.t('changePassword'),
    ]);
  }

  onSubmit(event: FormEvent) {
    event.preventDefault();
    if (
      this.state.formData.newPassword !== this.state.formData.confirmPassword
    ) {
      new ComponentToast({
        type: 'error',
        title: this.props.t('error'),
        content: this.props.t('passwordsNotEqual'),
      });
      return;
    }

    this.setState(
      {
        isSubmitting: true,
      },
      async () => {
        const serviceResult = await UserService.updatePassword(
          this.state.formData,
          this.abortController.signal
        );
        if (serviceResult.status) {
          new ComponentToast({
            type: 'success',
            title: this.props.t('successful'),
            content: this.props.t('passwordUpdated'),
          });
        } else {
          new ComponentToast({
            type: 'error',
            title: this.props.t('error'),
            content: this.props.t('wrongPassword'),
          });
        }

        this.setState({
          isSubmitting: false,
        });
      }
    );
  }

  render() {
    return this.props.getStateApp.isPageLoading ? null : (
      <div className="page-settings">
        <div className="row">
          <div className="col-md-12">
            <ComponentForm
              isActiveSaveButton={true}
              saveButtonText={this.props.t('save')}
              saveButtonLoadingText={this.props.t('loading')}
              isSubmitting={this.state.isSubmitting}
              formAttributes={{ onSubmit: (event) => this.onSubmit(event) }}
            >
              <div className="grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-7 mb-3">
                        <ComponentFormType
                          title={`${this.props.t('password')}*`}
                          name="formData.password"
                          type="password"
                          autoComplete={'new-password'}
                          required={true}
                          value={this.state.formData.password}
                          onChange={(e) =>
                            HandleFormLibrary.onChangeInput(e, this)
                          }
                        />
                      </div>
                      <div className="col-md-7 mb-3">
                        <ComponentFormType
                          title={`${this.props.t('newPassword')}*`}
                          name="formData.newPassword"
                          type="password"
                          autoComplete={'new-password'}
                          required={true}
                          value={this.state.formData.newPassword}
                          onChange={(e) =>
                            HandleFormLibrary.onChangeInput(e, this)
                          }
                        />
                      </div>
                      <div className="col-md-7 mb-3">
                        <ComponentFormType
                          title={`${this.props.t('confirmPassword')}*`}
                          name="formData.confirmPassword"
                          type="password"
                          autoComplete={'new-password'}
                          required={true}
                          value={this.state.formData.confirmPassword}
                          onChange={(e) =>
                            HandleFormLibrary.onChangeInput(e, this)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ComponentForm>
          </div>
        </div>
      </div>
    );
  }
}
