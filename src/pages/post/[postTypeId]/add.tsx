import React, { Component, FormEvent } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import moment from 'moment';
import {
  ComponentForm,
  ComponentFormCheckBox,
  ComponentFormSelect,
  ComponentFormType,
} from '@components/elements/form';
import { IPagePropCommon } from 'types/pageProps';
import { HandleFormLibrary } from '@library/react/handles/form';
import ComponentThemeChooseImage from '@components/theme/chooseImage';
import { PostTermService } from '@services/postTerm.service';
import { PostService } from '@services/post.service';
import {
  IPostGetResultService,
  IPostUpdateWithIdParamService,
} from 'types/services/post.service';
import ComponentToolTip from '@components/elements/tooltip';
import dynamic from 'next/dynamic';
import { ProductTypeId, productTypes } from '@constants/productTypes';
import { IThemeFormSelectValue } from '@components/elements/form/input/select';
import ComponentPagePostAddECommerce from '@components/pages/post/add/eCommerce';
import ComponentPagePostAddButton from '@components/pages/post/add/button';
import ComponentPagePostAddBeforeAndAfter from '@components/pages/post/add/beforeAndAfter';
import ComponentPagePostAddChooseCategory from '@components/pages/post/add/chooseCategory';
import ComponentPagePostAddChooseTag from '@components/pages/post/add/chooseTag';
import { PermissionUtil, PostPermissionMethod } from '@utils/permission.util';
import { PostTypeId } from '@constants/postTypes';
import { PostUtil } from '@utils/post.util';
import { languageKeys } from '@constants/languageKeys';
import { attributeTypes } from '@constants/attributeTypes';
import { PageTypeId, pageTypes } from '@constants/pageTypes';
import { ComponentUtil } from '@utils/component.util';
import { StatusId } from '@constants/status';
import { PostTermTypeId } from '@constants/postTermTypes';
import { ComponentService } from '@services/component.service';
import ComponentPagePostAddComponent from '@components/pages/post/add/component';
import { ComponentTypeId } from '@constants/componentTypes';
import { UserService } from '@services/user.service';
import { UserRoleId } from '@constants/userRoles';
import { RouteUtil } from '@utils/route.util';
import ComponentToast from '@components/elements/toast';
import ComponentThemeToolTipMissingLanguages from '@components/theme/tooltip/missingLanguages';

const ComponentThemeRichTextBox = dynamic(
  () => import('@components/theme/richTextBox'),
  { ssr: false }
);

export type IPageState = {
  authors: IThemeFormSelectValue[];
  pageTypes: IThemeFormSelectValue[];
  attributeTypes: IThemeFormSelectValue[];
  productTypes: IThemeFormSelectValue[];
  components: IThemeFormSelectValue[];
  mainTabActiveKey: string;
  categories: IThemeFormSelectValue[];
  tags: IThemeFormSelectValue[];
  attributes: IThemeFormSelectValue[];
  variations: (IThemeFormSelectValue & { parentId: string })[];
  status: IThemeFormSelectValue[];
  isSubmitting: boolean;
  mainTitle: string;
  formData: IPostUpdateWithIdParamService;
  item?: IPostGetResultService;
  isIconActive: boolean;
};

type IPageProps = {} & IPagePropCommon;

export default class PagePostAdd extends Component<IPageProps, IPageState> {
  abortController = new AbortController();

  constructor(props: IPageProps) {
    super(props);
    this.state = {
      mainTabActiveKey: `general`,
      attributeTypes: [],
      authors: [],
      components: [],
      productTypes: [],
      attributes: [],
      variations: [],
      categories: [],
      pageTypes: [],
      tags: [],
      status: [],
      isSubmitting: false,
      mainTitle: '',
      formData: {
        _id: (this.props.router.query._id as string) ?? '',
        typeId: Number(this.props.router.query.postTypeId ?? 1),
        statusId: StatusId.Active,
        rank: 0,
        isFixed: false,
        contents: {
          langId: this.props.getStateApp.appData.currentLangId,
          title: '',
        },
      },
      isIconActive: false,
    };
  }

  async componentDidMount() {
    const methodType = this.state.formData._id
      ? PostPermissionMethod.UPDATE
      : PostPermissionMethod.ADD;
    if (
      PermissionUtil.checkAndRedirect(
        this.props,
        PermissionUtil.getPostPermission(this.state.formData.typeId, methodType)
      )
    ) {
      if (
        ![
          PostTypeId.Slider,
          PostTypeId.Service,
          PostTypeId.Testimonial,
        ].includes(this.state.formData.typeId)
      ) {
        await this.getTerms();
      }
      if ([PostTypeId.Page].includes(this.state.formData.typeId)) {
        await this.getComponents();
        this.getPageTypes();
      }
      if ([PostTypeId.Product].includes(this.state.formData.typeId)) {
        this.getAttributeTypes();
        this.getProductTypes();
        this.setState({
          formData: {
            ...this.state.formData,
            eCommerce: {
              ...(this.state.formData.eCommerce ?? {
                typeId: ProductTypeId.SimpleProduct,
              }),
              images: [],
            },
          },
        });
      }
      if ([PostTypeId.BeforeAndAfter].includes(this.state.formData.typeId)) {
        this.setState({
          formData: {
            ...this.state.formData,
            beforeAndAfter: {
              imageBefore: '',
              imageAfter: '',
              images: [],
            },
          },
        });
      }
      await this.getAuthors();
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
      ...PostUtil.getPageTitles({
        t: this.props.t,
        postTypeId: this.state.formData.typeId,
      }),
      this.props.t(this.state.formData._id ? 'edit' : 'add'),
    ];

    if (this.state.formData._id) {
      titles.push(this.state.mainTitle);
    }

    this.props.setBreadCrumb(titles);
  }

  getAttributeTypes() {
    this.setState((state: IPageState) => {
      state.attributeTypes = attributeTypes.map((attribute) => ({
        label: this.props.t(attribute.langKey),
        value: attribute.id,
      }));
      return state;
    });
  }

  getProductTypes() {
    this.setState((state: IPageState) => {
      state.productTypes = productTypes.map((product) => ({
        label: this.props.t(product.langKey),
        value: product.id,
      }));
      return state;
    });
  }

  getPageTypes() {
    this.setState((state: IPageState) => {
      state.pageTypes = pageTypes.map((pageType) => ({
        label: this.props.t(pageType.langKey),
        value: pageType.id,
      }));
      state.formData.pageTypeId = PageTypeId.Default;
      return state;
    });
  }

  getStatus() {
    this.setState((state: IPageState) => {
      state.status = ComponentUtil.getStatusForSelect(
        [StatusId.Active, StatusId.InProgress, StatusId.Pending],
        this.props.t
      );
      state.formData.statusId = StatusId.Active;
      return state;
    });
  }

  async getAuthors() {
    const serviceResult = await UserService.getMany(
      {
        permissions: [
          ...PermissionUtil.getPostPermission(
            this.state.formData.typeId,
            PostPermissionMethod.UPDATE
          ).permissionId,
        ],
      },
      this.abortController.signal
    );
    if (serviceResult.status && serviceResult.data) {
      const items = serviceResult.data;
      this.setState((state: IPageState) => {
        state.authors = items
          .filter(
            (item) =>
              item.roleId != UserRoleId.SuperAdmin &&
              item._id != this.props.getStateApp.sessionAuth?.user.userId
          )
          .map((author) => {
            return {
              value: author._id,
              label: author.email,
            };
          });
        return state;
      });
    }
  }

  async getComponents() {
    const serviceResult = await ComponentService.getMany(
      {
        langId: this.props.getStateApp.appData.mainLangId,
        typeId: ComponentTypeId.Private,
      },
      this.abortController.signal
    );
    if (serviceResult.status && serviceResult.data) {
      this.setState((state: IPageState) => {
        state.components = serviceResult.data!.map((component) => {
          return {
            value: component._id,
            label: component.title,
          };
        });
        return state;
      });
    }
  }

  async getTerms() {
    const serviceResult = await PostTermService.getMany(
      {
        postTypeId: this.state.formData.typeId,
        langId: this.props.getStateApp.appData.mainLangId,
        statusId: StatusId.Active,
      },
      this.abortController.signal
    );
    if (serviceResult.status && serviceResult.data) {
      this.setState((state: IPageState) => {
        state.categories = [];
        state.tags = [];
        for (const term of serviceResult.data!) {
          if (term.typeId == PostTermTypeId.Category) {
            state.categories.push({
              value: term._id,
              label: term.contents?.title || this.props.t('[noLangAdd]'),
            });
          } else if (term.typeId == PostTermTypeId.Tag) {
            state.tags.push({
              value: term._id,
              label: term.contents?.title || this.props.t('[noLangAdd]'),
            });
          } else if (term.typeId == PostTermTypeId.Attributes) {
            state.attributes.push({
              value: term._id,
              label: term.contents?.title || this.props.t('[noLangAdd]'),
            });
          } else if (term.typeId == PostTermTypeId.Variations) {
            state.variations.push({
              value: term._id,
              label: term.contents?.title || this.props.t('[noLangAdd]'),
              parentId: term.parentId?._id || '',
            });
          }
        }
        return state;
      });
    }
  }

  async getItem() {
    const serviceResult = await PostService.getWithId(
      {
        _id: this.state.formData._id,
        typeId: this.state.formData.typeId,
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
              ...(item as IPostUpdateWithIdParamService),
              contents: {
                ...state.formData.contents,
                ...item.contents,
                views: item.contents?.views ?? 0,
                langId: this.props.getStateApp.appData.currentLangId,
                content: item.contents?.content ?? '',
              },
            };

            if (item.categories) {
              state.formData.categories = item.categories.map(
                (category) => category._id
              );
            }

            if (item.tags) {
              state.formData.tags = item.tags.map((tag) => tag._id);
            }

            if (item.components) {
              state.formData.components = item.components.map(
                (component) => component
              );
            }

            if (item.authors) {
              state.formData.authors = item.authors.map((author) => author._id);
            }

            if (item.eCommerce) {
              state.formData.eCommerce = {
                ...item.eCommerce,
                attributes: item.eCommerce.attributes?.map((attribute) => ({
                  ...attribute,
                  attributeId: attribute.attributeId._id,
                  variations: attribute.variations.map(
                    (variation) => variation._id
                  ),
                })),
                variations: item.eCommerce.variations?.map((variation) => ({
                  ...variation,
                  itemId: {
                    ...variation.itemId,
                    contents: {
                      ...variation.itemId.contents,
                      langId: this.props.getStateApp.appData.currentLangId,
                    },
                  },
                  selectedVariations: variation.selectedVariations.map(
                    (selectedVariation) => ({
                      ...selectedVariation,
                      variationId: selectedVariation.variationId._id,
                      attributeId: selectedVariation.attributeId._id,
                    })
                  ),
                })),
                variationDefaults: item.eCommerce.variationDefaults?.map(
                  (variationDefault) => ({
                    ...variationDefault,
                    attributeId: variationDefault.attributeId._id,
                    variationId: variationDefault.variationId._id,
                  })
                ),
              };
            }

            if (
              this.props.getStateApp.appData.currentLangId ==
              this.props.getStateApp.appData.mainLangId
            ) {
              state.mainTitle = state.formData.contents.title || '';
            }

            state.isIconActive = Boolean(
              item.contents &&
                item.contents.icon &&
                item.contents.icon.length > 0
            );

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
    const postTypeId = this.state.formData.typeId;
    const pagePath = PostUtil.getPagePath(postTypeId);
    await RouteUtil.change({ props: this.props, path: pagePath.LIST });
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

        let serviceResult;

        if (this.state.formData.typeId == PostTypeId.Product) {
          serviceResult = await (params._id
            ? PostService.updateProductWithId(
                params,
                this.abortController.signal
              )
            : PostService.addProduct(params, this.abortController.signal));
        } else {
          serviceResult = await (params._id
            ? PostService.updateWithId(params, this.abortController.signal)
            : PostService.add(params, this.abortController.signal));
        }

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

  onChangeContent(newContent: string) {
    this.setState((state: IPageState) => {
      state.formData.contents.content = newContent;
      return state;
    });
  }

  TotalViews = () => {
    return (
      <div className="col-6">
        <ComponentToolTip message={this.props.t('views')}>
          <label className="badge badge-gradient-primary w-100 p-2 fs-6 rounded-3">
            <i className="mdi mdi-eye"></i> {this.state.formData.contents.views}
          </label>
        </ComponentToolTip>
      </div>
    );
  };

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
          {
            this.state.formData._id &&
            [
              PostTypeId.Page,
              PostTypeId.Blog,
              PostTypeId.Portfolio,
              PostTypeId.Service,
            ].includes(Number(this.state.formData.typeId)) ? (
              <this.TotalViews />
            ) : null
          }
        </div>
      </div>
    );
  }

  TabOptions = () => {
    const isUserSuperAdmin = PermissionUtil.checkPermissionRoleRank(
      this.props.getStateApp.sessionAuth!.user.roleId,
      UserRoleId.SuperAdmin
    );
    return (
      <div className="row">
        {!this.state.formData._id ||
        PermissionUtil.checkPermissionRoleRank(
          this.props.getStateApp.sessionAuth!.user.roleId,
          UserRoleId.Editor
        ) ||
        this.props.getStateApp.sessionAuth!.user.userId ==
          this.state.item?.authorId?._id ? (
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
        ) : null}
        {this.state.formData.statusId == StatusId.Pending ? (
          <div className="col-md-7 mb-3">
            <ComponentFormType
              title={`${this.props.t('startDate').toCapitalizeCase()}*`}
              type="date"
              name="formData.dateStart"
              value={moment(this.state.formData.dateStart).format('YYYY-MM-DD')}
              onChange={(event) => HandleFormLibrary.onChangeInput(event, this)}
            />
          </div>
        ) : null}
        <div className="col-md-7 mb-3">
          <ComponentFormType
            title={this.props.t('rank')}
            name="formData.rank"
            type="number"
            required={true}
            value={this.state.formData.rank}
            onChange={(e) => HandleFormLibrary.onChangeInput(e, this)}
          />
        </div>
        {[PostTypeId.Page].includes(Number(this.state.formData.typeId)) &&
        isUserSuperAdmin ? (
          <div className="col-md-7 mb-3">
            <ComponentFormSelect
              title={this.props.t('pageType')}
              name="formData.pageTypeId"
              options={this.state.pageTypes}
              value={this.state.pageTypes?.findSingle(
                'value',
                this.state.formData.pageTypeId || ''
              )}
              onChange={(item: any, e) =>
                HandleFormLibrary.onChangeSelect(e.name, item.value, this)
              }
            />
          </div>
        ) : null}
        {!this.state.formData._id ||
        PermissionUtil.checkPermissionRoleRank(
          this.props.getStateApp.sessionAuth!.user.roleId,
          UserRoleId.Editor
        ) ||
        this.props.getStateApp.sessionAuth!.user.userId ==
          this.state.item?.authorId?._id ? (
          <div className="col-md-7 mb-3">
            <ComponentFormSelect
              title={this.props.t('authors')}
              name="formData.authors"
              isMulti
              closeMenuOnSelect={false}
              options={this.state.authors}
              value={this.state.authors?.filter((selectAuthor) =>
                this.state.formData.authors?.includes(selectAuthor.value)
              )}
              onChange={(item: any, e) =>
                HandleFormLibrary.onChangeSelect(e.name, item, this)
              }
            />
          </div>
        ) : null}
        <div className="col-md-7 mb-3">
          <ComponentFormCheckBox
            title={this.props.t('isFixed')}
            name="formData.isFixed"
            checked={Boolean(this.state.formData.isFixed)}
            onChange={(e) => HandleFormLibrary.onChangeInput(e, this)}
          />
        </div>
        {[PostTypeId.Page].includes(this.state.formData.typeId) &&
        isUserSuperAdmin ? (
          <div className="col-md-7">
            <ComponentFormCheckBox
              title={this.props.t('noIndex')}
              name="formData.isNoIndex"
              checked={Boolean(this.state.formData.isNoIndex)}
              onChange={(e) => HandleFormLibrary.onChangeInput(e, this)}
            />
          </div>
        ) : null}
      </div>
    );
  };

  TabContent = () => {
    return (
      <div className="row">
        <div className="col-md-12 mb-3">
          <ComponentThemeRichTextBox
            value={this.state.formData.contents.content || ''}
            onChange={(newContent) => this.onChangeContent(newContent)}
            {...this.props}
          />
        </div>
      </div>
    );
  };

  TabGeneral = () => {
    return (
      <div className="row">
        {[PostTypeId.Service].includes(Number(this.state.formData.typeId)) ? (
          <div className="col-md-7 mb-3">
            <div className="form-switch">
              <input
                checked={this.state.isIconActive}
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                onChange={(e) =>
                  this.setState({ isIconActive: !this.state.isIconActive })
                }
              />
              <label
                className="form-check-label ms-2"
                htmlFor="flexSwitchCheckDefault"
              >
                {this.props.t('icon')}
              </label>
            </div>
          </div>
        ) : null}
        {[PostTypeId.Service].includes(Number(this.state.formData.typeId)) &&
        this.state.isIconActive ? (
          <div className="col-md-7 mb-3">
            <ComponentFormType
              title={`${this.props.t('icon')}`}
              name="formData.contents.icon"
              type="text"
              value={this.state.formData.contents.icon}
              onChange={(e) => HandleFormLibrary.onChangeInput(e, this)}
            />
          </div>
        ) : null}
        {![PostTypeId.Service].includes(this.state.formData.typeId) ||
        !this.state.isIconActive ? (
          <div className="col-md-7 mb-3">
            <ComponentThemeChooseImage
              {...this.props}
              onSelected={(images) =>
                this.setState((state: IPageState) => {
                  state.formData.contents.image = images[0];
                  return state;
                })
              }
              isMulti={false}
              selectedImages={
                this.state.formData.contents.image
                  ? [this.state.formData.contents.image]
                  : undefined
              }
              isShowReviewImage={true}
              reviewImage={this.state.formData.contents.image}
              reviewImageClassName={'post-image'}
            />
          </div>
        ) : null}
        <div className="col-md-7 mb-3">
          <ComponentFormType
            title={`${this.props.t('title')}*`}
            name="formData.contents.title"
            type="text"
            required={true}
            value={this.state.formData.contents.title}
            onChange={(e) => HandleFormLibrary.onChangeInput(e, this)}
          />
        </div>
        <div className="col-md-7 mb-3">
          <ComponentFormType
            title={this.props.t('shortContent').toCapitalizeCase()}
            name="formData.contents.shortContent"
            type="textarea"
            value={this.state.formData.contents.shortContent}
            onChange={(e) => HandleFormLibrary.onChangeInput(e, this)}
          />
        </div>
        {![
          PostTypeId.Page,
          PostTypeId.Slider,
          PostTypeId.Service,
          PostTypeId.Testimonial,
        ].includes(Number(this.state.formData.typeId)) ? (
          <div className="col-md-7 mb-3">
            <ComponentPagePostAddChooseCategory page={this} />
          </div>
        ) : null}
        {![
          PostTypeId.Slider,
          PostTypeId.Service,
          PostTypeId.Testimonial,
        ].includes(Number(this.state.formData.typeId)) ? (
          <div className="col-md-7 mb-3">
            <ComponentPagePostAddChooseTag page={this} />
          </div>
        ) : null}
      </div>
    );
  };

  render() {
    const isUserSuperAdmin = PermissionUtil.checkPermissionRoleRank(
      this.props.getStateApp.sessionAuth!.user.roleId,
      UserRoleId.SuperAdmin
    );
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
                        <Tab eventKey="general" title={this.props.t('general')}>
                          <this.TabGeneral />
                        </Tab>
                        {![PostTypeId.Slider].includes(
                          Number(this.state.formData.typeId)
                        ) ? (
                          <Tab
                            eventKey="content"
                            title={this.props.t('content')}
                          >
                            {this.state.mainTabActiveKey === 'content' ? (
                              <this.TabContent />
                            ) : (
                              ''
                            )}
                          </Tab>
                        ) : null}
                        {this.state.formData.typeId == PostTypeId.Page &&
                        !isUserSuperAdmin ? null : (
                          <Tab
                            eventKey="options"
                            title={this.props.t('options')}
                          >
                            <this.TabOptions />
                          </Tab>
                        )}
                      </Tabs>
                    </div>
                  </div>
                </div>
              </div>
              {[PostTypeId.BeforeAndAfter].includes(
                this.state.formData.typeId
              ) ? (
                <ComponentPagePostAddBeforeAndAfter page={this} />
              ) : null}
              {[PostTypeId.Slider, PostTypeId.Service].includes(
                this.state.formData.typeId
              ) ? (
                <ComponentPagePostAddButton page={this} />
              ) : null}
              {isUserSuperAdmin &&
              [PostTypeId.Page].includes(this.state.formData.typeId) ? (
                <ComponentPagePostAddComponent page={this} />
              ) : null}
              {[PostTypeId.Product].includes(this.state.formData.typeId) ? (
                <ComponentPagePostAddECommerce page={this} />
              ) : null}
            </ComponentForm>
          </div>
        </div>
      </div>
    );
  }
}
