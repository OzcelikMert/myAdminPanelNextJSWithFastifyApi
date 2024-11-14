import React, { Component } from 'react';
import { IPagePropCommon } from 'types/pageProps';
import {
  ComponentFieldSet,
  ComponentForm,
  ComponentFormType,
} from '@components/elements/form';
import { SettingService } from '@services/setting.service';
import ComponentToast from '@components/elements/toast';
import { ISettingUpdatePathParamService } from 'types/services/setting.service';
import { ISettingPathModel } from 'types/models/setting.model';
import { PermissionUtil } from '@utils/permission.util';
import { SettingsEndPointPermission } from '@constants/endPointPermissions/settings.endPoint.permission';
import { SettingProjectionKeys } from '@constants/settingProjections';
import { cloneDeepWith } from 'lodash';
import Swal from 'sweetalert2';

type IPageState = {
  isSubmitting: boolean;
  formData: ISettingUpdatePathParamService;
  selectedData?: ISettingPathModel;
  items?: ISettingPathModel[];
};

type IPageProps = {} & IPagePropCommon;

export default class PageSettingsPaths extends Component<
  IPageProps,
  IPageState
> {
  abortController = new AbortController();

  constructor(props: IPageProps) {
    super(props);
    this.state = {
      isSubmitting: false,
      formData: {
        paths: [],
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
      await this.getSettings();
      this.setPageTitle();
      this.props.setStateApp({
        isPageLoading: false,
      });
    }
  }

  async componentDidUpdate(prevProps: Readonly<IPageProps>) {
    if (
      prevProps.getStateApp.appData.currentLangId !=
      this.props.getStateApp.appData.currentLangId
    ) {
      this.props.setStateApp(
        {
          isPageLoading: true,
        },
        async () => {
          await this.getSettings();
          this.props.setStateApp({
            isPageLoading: false,
          });
        }
      );
    }
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  setPageTitle() {
    this.props.setBreadCrumb([this.props.t('settings'), this.props.t('paths')]);
  }

  async getSettings() {
    const serviceResult = await SettingService.get(
      {
        langId: this.props.getStateApp.appData.currentLangId,
        projection: SettingProjectionKeys.Path,
      },
      this.abortController.signal
    );
    if (serviceResult.status && serviceResult.data) {
      const setting = serviceResult.data;
      this.setState((state: IPageState) => {
        state.items = setting.paths;
        state.formData = {
          paths:
            setting.paths?.map((path) => ({
              ...path,
              contents: {
                ...path.contents,
                langId: this.props.getStateApp.appData.currentLangId,
              },
            })) || [],
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
        const serviceResult = await SettingService.updatePath(
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
        state.formData.paths = [
          ...state.formData.paths,
          {
            _id: String.createId(),
            title: '',
            key: '',
            path: '',
            contents: {
              langId: this.props.getStateApp.appData.currentLangId,
              asPath: '',
            },
          },
        ];
        return state;
      },
      () => this.onEdit(this.state.formData.paths.length - 1)
    );
  }

  onAccept(index: number) {
    this.setState((state: IPageState) => {
      state.formData.paths[index] = state.selectedData!;
      state.selectedData = undefined;
      return state;
    });
  }

  onEdit(index: number) {
    this.setState((state: IPageState) => {
      state.selectedData = cloneDeepWith(this.state.formData.paths[index]);
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
      html: `<b>'${this.state.formData.paths[index].key}'</b> ${this.props.t('deleteItemQuestionWithItemName')}`,
      confirmButtonText: this.props.t('yes'),
      cancelButtonText: this.props.t('no'),
      icon: 'question',
      showCancelButton: true,
    });

    if (result.isConfirmed) {
      this.setState((state: IPageState) => {
        state.formData.paths.splice(index, 1);
        return state;
      });
    }
  }

  Path = (props: ISettingPathModel, index: number) => {
    return (
      <div className={`col-md-12 ${index > 0 ? 'mt-5' : ''}`}>
        <ComponentFieldSet
          legend={`${props.title} (#${props.key})`}
          legendElement={
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
          }
        >
          <div className="row">
            <div className="col-md-12">
              <ComponentFormType
                type="text"
                title={this.props.t('pathMask')}
                value={props.contents.asPath}
                onChange={(e) =>
                  this.onInputChange(props.contents, 'asPath', e.target.value)
                }
              />
            </div>
          </div>
        </ComponentFieldSet>
      </div>
    );
  };

  PathEdit = (props: ISettingPathModel, index: number) => {
    return (
      <div className={`col-md-12 ${index > 0 ? 'mt-5' : ''}`}>
        <ComponentFieldSet legend={this.props.t('newPath')}>
          <div className="row mt-3">
            <div className="col-md-12">
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
                title={this.props.t('path')}
                value={props.path}
                onChange={(e) =>
                  this.onInputChange(props, 'path', e.target.value)
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

  Paths = () => {
    return (
      <div className="row">
        <div className="col-md-7 mt-2">
          <div className="row">
            {this.state.formData.paths?.map((item, index) =>
              this.state.selectedData && this.state.selectedData._id == item._id
                ? this.PathEdit(this.state.selectedData, index)
                : this.Path(item, index)
            )}
          </div>
        </div>
        <div
          className={`col-md-7 text-start ${this.state.formData.paths.length > 0 ? 'mt-4' : ''}`}
        >
          <button
            type={'button'}
            className="btn btn-gradient-success btn-lg"
            onClick={() => this.onCreate()}
          >
            + {this.props.t('addNew')}
          </button>
        </div>
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
                    <this.Paths />
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
