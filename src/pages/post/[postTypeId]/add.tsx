import React, {Component, FormEvent} from 'react'
import {Tab, Tabs} from "react-bootstrap";
import moment from "moment";
import {ThemeForm, ThemeFormCheckBox, ThemeFormSelect, ThemeFormType} from "components/theme/form"
import {LanguageKeysArray, PageTypes, PostTermTypeId, PostTypeId, StatusId} from "constants/index";
import {PagePropCommonDocument} from "types/pageProps";
import V from "library/variable";
import Variable from "library/variable";
import HandleForm from "library/react/handles/form";
import ThemeChooseImage from "components/theme/chooseImage";
import postTermService from "services/postTerm.service";
import postService from "services/post.service";
import staticContentLib from "lib/staticContent.lib";
import imageSourceLib from "lib/imageSource.lib";
import {
    PostUpdateOneParamDocument
} from "types/services/post";
import componentService from "services/component.service";
import ThemeToolTip from "components/theme/tooltip";
import Swal from "sweetalert2";
import Image from "next/image"
import dynamic from "next/dynamic";
import PostLib from "lib/post.lib";
import {ProductTypeId, ProductTypes} from "constants/productTypes";
import {AttributeTypes} from "constants/attributeTypes";
import postLib from "lib/post.lib";
import {ThemeFormSelectValueDocument} from "components/theme/form/input/select";
import ComponentPagePostAddECommerce from "components/pages/post/add/eCommerce";
import ComponentPagePostAddComponent from "components/pages/post/add/component";
import ComponentPagePostAddButton from "components/pages/post/add/button";
import ComponentPagePostAddBeforeAndAfter from "components/pages/post/add/beforeAndAfter";
import ComponentPagePostAddChooseCategory from "components/pages/post/add/chooseCategory";
import ComponentPagePostAddChooseTag from "components/pages/post/add/chooseTag";

const ThemeRichTextBox = dynamic(() => import("components/theme/richTextBox").then((module) => module.default), {ssr: false});

export type PageState = {
    langKeys: ThemeFormSelectValueDocument[]
    pageTypes: ThemeFormSelectValueDocument[]
    attributeTypes: ThemeFormSelectValueDocument[]
    productTypes: ThemeFormSelectValueDocument[]
    components: ThemeFormSelectValueDocument[]
    mainTabActiveKey: string
    categories: ThemeFormSelectValueDocument[]
    tags: ThemeFormSelectValueDocument[]
    attributes: ThemeFormSelectValueDocument[],
    variations: (ThemeFormSelectValueDocument & { mainId: string })[],
    status: ThemeFormSelectValueDocument[]
    isSubmitting: boolean
    mainTitle: string
    formData: PostUpdateOneParamDocument,
    isSelectionImage: boolean
    isIconActive: boolean
} & { [key: string]: any };

type PageProps = {} & PagePropCommonDocument;

export default class PagePostAdd extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
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
            components: [],
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
                    langId: this.props.getStateApp.pageData.langId,
                    title: "",
                }
            },
            isSelectionImage: false,
            isIconActive: false
        }
    }

    async componentDidMount() {
        this.setPageTitle();
        this.getLangKeys();
        if (![PostTypeId.Slider, PostTypeId.Service, PostTypeId.Testimonial].includes(this.state.formData.typeId)) {
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
        this.props.setStateApp({
            isPageLoading: false
        })
    }

    async componentDidUpdate(prevProps: PagePropCommonDocument) {
        if (prevProps.getStateApp.pageData.langId != this.props.getStateApp.pageData.langId) {
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
            ...postLib.getPageTitles({t: this.props.t, postTypeId: this.state.formData.typeId}),
            this.props.t(this.state.formData._id ? "edit" : "add")
        ];

        if (this.state.formData._id) {
            titles.push(this.state.mainTitle)
        }

        this.props.setBreadCrumb(titles);
    }

    getLangKeys() {
        this.setState((state: PageState) => {
            state.langKeys = LanguageKeysArray.map(langKey => ({label: langKey, value: langKey}))
            return state;
        })
    }

    getAttributeTypes() {
        this.setState((state: PageState) => {
            state.attributeTypes = AttributeTypes.map(attribute => ({
                label: this.props.t(attribute.langKey),
                value: attribute.id
            }))
            return state;
        })
    }

    getProductTypes() {
        this.setState((state: PageState) => {
            state.productTypes = ProductTypes.map(product => ({
                label: this.props.t(product.langKey),
                value: product.id
            }))
            return state;
        })
    }

    async getComponents() {
        let resData = await componentService.getMany({langId: this.props.getStateApp.appData.mainLangId});
        if (resData.status) {
            this.setState((state: PageState) => {
                state.components = resData.data.map(component => {
                    return {
                        value: component._id,
                        label: this.props.t(component.langKey)
                    };
                });
                return state;
            })
        }
    }

    getPageTypes() {
        this.setState((state: PageState) => {
            state.pageTypes = PageTypes.map(pageType => ({
                label: this.props.t(pageType.langKey),
                value: pageType.id
            }))
            return state;
        })
    }

    getStatus() {
        this.setState((state: PageState) => {
            state.status = staticContentLib.getStatusForSelect([
                StatusId.Active,
                StatusId.InProgress,
                StatusId.Pending
            ], this.props.t);
            state.formData.statusId = StatusId.Active;
            return state;
        })
    }

    async getTerms() {
        let resData = await postTermService.getMany({
            postTypeId: this.state.formData.typeId,
            langId: this.props.getStateApp.appData.mainLangId,
            statusId: StatusId.Active
        });
        if (resData.status) {
            this.setState((state: PageState) => {
                state.categories = [];
                state.tags = [];
                for (const term of resData.data) {
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
        let resData = await postService.getOne({
            _id: this.state.formData._id,
            typeId: this.state.formData.typeId,
            langId: this.props.getStateApp.pageData.langId
        });
        if (resData.status) {
            if (resData.data) {
                const item = resData.data;

                this.setState((state: PageState) => {
                    state.formData = {
                        ...state.formData,
                        ...item as PostUpdateOneParamDocument,
                        dateStart: new Date(item.dateStart),
                        contents: {
                            ...state.formData.contents,
                            ...item.contents,
                            views: item.contents?.views ?? 0,
                            langId: this.props.getStateApp.pageData.langId,
                            content: item.contents?.content ?? ""
                        }
                    };

                    if(item.components){
                        state.formData.components = item.components.map(component => component._id);
                    }

                    if(item.categories){
                        state.formData.categories = item.categories.map(category => category._id);
                    }

                    if(item.tags){
                        state.formData.tags = item.tags.map(tag => tag._id);
                    }

                    if(item.eCommerce){
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

                    if (this.props.getStateApp.pageData.langId == this.props.getStateApp.appData.mainLangId) {
                        state.mainTitle = state.formData.contents.title || "";
                    }

                    state.isIconActive = Boolean(item.contents && item.contents.icon && item.contents.icon.length > 0);

                    return state;
                }, () => {
                    this.setPageTitle();
                })
            }
        } else {
            this.navigatePage();
        }
    }

    navigatePage() {
        let postTypeId = this.state.formData.typeId;
        let pagePath = PostLib.getPagePath(postTypeId);
        let path = pagePath.list();
        this.props.router.push(path);
    }

    onSubmit(event: FormEvent) {
        event.preventDefault();
        this.setState({
            isSubmitting: true
        }, async () => {
            let params = {
                ...this.state.formData,
                components: this.state.formData.components?.filter(component => !Variable.isEmpty(component))
            };

            let resData = await ((params._id)
                ? postService.updateOne(params)
                : postService.add(params));

            this.setState({
                isSubmitting: false
            }, () => {
                if(resData.status){
                    this.setMessage();
                }
            })
        })
    }

    onChangeContent(newContent: string) {
        this.setState((state: PageState) => {
            state.formData.contents.content = newContent;
            return state;
        })
    }

    setMessage() {
        Swal.fire({
            title: this.props.t("successful"),
            text: `${this.props.t((V.isEmpty(this.state.formData._id)) ? "itemAdded" : "itemEdited")}!`,
            icon: "success",
            timer: 1000,
            timerProgressBar: true,
            didClose: () => this.onCloseSuccessMessage()
        })
    }

    onCloseSuccessMessage() {
        if (!this.state.formData._id) {
            this.navigatePage();
        }
    }

    TabOptions = () => {
        return (
            <div className="row">
                <div className="col-md-7 mb-3">
                    <ThemeFormType
                        title={`${this.props.t("startDate").toCapitalizeCase()}*`}
                        type="date"
                        name="formData.dateStart"
                        value={moment(this.state.formData.dateStart).format("YYYY-MM-DD")}
                        onChange={(event) => HandleForm.onChangeInput(event, this)}
                    />
                </div>
                <div className="col-md-7 mb-3">
                    <ThemeFormSelect
                        title={this.props.t("status")}
                        name="formData.statusId"
                        options={this.state.status}
                        value={this.state.status?.findSingle("value", this.state.formData.statusId)}
                        onChange={(item: any, e) => HandleForm.onChangeSelect(e.name, item.value, this)}
                    />
                </div>
                <div className="col-md-7 mb-3">
                    <ThemeFormType
                        title={this.props.t("rank")}
                        name="formData.rank"
                        type="number"
                        required={true}
                        value={this.state.formData.rank}
                        onChange={e => HandleForm.onChangeInput(e, this)}
                    />
                </div>
                {
                    [PostTypeId.Page].includes(Number(this.state.formData.typeId))
                        ? <div className="col-md-7">
                            <ThemeFormSelect
                                title={this.props.t("pageType")}
                                name="formData.pageTypeId"
                                options={this.state.pageTypes}
                                value={this.state.pageTypes?.findSingle("value", this.state.formData.pageTypeId || "")}
                                onChange={(item: any, e) => HandleForm.onChangeSelect(e.name, item.value, this)}
                            />
                        </div> : null
                }
                <div className="col-md-7">
                    <ThemeFormCheckBox
                        title={this.props.t("isFixed")}
                        name="formData.isFixed"
                        checked={Boolean(this.state.formData.isFixed)}
                        onChange={e => HandleForm.onChangeInput(e, this)}
                    />
                </div>
            </div>
        );
    }

    TabContent = () => {
        return (
            <div className="row">
                <div className="col-md-7 mb-3">
                    <ThemeRichTextBox
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
                            <ThemeFormType
                                title={`${this.props.t("icon")}`}
                                name="formData.contents.icon"
                                type="text"
                                value={this.state.formData.contents.icon}
                                onChange={e => HandleForm.onChangeInput(e, this)}
                            />
                        </div> : null
                }
                <div className="col-md-7 mb-3">
                    <ThemeChooseImage
                        {...this.props}
                        isShow={this.state.isSelectionImage}
                        onHide={() => this.setState({isSelectionImage: false})}
                        onSelected={images => this.setState((state: PageState) => {
                            state.formData.contents.image = images[0];
                            return state
                        })}
                        isMulti={false}
                        selectedImages={(this.state.formData.contents.image) ? [this.state.formData.contents.image] : undefined}
                    />
                    <Image
                        src={imageSourceLib.getUploadedImageSrc(this.state.formData.contents.image)}
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
                    <ThemeFormType
                        title={`${this.props.t("title")}*`}
                        name="formData.contents.title"
                        type="text"
                        required={true}
                        value={this.state.formData.contents.title}
                        onChange={e => HandleForm.onChangeInput(e, this)}
                    />
                </div>
                <div className="col-md-7 mb-3">
                    <ThemeFormType
                        title={this.props.t("shortContent").toCapitalizeCase()}
                        name="formData.contents.shortContent"
                        type="textarea"
                        value={this.state.formData.contents.shortContent}
                        onChange={e => HandleForm.onChangeInput(e, this)}
                    />
                </div>
                {
                    ![PostTypeId.Page, PostTypeId.Slider, PostTypeId.Service, PostTypeId.Testimonial].includes(Number(this.state.formData.typeId))
                        ? <div className="col-md-7 mb-3">
                            <ComponentPagePostAddChooseCategory page={this}  />
                        </div> : null
                }
                {
                    ![PostTypeId.Slider, PostTypeId.Service, PostTypeId.Testimonial].includes(Number(this.state.formData.typeId))
                        ? <div className="col-md-7 mb-3">
                            <ComponentPagePostAddChooseTag page={this}  />
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
                                        <ThemeToolTip message={this.props.t("views")}>
                                            <label className="badge badge-gradient-primary w-100 p-2 fs-6 rounded-3">
                                                <i className="mdi mdi-eye"></i> {this.state.formData.contents.views}
                                            </label>
                                        </ThemeToolTip>
                                    </div> : null
                            }
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <ThemeForm
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
                                    ? <ComponentPagePostAddBeforeAndAfter page={this} />
                                    : null
                            }
                            {
                                [PostTypeId.Slider, PostTypeId.Service].includes(this.state.formData.typeId)
                                    ? <ComponentPagePostAddButton page={this} />
                                    : null
                            }
                            {
                                [PostTypeId.Page].includes(this.state.formData.typeId)
                                    ? <ComponentPagePostAddComponent page={this} />
                                    : null
                            }
                            {
                                [PostTypeId.Product].includes(this.state.formData.typeId)
                                    ? <ComponentPagePostAddECommerce page={this} />
                                    : null
                            }
                        </ThemeForm>
                    </div>
                </div>
            </div>
        )
    }
}
