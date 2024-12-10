import React, { Component, FormEvent } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import {
  ComponentForm,
  ComponentFormCheckBox,
  ComponentFormSelect,
  ComponentFormType,
} from '@components/elements/form';
import { IPagePropCommon } from 'types/pageProps';
import { HandleFormLibrary } from '@library/react/handles/form';
import {
  ILanguageGetResultService,
  ILanguageUpdateWithIdParamService,
} from 'types/services/language.service';
import { LanguageService } from '@services/language.service';
import Image from 'next/image';
import { IThemeFormSelectValue } from '@components/elements/form/input/select';
import { PermissionUtil } from '@utils/permission.util';
import { LanguageEndPointPermission } from '@constants/endPointPermissions/language.endPoint.permission';
import { StatusId } from '@constants/status';
import { ComponentUtil } from '@utils/component.util';
import { EndPoints } from '@constants/endPoints';
import { ImageSourceUtil } from '@utils/imageSource.util';
import { RouteUtil } from '@utils/route.util';
import ComponentToast from '@components/elements/toast';

type IPageState = {
  mainTabActiveKey: string;
  status: IThemeFormSelectValue[];
  flags: IThemeFormSelectValue[];
  isSubmitting: boolean;
  mainTitle: string;
  item?: ILanguageGetResultService;
  formData: ILanguageUpdateWithIdParamService;
};

type IPageProps = {} & IPagePropCommon;

export default class PageSettingLanguageAdd extends Component<
  IPageProps,
  IPageState
> {
  abortController = new AbortController();

  constructor(props: IPageProps) {
    super(props);
    this.state = {
      mainTabActiveKey: `general`,
      status: [],
      flags: [],
      isSubmitting: false,
      mainTitle: '',
      formData: {
        _id: (this.props.router.query._id as string) ?? '',
        statusId: StatusId.Active,
        locale: '',
        shortKey: '',
        title: '',
        image: '',
        rank: 0,
        isDefault: false,
      },
    };
  }

  async componentDidMount() {
    const permission = this.state.formData._id
      ? LanguageEndPointPermission.UPDATE
      : LanguageEndPointPermission.ADD;
    if (PermissionUtil.checkAndRedirect(this.props, permission)) {
      await this.getFlags();
      this.getStatus();
      if (this.state.formData._id) {
        await this.getItem();
      }
      this.setPageTitle();
      this.props.setStateApp({
        isPageLoading: false,
      });
    }
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  setPageTitle() {
    const titles: string[] = [
      this.props.t('settings'),
      this.props.t('languages'),
      this.props.t(this.state.formData._id ? 'edit' : 'add'),
    ];
    if (this.state.formData._id) {
      titles.push(this.state.mainTitle);
    }
    this.props.setBreadCrumb(titles);
  }

  getStatus() {
    this.setState((state: IPageState) => {
      state.status = ComponentUtil.getStatusForSelect(
        [StatusId.Active, StatusId.Disabled],
        this.props.t
      );
      return state;
    });
  }

  async getFlags() {
    const serviceResult = await LanguageService.getFlags(
      {},
      this.abortController.signal
    );
    if (serviceResult.status && serviceResult.data) {
      this.setState((state: IPageState) => {
        state.flags = [{ value: '', label: this.props.t('notSelected') }];
        state.flags = serviceResult.data!.map((item) => ({
          value: item,
          label: item.split('.')[0].toUpperCase(),
        }));
        return state;
      });
    }
  }

  async getItem() {
    const serviceResult = await LanguageService.getWithId(
      { _id: this.state.formData._id },
      this.abortController.signal
    );
    if (serviceResult.status && serviceResult.data) {
      const item = serviceResult.data;

      await new Promise((resolve) => {
        this.setState(
          (state: IPageState) => {
            state.item = item;
            state.formData = {
              ...state.formData,
              ...item,
            };

            return state;
          },
          () => resolve(1)
        );
      });
    } else {
      await this.navigatePage();
    }
  }

  async navigatePage(isReload?: boolean) {
    const pagePath = EndPoints.LANGUAGE_WITH.LIST;
    await RouteUtil.change({ props: this.props, path: pagePath });
    if (isReload) {
      window.location.reload();
    }
  }

  async onSubmit(event: FormEvent) {
    event.preventDefault();
    this.setState(
      {
        isSubmitting: true,
      },
      async () => {
        const params = {
          ...this.state.formData,
        };

        const serviceResult = await (params._id
          ? LanguageService.updateWithId(params, this.abortController.signal)
          : LanguageService.add(params, this.abortController.signal));
        this.setState({
          isSubmitting: false,
        });
        if (serviceResult.status) {
          new ComponentToast({
            type: 'success',
            title: this.props.t('successful'),
            content: `${this.props.t(this.state.formData._id ? 'itemEdited' : 'itemAdded')}!`,
          });
          await this.navigatePage(true);
        }
      }
    );
  }

  Header = () => {
    return (
      <div className="col-md-3">
        <div className="row">
          <div className="col-6">
            <button
              className="btn btn-gradient-dark btn-lg btn-icon-text w-100"
              onClick={() => this.navigatePage()}
            >
              <i className="mdi mdi-arrow-left"></i>{' '}
              {this.props.t('returnBack')}
            </button>
          </div>
        </div>
      </div>
    );
  };

  TabOptions = () => {
    return (
      <div className="row">
        <div className="col-md-7 mb-3">
          <ComponentFormSelect
            title={this.props.t('status')}
            name="formData.statusId"
            options={this.state.status}
            value={this.state.status?.findSingle(
              'value',
              this.state.formData.statusId
            )}
            onChange={(item: any, e) =>
              HandleFormLibrary.onChangeSelect(e.name, item.value, this)
            }
          />
        </div>
        <div className="col-md-7 mb-3">
          <ComponentFormType
            title={`${this.props.t('rank')}*`}
            name="formData.rank"
            type="number"
            required={true}
            value={this.state.formData.rank}
            onChange={(e) => HandleFormLibrary.onChangeInput(e, this)}
          />
        </div>
        <div className="col-md-7 mb-3">
          <ComponentFormCheckBox
            title={this.props.t('default')}
            name="formData.isDefault"
            checked={Boolean(this.state.formData.isDefault)}
            onChange={(e) => HandleFormLibrary.onChangeInput(e, this)}
          />
        </div>
      </div>
    );
  };

  TabGeneral = () => {
    return (
      <div className="row">
        <div className="col-md-7 mb-3">
          <div className="row">
            <div className="col-1 m-auto">
              <Image
                src={ImageSourceUtil.getUploadedFlagSrc(
                  this.state.formData.image
                )}
                alt={this.state.formData.image}
                className="img-fluid img-sm"
                width={100}
                height={75}
              />
            </div>
            <div className="col-11">
              <ComponentFormSelect
                title={this.props.t('image')}
                name="formData.image"
                options={this.state.flags}
                value={this.state.flags.findSingle(
                  'value',
                  this.state.formData.image || ''
                )}
                onChange={(item: any, e) =>
                  HandleFormLibrary.onChangeSelect(e.name, item.value, this)
                }
              />
            </div>
          </div>
        </div>
        <div className="col-md-7 mb-3">
          <ComponentFormType
            title={`${this.props.t('title')}*`}
            name="formData.title"
            type="text"
            required={true}
            value={this.state.formData.title}
            onChange={(e) => HandleFormLibrary.onChangeInput(e, this)}
          />
        </div>
        <div className="col-md-7 mb-3">
          <ComponentFormType
            title={`${this.props.t('shortKey')}*`}
            name="formData.shortKey"
            type="text"
            required={true}
            value={this.state.formData.shortKey}
            onChange={(e) => HandleFormLibrary.onChangeInput(e, this)}
          />
        </div>
        <div className="col-md-7 mb-3">
          <ComponentFormType
            title={`${this.props.t('locale')}*`}
            name="formData.locale"
            type="text"
            required={true}
            value={this.state.formData.locale}
            onChange={(e) => HandleFormLibrary.onChangeInput(e, this)}
          />
        </div>
      </div>
    );
  };

  render() {
    return this.props.getStateApp.isPageLoading ? null : (
      <div className="page-post">
        <div className="row mb-3">
          <this.Header />
        </div>
        <div className="row">
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
                  <div className="theme-tabs">
                    <Tabs
                      onSelect={(key: any) =>
                        this.setState({ mainTabActiveKey: key })
                      }
                      activeKey={this.state.mainTabActiveKey}
                      className="mb-5"
                      transition={false}
                    >
                      <Tab eventKey="general" title={this.props.t('general')}>
                        <this.TabGeneral />
                      </Tab>
                      <Tab eventKey="options" title={this.props.t('options')}>
                        <this.TabOptions />
                      </Tab>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </ComponentForm>
        </div>
      </div>
    );
  }
}
