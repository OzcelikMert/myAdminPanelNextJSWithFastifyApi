import React, {Component, FormEvent} from 'react'
import {Tab, Tabs} from "react-bootstrap";
import moment from "moment";
import {ComponentForm, ComponentFormCheckBox, ComponentFormSelect, ComponentFormType} from "components/elements/form"
import {IPagePropCommon} from "types/pageProps";
import V from "library/variable";
import Variable from "library/variable";
import ReactHandleFormLibrary from "library/react/handles/form";
import ComponentThemeChooseImage from "components/theme/chooseImage";
import {PostTermService} from "services/postTerm.service";
import {PostService} from "services/post.service";
import {IPostUpdateWithIdParamService} from "types/services/post.service";
import ComponentToolTip from "components/elements/tooltip";
import Swal from "sweetalert2";
import Image from "next/image"
import dynamic from "next/dynamic";
import {ProductTypeId, productTypes} from "constants/productTypes";
import {IThemeFormSelectValue} from "components/elements/form/input/select";
import ComponentPagePostAddECommerce from "components/pages/post/add/eCommerce";
import ComponentPagePostAddButton from "components/pages/post/add/button";
import ComponentPagePostAddBeforeAndAfter from "components/pages/post/add/beforeAndAfter";
import ComponentPagePostAddChooseCategory from "components/pages/post/add/chooseCategory";
import ComponentPagePostAddChooseTag from "components/pages/post/add/chooseTag";
import {PermissionUtil, PostPermissionMethod} from "utils/permission.util";
import {PostTypeId} from "constants/postTypes";
import {PostUtil} from "utils/post.util";
import {languageKeys} from "constants/languageKeys";
import {attributeTypes} from "constants/attributeTypes";
import {pageTypes} from "constants/pageTypes";
import {ComponentUtil} from "utils/component.util";
import {StatusId} from "constants/status";
import {PostTermTypeId} from "constants/postTermTypes";
import {ImageSourceUtil} from "utils/imageSource.util";

const ComponentThemeRichTextBox = dynamic(() => import("components/theme/richTextBox"), {ssr: false});

export type IPageState = {
    langKeys: IThemeFormSelectValue[]
    pageTypes: IThemeFormSelectValue[]
    attributeTypes: IThemeFormSelectValue[]
    productTypes: IThemeFormSelectValue[]
    mainTabActiveKey: string
    categories: IThemeFormSelectValue[]
    tags: IThemeFormSelectValue[]
    attributes: IThemeFormSelectValue[],
    variations: (IThemeFormSelectValue & { mainId: string })[],
    status: IThemeFormSelectValue[]
    isSubmitting: boolean
    mainTitle: string
    formData: IPostUpdateWithIdParamService,
    isSelectionImage: boolean
    isIconActive: boolean
} & { [key: string]: any };

type IPageProps = {} & IPagePropCommon;

export default class PagePostAdd extends Component<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
        this.state = {
            mainTabActiveKey: `general`,
            attributeTypes: [],
            productTypes: [],
            attributes: [],
            variations: [],
            categories: [],
            langKeys: [],
            pageTypes: [],
            tags: [],
            status: [],
            isSubmitting: false,
            mainTitle: "",
            formData: {
                _id: this.props.router.query._id as string ?? "",
                typeId: Number(this.props.router.query.postTypeId ?? 1),
                statusId: 0,
                rank: 0,
                dateStart: new Date(),
                isFixed: false,
                contents: {
                    langId: this.props.getStateApp.appData.currentLangId,
                    title: "",
                }
            },
            isSelectionImage: false,
            isIconActive: false
        }
    }

    async componentDidMount() {
        let methodType = this.state.formData._id ? PostPermissionMethod.UPDATE : PostPermissionMethod.ADD;
        if (PermissionUtil.checkAndRedirect(this.props, PermissionUtil.getPostPermission(this.state.formData.typeId, methodType))) {
            this.getLangKeys();
            if (![PostTypeId.Slider, PostTypeId.Service, PostTypeId.Testimonial].includes(this.state.formData.typeId)) {
                await this.getTerms();
            }
            if ([PostTypeId.Page].includes(this.state.formData.typeId)) {
                this.getPageTypes();
            }
            if ([PostTypeId.Product].includes(this.state.formData.typeId)) {
                this.getAttributeTypes();
                this.getProductTypes();
                this.setState({
                    formData: {
                        ...this.state.formData,
                        eCommerce: {
                            ...(this.state.formData.eCommerce ?? {typeId: ProductTypeId.SimpleProduct}),
                            images: [],
                        }
                    }
                })
            }
            if ([PostTypeId.BeforeAndAfter].includes(this.state.formData.typeId)) {
                this.setState({
                    formData: {
                        ...this.state.formData,
                        beforeAndAfter: {
                            imageBefore: "",
                            imageAfter: "",
                            images: [],
                        }
                    }
                })
            }
            this.getStatus();
            if (this.state.formData._id) {
                await this.getItem();
            }
            this.setPageTitle();
            this.props.setStateApp({
                isPageLoading: false
            })
        }
    }

    async componentDidUpdate(prevProps: IPagePropCommon) {
        if (prevProps.getStateApp.appData.currentLangId != this.props.getStateApp.appData.currentLangId) {
            this.props.setStateApp({
                isPageLoading: true
            }, async () => {
                await this.getItem()
                this.props.setStateApp({
                    isPageLoading: false
                })
            })
        }
    }

    setPageTitle() {
        let titles: string[] = [
            ...PostUtil.getPageTitles({t: this.props.t, postTypeId: this.state.formData.typeId}),
            this.props.t(this.state.formData._id ? "edit" : "add")
        ];

        if (this.state.formData._id) {
            titles.push(this.state.mainTitle)
        }

        this.props.setBreadCrumb(titles);
    }

    getLangKeys() {
        this.setState((state: IPageState) => {
            state.langKeys = languageKeys.map(langKey => ({label: langKey, value: langKey}))
            return state;
        })
    }

    getAttributeTypes() {
        this.setState((state: IPageState) => {
            state.attributeTypes = attributeTypes.map(attribute => ({
                label: this.props.t(attribute.langKey),
                value: attribute.id
            }))
            return state;
        })
    }

    getProductTypes() {
        this.setState((state: IPageState) => {
            state.productTypes = productTypes.map(product => ({
                label: this.props.t(product.langKey),
                value: product.id
            }))
            return state;
        })
    }

    getPageTypes() {
        this.setState((state: IPageState) => {
            state.pageTypes = pageTypes.map(pageType => ({
                label: this.props.t(pageType.langKey),
                value: pageType.id
            }))
            return state;
        })
    }

    getStatus() {
        this.setState((state: IPageState) => {
            state.status = ComponentUtil.getStatusForSelect([
                StatusId.Active,
                StatusId.InProgress,
                StatusId.Pending
            ], this.props.t);
            state.formData.statusId = StatusId.Active;
            return state;
        })
    }

    async getTerms() {
        let serviceResult = await PostTermService.getMany({
            postTypeId: this.state.formData.typeId,
            langId: this.props.getStateApp.appData.mainLangId,
            statusId: StatusId.Active
        });
        if (serviceResult.status && serviceResult.data) {
            this.setState((state: IPageState) => {
                state.categories = [];
                state.tags = [];
                for (const term of serviceResult.data!) {
                    if (term.typeId == PostTermTypeId.Category) {
                        state.categories.push({
                            value: term._id,
                            label: term.contents?.title || this.props.t("[noLangAdd]")
                        });
                    } else if (term.typeId == PostTermTypeId.Tag) {
                        state.tags.push({
                            value: term._id,
                            label: term.contents?.title || this.props.t("[noLangAdd]")
                        });
                    } else if (term.typeId == PostTermTypeId.Attributes) {
                        state.attributes.push({
                            value: term._id,
                            label: term.contents?.title || this.props.t("[noLangAdd]")
                        });
                    } else if (term.typeId == PostTermTypeId.Variations) {
                        state.variations.push({
                            value: term._id,
                            label: term.contents?.title || this.props.t("[noLangAdd]"),
                            mainId: term.mainId?._id || ""
                        });
                    }
                }
                return state;
            })
        }
    }

    async getItem() {
        let serviceResult = await PostService.getWithId({
            _id: this.state.formData._id,
            typeId: this.state.formData.typeId,
            langId: this.props.getStateApp.appData.currentLangId
        });
        if (serviceResult.status && serviceResult.data) {
            const item = serviceResult.data;

            await new Promise(resolve => {
                this.setState((state: IPageState) => {
                    state.formData = {
                        ...state.formData,
                        ...item as IPostUpdateWithIdParamService,
                        dateStart: new Date(item.dateStart),
                        contents: {
                            ...state.formData.contents,
                            ...item.contents,
                            views: item.contents?.views ?? 0,
                            langId: this.props.getStateApp.appData.currentLangId,
                            content: item.contents?.content ?? ""
                        }
                    };

                    if (item.categories) {
                        state.formData.categories = item.categories.map(category => category._id);
                    }

                    if (item.tags) {
                        state.formData.tags = item.tags.map(tag => tag._id);
                    }

                    if (item.eCommerce) {
                        state.formData.eCommerce = {
                            ...item.eCommerce,
                            attributes: item.eCommerce.attributes?.map(attribute => ({
                                ...attribute,
                                attributeId: attribute.attributeId._id,
                                variations: attribute.variations.map(variation => variation._id)
                            })),
                            variations: item.eCommerce.variations?.map(variation => ({
                                ...variation,
                                selectedVariations: variation.selectedVariations.map(selectedVariation => ({
                                    ...selectedVariation,
                                    variationId: selectedVariation.variationId._id,
                                    attributeId: selectedVariation.attributeId._id
                                }))
                            })),
                            variationDefaults: item.eCommerce.variationDefaults?.map(variationDefault => ({
                                ...variationDefault,
                                attributeId: variationDefault.attributeId._id,
                                variationId: variationDefault.variationId._id
                            }))
                        }
                    }

                    if (this.props.getStateApp.appData.currentLangId == this.props.getStateApp.appData.mainLangId) {
                        state.mainTitle = state.formData.contents.title || "";
                    }

                    state.isIconActive = Boolean(item.contents && item.contents.icon && item.contents.icon.length > 0);

                    return state;
                }, () => resolve(1))
            })
        } else {
            this.navigatePage();
        }
    }

    navigatePage() {
        let postTypeId = this.state.formData.typeId;
        let pagePath = PostUtil.getPagePath(postTypeId);
        this.props.router.push(pagePath.LIST);
    }

    onSubmit(event: FormEvent) {
        event.preventDefault();
        this.setState({
            isSubmitting: true
        }, async () => {
            let params = {
                ...this.state.formData,
            };

            let serviceResult = await ((params._id)
                ? PostService.updateWithId(params)
                : PostService.add(params));

            this.setState({
                isSubmitting: false
            });

            if (serviceResult.status) {
                Swal.fire({
                    title: this.props.t("successful"),
                    text: `${this.props.t((V.isEmpty(this.state.formData._id)) ? "itemAdded" : "itemEdited")}!`,
                    icon: "success",
                    timer: 1000,
                    timerProgressBar: true,
                    didClose: () => {
                        if (!this.state.formData._id) {
                            this.navigatePage();
                        }
                    }
                })
            }
        })
    }

    onChangeContent(newContent: string) {
        this.setState((state: IPageState) => {
            state.formData.contents.content = newContent;
            return state;
        })
    }

    TabOptions = () => {
        return (
            <div className="row">
                <div className="col-md-7 mb-3">
                    <ComponentFormType
                        title={`${this.props.t("startDate").toCapitalizeCase()}*`}
                        type="date"
                        name="formData.dateStart"
                        value={moment(this.state.formData.dateStart).format("YYYY-MM-DD")}
                        onChange={(event) => ReactHandleFormLibrary.onChangeInput(event, this)}
                    />
                </div>
                <div className="col-md-7 mb-3">
                    <ComponentFormSelect
                        title={this.props.t("status")}
                        name="formData.statusId"
                        options={this.state.status}
                        value={this.state.status?.findSingle("value", this.state.formData.statusId)}
                        onChange={(item: any, e) => ReactHandleFormLibrary.onChangeSelect(e.name, item.value, this)}
                    />
                </div>
                <div className="col-md-7 mb-3">
                    <ComponentFormType
                        title={this.props.t("rank")}
                        name="formData.rank"
                        type="number"
                        required={true}
                        value={this.state.formData.rank}
                        onChange={e => ReactHandleFormLibrary.onChangeInput(e, this)}
                    />
                </div>
                {
                    [PostTypeId.Page].includes(Number(this.state.formData.typeId))
                        ? <div className="col-md-7">
                            <ComponentFormSelect
                                title={this.props.t("pageType")}
                                name="formData.pageTypeId"
                                options={this.state.pageTypes}
                                value={this.state.pageTypes?.findSingle("value", this.state.formData.pageTypeId || "")}
                                onChange={(item: any, e) => ReactHandleFormLibrary.onChangeSelect(e.name, item.value, this)}
                            />
                        </div> : null
                }
                <div className="col-md-7">
                    <ComponentFormCheckBox
                        title={this.props.t("isFixed")}
                        name="formData.isFixed"
                        checked={Boolean(this.state.formData.isFixed)}
                        onChange={e => ReactHandleFormLibrary.onChangeInput(e, this)}
                    />
                </div>
            </div>
        );
    }

    TabContent = () => {
        return (
            <div className="row">
                <div className="col-md-7 mb-3">
                    <ComponentThemeRichTextBox
                        value={this.state.formData.contents.content || ""}
                        onChange={newContent => this.onChangeContent(newContent)}
                        {...this.props}
                    />
                </div>
            </div>
        );
    }

    TabGeneral = () => {
        return (
            <div className="row">
                {
                    [PostTypeId.Service].includes(Number(this.state.formData.typeId))
                        ? <div className="col-md-7 mb-3">
                            <div className="form-switch">
                                <input
                                    checked={this.state.isIconActive}
                                    className="form-check-input"
                                    type="checkbox"
                                    id="flexSwitchCheckDefault"
                                    onChange={(e) => this.setState({isIconActive: !this.state.isIconActive})}
                                />
                                <label className="form-check-label ms-2"
                                       htmlFor="flexSwitchCheckDefault">{this.props.t("icon")}</label>
                            </div>
                        </div> : null
                }
                {
                    [PostTypeId.Service].includes(Number(this.state.formData.typeId)) && this.state.isIconActive
                        ? <div className="col-md-7 mb-3">
                            <ComponentFormType
                                title={`${this.props.t("icon")}`}
                                name="formData.contents.icon"
                                type="text"
                                value={this.state.formData.contents.icon}
                                onChange={e => ReactHandleFormLibrary.onChangeInput(e, this)}
                            />
                        </div> : null
                }
                <div className="col-md-7 mb-3">
                    <ComponentThemeChooseImage
                        {...this.props}
                        isShow={this.state.isSelectionImage}
                        onHide={() => this.setState({isSelectionImage: false})}
                        onSelected={images => this.setState((state: IPageState) => {
                            state.formData.contents.image = images[0];
                            return state
                        })}
                        isMulti={false}
                        selectedImages={(this.state.formData.contents.image) ? [this.state.formData.contents.image] : undefined}
                    />
                    <Image
                        src={ImageSourceUtil.getUploadedImageSrc(this.state.formData.contents.image)}
                        alt="Empty Image"
                        className="post-image img-fluid"
                        width={100}
                        height={100}
                    />
                    <button
                        type="button"
                        className="btn btn-gradient-warning btn-xs ms-1"
                        onClick={() => {
                            this.setState({isSelectionImage: true})
                        }}
                    ><i className="fa fa-pencil-square-o"></i></button>
                </div>
                <div className="col-md-7 mb-3">
                    <ComponentFormType
                        title={`${this.props.t("title")}*`}
                        name="formData.contents.title"
                        type="text"
                        required={true}
                        value={this.state.formData.contents.title}
                        onChange={e => ReactHandleFormLibrary.onChangeInput(e, this)}
                    />
                </div>
                <div className="col-md-7 mb-3">
                    <ComponentFormType
                        title={this.props.t("shortContent").toCapitalizeCase()}
                        name="formData.contents.shortContent"
                        type="textarea"
                        value={this.state.formData.contents.shortContent}
                        onChange={e => ReactHandleFormLibrary.onChangeInput(e, this)}
                    />
                </div>
                {
                    ![PostTypeId.Page, PostTypeId.Slider, PostTypeId.Service, PostTypeId.Testimonial].includes(Number(this.state.formData.typeId))
                        ? <div className="col-md-7 mb-3">
                            <ComponentPagePostAddChooseCategory page={this}/>
                        </div> : null
                }
                {
                    ![PostTypeId.Slider, PostTypeId.Service, PostTypeId.Testimonial].includes(Number(this.state.formData.typeId))
                        ? <div className="col-md-7 mb-3">
                            <ComponentPagePostAddChooseTag page={this}/>
                        </div> : null
                }
            </div>
        );
    }

    render() {
        return this.props.getStateApp.isPageLoading ? null : (
            <div className="page-post">
                <div className="row mb-3">
                    <div className="col-md-3">
                        <div className="row">
                            <div className="col-6">
                                <button className="btn btn-gradient-dark btn-lg btn-icon-text w-100"
                                        onClick={() => this.navigatePage()}>
                                    <i className="mdi mdi-arrow-left"></i> {this.props.t("returnBack")}
                                </button>
                            </div>
                            {
                                this.state.formData._id && [PostTypeId.Page, PostTypeId.Blog, PostTypeId.Portfolio, PostTypeId.Service].includes(Number(this.state.formData.typeId))
                                    ? <div className="col-6">
                                        <ComponentToolTip message={this.props.t("views")}>
                                            <label className="badge badge-gradient-primary w-100 p-2 fs-6 rounded-3">
                                                <i className="mdi mdi-eye"></i> {this.state.formData.contents.views}
                                            </label>
                                        </ComponentToolTip>
                                    </div> : null
                            }
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <ComponentForm
                            isActiveSaveButton={true}
                            saveButtonText={this.props.t("save")}
                            saveButtonLoadingText={this.props.t("loading")}
                            isSubmitting={this.state.isSubmitting}
                            formAttributes={{onSubmit: (event) => this.onSubmit(event)}}
                        >
                            <div className="grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="theme-tabs">
                                            <Tabs
                                                onSelect={(key: any) => this.setState({mainTabActiveKey: key})}
                                                activeKey={this.state.mainTabActiveKey}
                                                className="mb-5"
                                                transition={false}>
                                                <Tab eventKey="general" title={this.props.t("general")}>
                                                    <this.TabGeneral/>
                                                </Tab>
                                                {
                                                    ![PostTypeId.Slider].includes(Number(this.state.formData.typeId))
                                                        ? <Tab eventKey="content" title={this.props.t("content")}>
                                                            {
                                                                (this.state.mainTabActiveKey === "content")
                                                                    ? <this.TabContent/>
                                                                    : ""
                                                            }
                                                        </Tab> : null
                                                }
                                                <Tab eventKey="options" title={this.props.t("options")}>
                                                    <this.TabOptions/>
                                                </Tab>
                                            </Tabs>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                [PostTypeId.BeforeAndAfter].includes(this.state.formData.typeId)
                                    ? <ComponentPagePostAddBeforeAndAfter page={this}/>
                                    : null
                            }
                            {
                                [PostTypeId.Slider, PostTypeId.Service].includes(this.state.formData.typeId)
                                    ? <ComponentPagePostAddButton page={this}/>
                                    : null
                            }
                            {
                                [PostTypeId.Product].includes(this.state.formData.typeId)
                                    ? <ComponentPagePostAddECommerce page={this}/>
                                    : null
                            }
                        </ComponentForm>
                    </div>
                </div>
            </div>
        )
    }
}
