import React, { Component } from 'react';
import { IPagePropCommon } from 'types/pageProps';
import {
  ComponentFieldSet,
  ComponentForm,
  ComponentFormType,
} from '@components/elements/form';
import { SettingService } from '@services/setting.service';
import ComponentToast from '@components/elements/toast';
import { ISettingUpdateSocialMediaParamService } from 'types/services/setting.service';
import { ISettingSocialMediaModel } from 'types/models/setting.model';
import { PermissionUtil } from '@utils/permission.util';
import { SettingsEndPointPermission } from '@constants/endPointPermissions/settings.endPoint.permission';
import { SettingProjectionKeys } from '@constants/settingProjections';
import { UserRoleId } from '@constants/userRoles';
import { cloneDeepWith } from 'lodash';
import Swal from 'sweetalert2';

type IPageState = {
  isSubmitting: boolean;
  formData: ISettingUpdateSocialMediaParamService;
  selectedData?: ISettingSocialMediaModel;
  items?: ISettingSocialMediaModel[];
};

type IPageProps = {} & IPagePropCommon;

export default class PageSettingsSocialMedia extends Component<
  IPageProps,
  IPageState
> {
  abortController = new AbortController();

  constructor(props: IPageProps) {
    super(props);
    this.state = {
      isSubmitting: false,
      formData: {
        socialMedia: [],
      },
    };
  }

  async componentDidMount() {
    if (
      PermissionUtil.checkAndRedirect(
        this.props,
        SettingsEndPointPermission.UPDATE_SOCIAL_MEDIA
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
      this.props.t('socialMedia'),
    ]);
  }

  async getSettings() {
    const serviceResult = await SettingService.get(
      { projection: SettingProjectionKeys.SocialMedia },
      this.abortController.signal
    );
    if (serviceResult.status && serviceResult.data) {
      const setting = serviceResult.data;
      this.setState((state: IPageState) => {
        state.items = setting.socialMedia;
        state.formData = {
          socialMedia: setting.socialMedia || [],
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
        const serviceResult = await SettingService.updateSocialMedia(
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

        this.setState({
          isSubmitting: false,
        });
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
        state.formData.socialMedia = [
          ...state.formData.socialMedia,
          {
            _id: String.createId(),
            key: '',
            url: '',
            title: '',
          },
        ];
        return state;
      },
      () => this.onEdit(this.state.formData.socialMedia.length - 1)
    );
  }

  onAccept(index: number) {
    this.setState((state: IPageState) => {
      state.formData.socialMedia[index] = state.selectedData!;
      state.selectedData = undefined;
      return state;
    });
  }

  onEdit(index: number) {
    this.setState((state: IPageState) => {
      state.selectedData = cloneDeepWith(
        this.state.formData.socialMedia[index]
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
      html: `<b>'${this.state.formData.socialMedia[index].key}'</b> ${this.props.t('deleteItemQuestionWithItemName')}`,
      confirmButtonText: this.props.t('yes'),
      cancelButtonText: this.props.t('no'),
      icon: 'question',
      showCancelButton: true,
    });

    if (result.isConfirmed) {
      this.setState((state: IPageState) => {
        state.formData.socialMedia.splice(index, 1);
        return state;
      });
    }
  }

  SocialMedia = (props: ISettingSocialMediaModel, index: number) => {
    return (
      <div className={`col-md-12 ${index > 0 ? 'mt-5' : ''}`}>
        <ComponentFieldSet
          legend={`${props.title} ${PermissionUtil.checkPermissionRoleRank(this.props.getStateApp.sessionAuth!.user.roleId, UserRoleId.SuperAdmin) ? `(#${props.key})` : ''}`}
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
            <div className="col-md-12">
              <ComponentFormType
                type="text"
                title={this.props.t('url')}
                value={props.url}
                onChange={(e) =>
                  this.onInputChange(props, 'url', e.target.value)
                }
              />
            </div>
          </div>
        </ComponentFieldSet>
      </div>
    );
  };

  SocialMediaEdit = (props: ISettingSocialMediaModel, index: number) => {
    return (
      <div className={`col-md-12 ${index > 0 ? 'mt-5' : ''}`}>
        <ComponentFieldSet legend={this.props.t('newSocialMedia')}>
          <div className="row mt-3">
            <div className="col-md-12">
              <ComponentFormType
                type="text"
                title={this.props.t('key')}
                value={props.key}
                onChange={(e) =>
                  this.onInputChange(props, 'key', e.target.value)
                }
              />
            </div>
            <div className="col-md-12 mt-3">
              <ComponentFormType
                type="text"
                title={this.props.t('title')}
                value={props.title}
                onChange={(e) =>
                  this.onInputChange(props, 'title', e.target.value)
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

  SocialMediaPlatforms = () => {
    return (
      <div className="row">
        <div className="col-md-7 mt-2">
          <div className="row">
            {this.state.formData.socialMedia?.map((item, index) =>
              this.state.selectedData && this.state.selectedData._id == item._id
                ? this.SocialMediaEdit(this.state.selectedData, index)
                : this.SocialMedia(item, index)
            )}
          </div>
        </div>
        {PermissionUtil.checkPermissionRoleRank(
          this.props.getStateApp.sessionAuth!.user.roleId,
          UserRoleId.SuperAdmin
        ) ? (
          <div
            className={`col-md-7 text-start ${this.state.formData.socialMedia.length > 0 ? 'mt-4' : ''}`}
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
                    <this.SocialMediaPlatforms />
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
