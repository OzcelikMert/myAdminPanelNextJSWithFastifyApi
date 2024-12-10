import React, { Component, FormEvent } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { IThemeFormSelectValue } from '@components/elements/form/input/select';
import {
  IComponentElementGetResultService,
  IComponentGetResultService,
  IComponentUpdateWithIdParamService,
} from 'types/services/component.service';
import { IPagePropCommon } from 'types/pageProps';
import { IComponentElementModel } from 'types/models/component.model';
import { PermissionUtil } from '@utils/permission.util';
import { ComponentEndPointPermission } from '@constants/endPointPermissions/component.endPoint.permission';
import { ElementTypeId, elementTypes } from '@constants/elementTypes';
import { ComponentService } from '@services/component.service';
import { EndPoints } from '@constants/endPoints';
import { cloneDeepWith } from 'lodash';
import {
  ComponentFieldSet,
  ComponentForm,
  ComponentFormSelect,
  ComponentFormType,
} from '@components/elements/form';
import { UserRoleId } from '@constants/userRoles';
import ComponentPageComponentElementTypeInput from '@components/pages/component/add/elementTypeInput';
import { ComponentTypeId, componentTypes } from '@constants/componentTypes';
import { HandleFormLibrary } from '@library/react/handles/form';
import { RouteUtil } from '@utils/route.util';
import ComponentToast from '@components/elements/toast';
import ComponentThemeToolTipMissingLanguages from '@components/theme/tooltip/missingLanguages';

type IPageState = {
  elementTypes: IThemeFormSelectValue[];
  componentTypes: IThemeFormSelectValue[];
  mainTabActiveKey: string;
  isSubmitting: boolean;
  mainTitle: string;
  formData: IComponentUpdateWithIdParamService;
  item?: IComponentGetResultService;
  selectedData?: IComponentElementModel;
};

type IPageProps = {} & IPagePropCommon;

export default class PageComponentAdd extends Component<
  IPageProps,
  IPageState
> {
  abortController = new AbortController();

  constructor(props: IPageProps) {
    super(props);
    this.state = {
      mainTabActiveKey: PermissionUtil.checkPermissionRoleRank(
        this.props.getStateApp.sessionAuth!.user.roleId,
        UserRoleId.SuperAdmin
      )
        ? 'general'
        : 'elements',
      elementTypes: [],
      componentTypes: [],
      isSubmitting: false,
      mainTitle: '',
      formData: {
        _id: (this.props.router.query._id as string) ?? '',
        elements: [],
        key: '',
        title: '',
        typeId: ComponentTypeId.Private,
      },
    };
  }

  async componentDidMount() {
    const permission = this.state.formData._id
      ? ComponentEndPointPermission.UPDATE
      : ComponentEndPointPermission.ADD;
    if (PermissionUtil.checkAndRedirect(this.props, permission)) {
      this.getElementTypes();
      this.getComponentTypes();
      if (this.state.formData._id) {
        await this.getItem();
      }
      this.setPageTitle();
      this.props.setStateApp({
        isPageLoading: false,
      });
    }
  }

  async componentDidUpdate(prevProps: IPagePropCommon) {
    if (
      prevProps.getStateApp.appData.currentLangId !=
      this.props.getStateApp.appData.currentLangId
    ) {
      this.props.setStateApp(
        {
          isPageLoading: true,
        },
        async () => {
          await this.getItem();
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
    const titles: string[] = [
      this.props.t('components'),
      this.props.t(this.state.formData._id ? 'edit' : 'add'),
    ];
    if (this.state.formData._id) {
      titles.push(this.state.mainTitle);
    }
    this.props.setBreadCrumb(titles);
  }

  getComponentTypes() {
    this.setState((state: IPageState) => {
      state.componentTypes = componentTypes.map((type) => ({
        label: this.props.t(type.langKey),
        value: type.id,
      }));
      return state;
    });
  }

  getElementTypes() {
    this.setState((state: IPageState) => {
      state.elementTypes = elementTypes.map((type) => ({
        label: this.props.t(type.langKey),
        value: type.id,
      }));
      return state;
    });
  }

  async getItem() {
    const serviceResult = await ComponentService.getWithId(
      {
        _id: this.state.formData._id,
        langId: this.props.getStateApp.appData.currentLangId,
      },
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
              elements: item.elements.map((element) => ({
                ...element,
                contents: {
                  ...element.contents,
                  langId: this.props.getStateApp.appData.currentLangId,
                },
              })),
            };

            if (
              this.props.getStateApp.appData.currentLangId ==
              this.props.getStateApp.appData.mainLangId
            ) {
              state.mainTitle = state.formData.title || '';
            }

            return state;
          },
          () => resolve(1)
        );
      });
    } else {
      await this.navigatePage();
    }
  }

  async navigatePage() {
    const path = EndPoints.COMPONENT_WITH.LIST;
    await RouteUtil.change({ props: this.props, path: path });
  }

  async onSubmit(event: FormEvent) {
    event.preventDefault();
    this.setState(
      {
        isSubmitting: true,
      },
      async () => {
        const params = this.state.formData;

        const serviceResult = await (params._id
          ? ComponentService.updateWithId(params, this.abortController.signal)
          : ComponentService.add(params, this.abortController.signal));

        this.setState({
          isSubmitting: false,
        });

        if (serviceResult.status) {
          new ComponentToast({
            type: 'success',
            title: this.props.t('successful'),
            content: `${this.props.t(this.state.formData._id ? 'itemEdited' : 'itemAdded')}!`,
          });
          if (!this.state.formData._id) {
            await this.navigatePage();
          }
        }
      }
    );
  }

  onInputChange(data: any, key: string, value: any) {
    this.setState((state: IPageState) => {
      data[key] = value;
      return state;
    });
  }

  onCreateElement() {
    const _id = String.createId();
    this.setState(
      (state: IPageState) => {
        state.formData.elements = [
          ...state.formData.elements,
          {
            _id: _id,
            title: '',
            rank: state.formData.elements.length + 1,
            typeId: ElementTypeId.Text,
            key: '',
            contents: {
              langId: this.props.getStateApp.appData.currentLangId,
            },
          },
        ];
        return state;
      },
      () => this.onEdit(this.state.formData.elements.indexOfKey('_id', _id))
    );
  }

  onAccept(index: number) {
    this.setState((state: IPageState) => {
      state.formData.elements[index] = state.selectedData!;
      state.selectedData = undefined;
      return state;
    });
  }

  onEdit(index: number) {
    this.setState((state: IPageState) => {
      state.selectedData = cloneDeepWith(this.state.formData.elements[index]);
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
      html: `<b>'${this.state.formData.elements[index].key}'</b> ${this.props.t('deleteItemQuestionWithItemName')}`,
      confirmButtonText: this.props.t('yes'),
      cancelButtonText: this.props.t('no'),
      icon: 'question',
      showCancelButton: true,
    });

    if (result.isConfirmed) {
      this.setState((state: IPageState) => {
        state.formData.elements.splice(index, 1);
        return state;
      });
    }
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

  ComponentElement = (
    props: IComponentElementGetResultService,
    index: number
  ) => {
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
            <div className="col-md">
              <ComponentPageComponentElementTypeInput
                {...this.props}
                data={props}
                onChange={(key, value) =>
                  this.onInputChange(props.contents, key, value)
                }
              />
            </div>
            {
              <ComponentThemeToolTipMissingLanguages
                itemLanguages={props.alternates ?? []}
                contentLanguages={
                  this.props.getStateApp.appData.contentLanguages
                }
                t={this.props.t}
                div={true}
                divClass="col-md-1"
              />
            }
          </div>
        </ComponentFieldSet>
      </div>
    );
  };

  ComponentElementEdit = (
    props: IComponentElementGetResultService,
    index: number
  ) => {
    return (
      <div className={`col-md-12 ${index > 0 ? 'mt-5' : ''}`}>
        <ComponentFieldSet legend={this.props.t('newElement')}>
          <div className="row mt-3">
            <div className="col-md-12">
              <ComponentFormType
                title={`${this.props.t('title')}*`}
                placeholder={this.props.t('title')}
                type="text"
                value={props.title}
                onChange={(e) =>
                  this.onInputChange(props, 'title', e.target.value)
                }
              />
            </div>
            <div className="col-md-12 mt-3">
              <ComponentFormType
                title={`${this.props.t('key')}*`}
                type="text"
                value={props.key}
                onChange={(e) =>
                  this.onInputChange(props, 'key', e.target.value)
                }
              />
            </div>
            <div className="col-md-12 mt-3">
              <ComponentFormSelect
                title={this.props.t('typeId')}
                placeholder={this.props.t('typeId')}
                options={this.state.elementTypes}
                value={this.state.elementTypes.filter(
                  (item) => item.value == props.typeId
                )}
                onChange={(item: any, e) =>
                  this.onInputChange(props, 'typeId', item.value)
                }
              />
            </div>
            <div className="col-md-12 mt-3">
              <ComponentFormType
                title={`${this.props.t('rank')}*`}
                type="number"
                required={true}
                value={props.rank}
                onChange={(e) =>
                  this.onInputChange(props, 'rank', Number(e.target.value) || 0)
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

  TabElements = () => {
    return (
      <div className="row mb-3">
        <div className="col-md-7">
          <div className="row">
            {this.state.formData.elements
              ?.orderBy('rank', 'asc')
              .map((item, index) =>
                this.state.selectedData &&
                this.state.selectedData._id == item._id
                  ? this.ComponentElementEdit(this.state.selectedData, index)
                  : this.ComponentElement(item, index)
              )}
          </div>
        </div>
        {PermissionUtil.checkPermissionRoleRank(
          this.props.getStateApp.sessionAuth!.user.roleId,
          UserRoleId.SuperAdmin
        ) ? (
          <div
            className={`col-md-7 text-start ${this.state.formData.elements.length > 0 ? 'mt-4' : ''}`}
          >
            <button
              type={'button'}
              className="btn btn-gradient-success btn-lg"
              onClick={() => this.onCreateElement()}
            >
              + {this.props.t('addNew')}
            </button>
          </div>
        ) : null}
      </div>
    );
  };

  TabGeneral = () => {
    return (
      <div className="row">
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
            title={`${this.props.t('key')}*`}
            name="formData.key"
            type="text"
            required={true}
            value={this.state.formData.key}
            onChange={(e) => HandleFormLibrary.onChangeInput(e, this)}
          />
        </div>
        <div className="col-md-7 mt-3">
          <ComponentFormSelect
            title={`${this.props.t('typeId')}*`}
            name="formData.typeId"
            placeholder={this.props.t('typeId')}
            options={this.state.componentTypes}
            value={this.state.componentTypes.findSingle(
              'value',
              this.state.formData.typeId
            )}
            onChange={(item: any, e) =>
              HandleFormLibrary.onChangeSelect(e.name, item.value, this)
            }
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
                    <div className="theme-tabs">
                      <Tabs
                        onSelect={(key: any) =>
                          this.setState({ mainTabActiveKey: key })
                        }
                        activeKey={this.state.mainTabActiveKey}
                        className="mb-5"
                        transition={false}
                      >
                        {PermissionUtil.checkPermissionRoleRank(
                          this.props.getStateApp.sessionAuth!.user.roleId,
                          UserRoleId.SuperAdmin
                        ) ? (
                          <Tab
                            eventKey="general"
                            title={this.props.t('general')}
                          >
                            <this.TabGeneral />
                          </Tab>
                        ) : null}
                        <Tab
                          eventKey="elements"
                          title={this.props.t('elements')}
                        >
                          <this.TabElements />
                        </Tab>
                      </Tabs>
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
