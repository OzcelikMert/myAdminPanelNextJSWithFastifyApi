import React, { Component } from 'react';
import { IPagePropCommon } from 'types/pageProps';
import {
  ComponentFieldSet,
  ComponentForm,
  ComponentFormType,
} from '@components/elements/form';
import { SettingService } from '@services/setting.service';
import ComponentToast from '@components/elements/toast';
import { ISettingUpdateContactFormParamService } from 'types/services/setting.service';
import { ISettingContactFormModel } from 'types/models/setting.model';
import { SettingProjectionKeys } from '@constants/settingProjections';
import { UserRoleId } from '@constants/userRoles';
import { PermissionUtil } from '@utils/permission.util';
import { SettingsEndPointPermission } from '@constants/endPointPermissions/settings.endPoint.permission';
import { cloneDeepWith } from 'lodash';
import Swal from 'sweetalert2';

type IPageState = {
  isSubmitting: boolean;
  formData: ISettingUpdateContactFormParamService;
  items?: ISettingContactFormModel[];
  selectedData?: ISettingContactFormModel;
};

type IPageProps = {} & IPagePropCommon;

class PageSettingsContactForms extends Component<IPageProps, IPageState> {
  abortController = new AbortController();

  constructor(props: IPageProps) {
    super(props);
    this.state = {
      isSubmitting: false,
      formData: {
        contactForms: [],
      },
    };
  }

  async componentDidMount() {
    if (
      PermissionUtil.checkAndRedirect(
        this.props,
        SettingsEndPointPermission.UPDATE_CONTACT_FORM
      )
    ) {
      this.setPageTitle();
      await this.getSettings();
      this.props.setStateApp({
        isPageLoading: false,
      });
    }
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  setPageTitle() {
    this.props.setBreadCrumb([
      this.props.t('settings'),
      this.props.t('contactForms'),
    ]);
  }

  async getSettings() {
    const serviceResult = await SettingService.get(
      { projection: SettingProjectionKeys.ContactForm },
      this.abortController.signal
    );
    if (serviceResult.status && serviceResult.data) {
      const setting = serviceResult.data;
      this.setState((state: IPageState) => {
        state.items = setting.contactForms;
        state.formData = {
          contactForms: setting.contactForms ?? [],
        };
        return state;
      });
    }
  }

  onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.setState(
      {
        isSubmitting: true,
      },
      async () => {
        const serviceResult = await SettingService.updateContactForm(
          this.state.formData,
          this.abortController.signal
        );
        if (serviceResult.status) {
          new ComponentToast({
            type: 'success',
            title: this.props.t('successful'),
            content: this.props.t('settingsUpdated'),
          });
        }

        this.setState({ isSubmitting: false });
      }
    );
  }

  onInputChange(data: any, key: string, value: any) {
    this.setState((state: IPageState) => {
      data[key] = value;
      return state;
    });
  }

  onCreate() {
    this.setState(
      (state: IPageState) => {
        state.formData.contactForms = [
          ...state.formData.contactForms,
          {
            _id: String.createId(),
            title: '',
            key: '',
            port: 465,
            host: '',
            targetEmail: '',
            name: '',
            password: '',
            email: '',
            hasSSL: true,
          },
        ];
        return state;
      },
      () => this.onEdit(this.state.formData.contactForms.length - 1)
    );
  }

  onAccept(index: number) {
    this.setState((state: IPageState) => {
      state.formData.contactForms[index] = state.selectedData!;
      state.selectedData = undefined;
      return state;
    });
  }

  onEdit(index: number) {
    this.setState((state: IPageState) => {
      state.selectedData = cloneDeepWith(
        this.state.formData.contactForms[index]
      );
      return state;
    });
  }

  onCancelEdit() {
    this.setState((state: IPageState) => {
      state.selectedData = undefined;
      return state;
    });
  }

  async onDelete(index: number) {
    const result = await Swal.fire({
      title: this.props.t('deleteAction'),
      html: `<b>'${this.state.formData.contactForms[index].key}'</b> ${this.props.t('deleteItemQuestionWithItemName')}`,
      confirmButtonText: this.props.t('yes'),
      cancelButtonText: this.props.t('no'),
      icon: 'question',
      showCancelButton: true,
    });

    if (result.isConfirmed) {
      this.setState((state: IPageState) => {
        state.formData.contactForms.splice(index, 1);
        return state;
      });
    }
  }

  ContactForm = (props: ISettingContactFormModel, index: number) => {
    return (
      <div className={`col-md-12 ${index > 0 ? 'mt-5' : ''}`}>
        <ComponentFieldSet
          legend={`${props.title} (#${props.key})`}
          legendElement={
            PermissionUtil.checkPermissionRoleRank(
              this.props.getStateApp.sessionAuth!.user.roleId,
              UserRoleId.SuperAdmin
            ) ? (
              <span>
                <i
                  className="mdi mdi-pencil-box text-warning fs-1 cursor-pointer ms-2"
                  onClick={() => this.onEdit(index)}
                ></i>
                <i
                  className="mdi mdi-minus-box text-danger fs-1 cursor-pointer ms-2"
                  onClick={() => this.onDelete(index)}
                ></i>
              </span>
            ) : undefined
          }
        >
          <div className="row">
            <div className="col-md-12 mt-4">
              <ComponentFormType
                type="text"
                title={this.props.t('name')}
                value={props.name}
                onChange={(e) =>
                  this.onInputChange(props, 'name', e.target.value)
                }
              />
            </div>
            <div className="col-md-12 mt-4">
              <ComponentFormType
                type="email"
                title={this.props.t('targetEmail')}
                value={props.targetEmail}
                onChange={(e) =>
                  this.onInputChange(props, 'targetEmail', e.target.value)
                }
              />
            </div>
            <div className="col-md-12 mt-4">
              <ComponentFormType
                type="email"
                title={this.props.t('email')}
                value={props.email}
                onChange={(e) =>
                  this.onInputChange(props, 'email', e.target.value)
                }
              />
            </div>
            <div className="col-md-12 mt-4">
              <ComponentFormType
                type="password"
                title={this.props.t('password')}
                value={props.password}
                onChange={(e) =>
                  this.onInputChange(props, 'password', e.target.value)
                }
              />
            </div>
            <div className="col-md-12 mt-4">
              <ComponentFormType
                type="text"
                title={this.props.t('host')}
                value={props.host}
                onChange={(e) =>
                  this.onInputChange(props, 'host', e.target.value)
                }
              />
            </div>
            <div className="col-md-12 mt-4">
              <ComponentFormType
                type="number"
                title={this.props.t('port')}
                value={props.port}
                onChange={(e) =>
                  this.onInputChange(props, 'port', Number(e.target.value))
                }
              />
            </div>
            <div className="col-md-7 mt-4">
              <div className="form-switch">
                <input
                  checked={props.hasSSL}
                  className="form-check-input"
                  type="checkbox"
                  id="hasSSL"
                  onChange={(e) =>
                    this.onInputChange(
                      props,
                      'hasSSL',
                      Boolean(e.target.checked)
                    )
                  }
                />
                <label className="form-check-label ms-2" htmlFor="hasSSL">
                  {this.props.t('hasSSL')}
                </label>
              </div>
            </div>
          </div>
        </ComponentFieldSet>
      </div>
    );
  };

  ContactFormEdit = (props: ISettingContactFormModel, index: number) => {
    return (
      <div className={`col-md-12 ${index > 0 ? 'mt-5' : ''}`}>
        <ComponentFieldSet legend={this.props.t('newContactForm')}>
          <div className="row mt-3">
            <div className="col-md-12">
              <ComponentFormType
                title={`${this.props.t('title')}*`}
                type="text"
                required={true}
                value={props.title}
                onChange={(e) =>
                  this.onInputChange(props, 'title', e.target.value)
                }
              />
            </div>
            <div className="col-md-12 mt-4">
              <ComponentFormType
                title={`${this.props.t('key')}*`}
                type="text"
                required={true}
                value={props.key}
                onChange={(e) =>
                  this.onInputChange(props, 'key', e.target.value)
                }
              />
            </div>
            <div className="col-md-12 mt-3">
              <div className="row">
                <div className="col-md-6">
                  <button
                    type="button"
                    className="btn btn-gradient-success btn-lg"
                    onClick={() => this.onAccept(index)}
                  >
                    {this.props.t('okay')}
                  </button>
                </div>
                <div className="col-md-6 text-end">
                  <button
                    type="button"
                    className="btn btn-gradient-dark btn-lg"
                    onClick={() => this.onCancelEdit()}
                  >
                    {this.props.t('cancel')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ComponentFieldSet>
      </div>
    );
  };

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
                      <div className="col-md-7 mt-2">
                        <div className="row">
                          {this.state.formData.contactForms?.map(
                            (item, index) =>
                              this.state.selectedData &&
                              this.state.selectedData._id == item._id
                                ? this.ContactFormEdit(
                                    this.state.selectedData,
                                    index
                                  )
                                : this.ContactForm(item, index)
                          )}
                        </div>
                      </div>
                      {PermissionUtil.checkPermissionRoleRank(
                        this.props.getStateApp.sessionAuth!.user.roleId,
                        UserRoleId.SuperAdmin
                      ) ? (
                        <div
                          className={`col-md-7 text-start ${this.state.formData.contactForms.length > 0 ? 'mt-4' : ''}`}
                        >
                          <button
                            type={'button'}
                            className="btn btn-gradient-success btn-lg"
                            onClick={() => this.onCreate()}
                          >
                            + {this.props.t('addNew')}
                          </button>
                        </div>
                      ) : null}
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

export default PageSettingsContactForms;
