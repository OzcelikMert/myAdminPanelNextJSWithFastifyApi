import React, {Component} from 'react';
import {ComponentFormCheckBox, ComponentFormSelect, ComponentFormType} from "@components/elements/form";
import {HandleFormLibrary} from "@library/react/handles/form";
import {IPostECommerceAttributeModel, IPostECommerceVariationModel} from "types/models/post.model";
import {Accordion, Card, Tab, Tabs} from "react-bootstrap";
import ComponentAccordionToggle from "@components/elements/accordion/toggle";
import ComponentThemeChooseImage from "@components/theme/chooseImage";
import Image from "next/image";
import {ProductTypeId} from "@constants/productTypes";
import PagePostAdd, {IPageState as PostPageState} from "@pages/post/[postTypeId]/add";
import {AttributeTypeId} from "@constants/attributeTypes";
import dynamic from "next/dynamic";
import ComponentToolTip from "@components/elements/tooltip";
import Swal from "sweetalert2";
import {ImageSourceUtil} from "@utils/imageSource.util";

const ComponentThemeRichTextBox = dynamic(() => import("@components/theme/richTextBox"), {
    ssr: false,
    loading: () => <p>Loading...</p>
});

type IPageState = {
    mainTabActiveKey: string
} & { [key: string]: any };

type IPageProps = {
    page: PagePostAdd
};

export default class ComponentPagePostAddECommerce extends Component<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
        this.state = {
            mainTabActiveKey: "options"
        }
    }

    componentDidMount() {
        this.findDefaultVariation();
        this.findSameVariation();
    }

    findSameVariation() {
        this.props.page.setState((state: PostPageState) => {
            if (typeof state.formData.eCommerce !== "undefined") {
                state.formData.eCommerce.variations = state.formData.eCommerce.variations?.map(variation => {
                    let dataFilter = JSON.stringify(variation.selectedVariations.map(selectedVariation => ({
                        variationId: selectedVariation.variationId,
                        attributeId: selectedVariation.attributeId
                    })));
                    variation.isWarningForIsThereOther = state.formData.eCommerce?.variations?.some(variation_ => variation_._id != variation._id && JSON.stringify(variation_.selectedVariations.map(selectedVariation => ({
                        variationId: selectedVariation.variationId,
                        attributeId: selectedVariation.attributeId
                    }))) == dataFilter);
                    return variation;
                })
            }
            return state;
        })
    }

    findDefaultVariation() {
        this.props.page.setState((state: PostPageState) => {
            if (typeof state.formData.eCommerce !== "undefined") {
                let dataFilter = JSON.stringify(state.formData.eCommerce.variationDefaults?.map(variationDefault => ({
                    variationId: variationDefault.variationId,
                    attributeId: variationDefault.attributeId
                })));

                state.formData.eCommerce.variations = state.formData.eCommerce.variations?.map(variation => {
                    variation.isDefault = JSON.stringify(variation.selectedVariations.map(selectedVariation => ({
                        variationId: selectedVariation.variationId,
                        attributeId: selectedVariation.attributeId
                    }))) == dataFilter;
                    return variation;
                })
            }
            return state;
        })
    }

    onChange(data: any, key: any, value: any) {
        this.props.page.setState((state: PostPageState) => {
            data[key] = value;
            return state;
        })
    }

    onAddNewAttribute() {
        this.props.page.setState((state: PostPageState) => {
            if (typeof state.formData.eCommerce !== "undefined") {
                if (typeof state.formData.eCommerce.attributes === "undefined") state.formData.eCommerce.attributes = [];
                state.formData.eCommerce.attributes.push({
                    _id: String.createId(),
                    attributeId: "",
                    typeId: AttributeTypeId.Text,
                    variations: []
                })
            }
            return state;
        })
    }

    onChangeAttributeVariations(attribute: IPostECommerceAttributeModel<string>, values: PostPageState["variations"]) {
        this.props.page.setState((state: PostPageState) => {
            attribute.variations = values.map(value => value.value)
            return state;
        })
    }

    onDeleteAttribute(index: number) {
        this.props.page.setState((state: PostPageState) => {
            if (typeof state.formData.eCommerce !== "undefined") {
                state.formData.eCommerce.attributes?.remove(index);
            }
            return state;
        })
    }

    onAddNewVariation() {
        this.props.page.setState((state: PostPageState) => {
            if (typeof state.formData.eCommerce !== "undefined") {
                if (typeof state.formData.eCommerce.variations === "undefined") state.formData.eCommerce.variations = [];
                state.formData.eCommerce.variations.push({
                    _id: String.createId(),
                    selectedVariations: [],
                    images: [],
                    rank: 0,
                    pricing: {
                        taxIncluded: 0,
                        compared: 0,
                        shipping: 0,
                        taxExcluded: 0,
                        taxRate: 0
                    },
                    shipping: {
                        width: "",
                        height: "",
                        depth: "",
                        weight: ""
                    },
                    inventory: {
                        sku: "",
                        quantity: 0,
                        isManageStock: false
                    },
                    contents: {
                        langId: state.formData.contents.langId,
                    }
                })
            }
            return state;
        })
    }

    async onDeleteVariation(index: number) {
        let result = await Swal.fire({
            title: this.props.page.props.t("deleteAction"),
            html: `${this.props.page.props.t("deleteSelectedItemsQuestion")}`,
            confirmButtonText: this.props.page.props.t("yes"),
            cancelButtonText: this.props.page.props.t("no"),
            icon: "question",
            showCancelButton: true,
        });

        if (result.isConfirmed) {
            this.props.page.setState((state: PostPageState) => {
                if (typeof state.formData.eCommerce !== "undefined") {
                    state.formData.eCommerce.variations?.remove(index);
                }
                return state;
            })
        }
    }

    onChangeVariationAttributeChild(data: IPostECommerceVariationModel<string>, attributeId: string, value: string) {
        this.props.page.setState((state: PostPageState) => {
            if (typeof state.formData.eCommerce !== "undefined") {
                let findIndex = data.selectedVariations.indexOfKey("attributeId", attributeId);
                if (findIndex > -1) {
                    data.selectedVariations[findIndex].variationId = value;
                } else {
                    data.selectedVariations.push({
                        attributeId: attributeId,
                        variationId: value
                    })
                }
            }
            return state;
        }, () => {
            this.findSameVariation();
        })
    }

    onChangeVariationDefault(attributeId: string, value: string) {
        this.props.page.setState((state: PostPageState) => {
            if (typeof state.formData.eCommerce !== "undefined") {
                if (typeof state.formData.eCommerce.variationDefaults == "undefined") state.formData.eCommerce.variationDefaults = [];
                let findIndex = state.formData.eCommerce.variationDefaults.indexOfKey("attributeId", attributeId);
                if (findIndex > -1) {
                    state.formData.eCommerce.variationDefaults[findIndex].variationId = value;
                } else {
                    state.formData.eCommerce.variationDefaults.push({
                        attributeId: attributeId,
                        variationId: value
                    })
                }
            }
            return state;
        }, () => {
            this.findDefaultVariation();
        })
    }

    TabPricing = () => {
        return (
            <div className="row">
                <div className="col-md-7">
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <ComponentFormType
                                title={this.props.page.props.t("taxIncludedPrice")}
                                name="formData.eCommerce.pricing.taxIncluded"
                                type="number"
                                value={this.props.page.state.formData.eCommerce?.pricing?.taxIncluded}
                                onChange={e => HandleFormLibrary.onChangeInput(e, this.props.page)}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <ComponentFormType
                                title={this.props.page.props.t("taxExcludedPrice")}
                                name="formData.eCommerce.pricing.taxExcluded"
                                type="number"
                                value={this.props.page.state.formData.eCommerce?.pricing?.taxExcluded}
                                onChange={e => HandleFormLibrary.onChangeInput(e, this.props.page)}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <ComponentFormType
                                title={this.props.page.props.t("taxRate")}
                                name="formData.eCommerce.pricing.taxRate"
                                type="number"
                                value={this.props.page.state.formData.eCommerce?.pricing?.taxRate}
                                onChange={e => HandleFormLibrary.onChangeInput(e, this.props.page)}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <ComponentFormType
                                title={this.props.page.props.t("comparedPrice")}
                                name="formData.eCommerce.pricing.compared"
                                type="number"
                                value={this.props.page.state.formData.eCommerce?.pricing?.compared}
                                onChange={e => HandleFormLibrary.onChangeInput(e, this.props.page)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    TabGallery = () => {
        return (
            <div className="row">
                <div className="col-md-7 mb-3">
                    <ComponentThemeChooseImage
                        {...this.props.page.props}
                        isShow={this.props.page.state.selectGalleryECommerce}
                        onHide={() => this.props.page.setState((state: PostPageState) => {
                            state.selectGalleryECommerce = false;
                            return state;
                        })}
                        onSelected={images => this.props.page.setState((state: PostPageState) => {
                            if (typeof state.formData.eCommerce !== "undefined") {
                                state.formData.eCommerce.images = images;
                            }
                            return state
                        })}
                        isMulti={true}
                        selectedImages={this.props.page.state.formData.eCommerce?.images}
                    />
                    <button
                        type="button"
                        className="btn btn-gradient-info btn-lg ms-1"
                        onClick={() => this.onChange(this.props.page.state, `selectGalleryECommerce`, true)}
                    ><i className="fa fa-pencil-square-o"></i> Resim Sec
                    </button>
                </div>
                <div className="col-md-12 mb-3">
                    <div className="row">
                        {
                            this.props.page.state.formData.eCommerce?.images?.map(image => (
                                <div className="col-md-3 mb-3">
                                    <Image
                                        src={ImageSourceUtil.getUploadedImageSrc(image)}
                                        alt="Empty Image"
                                        className="post-image img-fluid"
                                        width={100}
                                        height={100}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }

    TabInventory = () => {
        return (
            <div className="row">
                <div className="col-md-7">
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <ComponentFormType
                                title={this.props.page.props.t("sku")}
                                name="formData.eCommerce.inventory.sku"
                                type="text"
                                value={this.props.page.state.formData.eCommerce?.inventory?.sku}
                                onChange={e => HandleFormLibrary.onChangeInput(e, this.props.page)}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <ComponentFormType
                                title={this.props.page.props.t("quantity")}
                                name="formData.eCommerce.inventory.quantity"
                                disabled={!this.props.page.state.formData.eCommerce?.inventory?.isManageStock || false}
                                type="number"
                                value={this.props.page.state.formData.eCommerce?.inventory?.quantity}
                                onChange={e => HandleFormLibrary.onChangeInput(e, this.props.page)}
                            />
                        </div>
                        <div className="col-md-7">
                            <ComponentFormCheckBox
                                title={this.props.page.props.t("isManageStock")}
                                name="formData.eCommerce.inventory.isManageStock"
                                checked={Boolean(this.props.page.state.formData.eCommerce?.inventory?.isManageStock)}
                                onChange={e => HandleFormLibrary.onChangeInput(e, this.props.page)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    TabShipping = () => {
        return (
            <div className="row">
                <div className="col-md-7">
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <ComponentFormType
                                title={this.props.page.props.t("width")}
                                name="formData.eCommerce.shipping.width"
                                type="text"
                                value={this.props.page.state.formData.eCommerce?.shipping?.width}
                                onChange={e => HandleFormLibrary.onChangeInput(e, this.props.page)}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <ComponentFormType
                                title={this.props.page.props.t("height")}
                                name="formData.eCommerce.shipping.height"
                                type="text"
                                value={this.props.page.state.formData.eCommerce?.shipping?.height}
                                onChange={e => HandleFormLibrary.onChangeInput(e, this.props.page)}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <ComponentFormType
                                title={this.props.page.props.t("depth")}
                                name="formData.eCommerce.shipping.depth"
                                type="text"
                                value={this.props.page.state.formData.eCommerce?.shipping?.depth}
                                onChange={e => HandleFormLibrary.onChangeInput(e, this.props.page)}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <ComponentFormType
                                title={this.props.page.props.t("weight")}
                                name="formData.eCommerce.shipping.weight"
                                type="text"
                                value={this.props.page.state.formData.eCommerce?.shipping?.weight}
                                onChange={e => HandleFormLibrary.onChangeInput(e, this.props.page)}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <ComponentFormType
                                title={this.props.page.props.t("shippingPrice")}
                                name="formData.eCommerce.pricing.shipping"
                                type="number"
                                value={this.props.page.state.formData.eCommerce?.pricing?.shipping}
                                onChange={e => HandleFormLibrary.onChangeInput(e, this.props.page)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    TabAttributes = () => {
        const Attribute = (attribute: IPostECommerceAttributeModel<string>, index: number) => {
            return (
                <Card>
                    <Card.Header>
                        <div className="row">
                            <div className="col-9">
                                <div className="row">
                                    <div className="col-md-6 mt-2 mt-md-0">
                                        <ComponentFormSelect
                                            title={this.props.page.props.t("attribute")}
                                            options={this.props.page.state.attributes}
                                            value={this.props.page.state.attributes.findSingle("value", attribute.attributeId)}
                                            onChange={(item: any, e) => this.onChange(attribute, "attributeId", item.value)}
                                        />
                                    </div>
                                    <div className="col-md-6 mt-2 mt-md-0">
                                        <ComponentFormSelect
                                            title={this.props.page.props.t("type")}
                                            options={this.props.page.state.attributeTypes}
                                            value={this.props.page.state.attributeTypes?.findSingle("value", attribute.typeId)}
                                            onChange={(item: any, e) => this.onChange(attribute, "typeId", item.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-3 m-auto">
                                <div className="row">
                                    <div className="col-md-6 text-center text-md-end">
                                        <button type="button" className="btn btn-gradient-danger btn-lg"
                                                onClick={() => this.onDeleteAttribute(index)}>
                                            <i className="mdi mdi-trash-can"></i></button>
                                    </div>
                                    <div className="col-md-6 text-center pt-1 mt-5 m-md-auto">
                                        <ComponentAccordionToggle eventKey={attribute._id || ""}>
                                            <div className="fs-4 cursor-pointer"><i className="mdi mdi-menu"></i>
                                            </div>
                                        </ComponentAccordionToggle>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card.Header>
                    <Accordion.Collapse eventKey={attribute._id || ""}>
                        <Card.Body>
                            <div className="row">
                                <div className="col-md-12">
                                    <ComponentFormSelect
                                        title={this.props.page.props.t("variations")}
                                        isMulti
                                        closeMenuOnSelect={false}
                                        options={this.props.page.state.variations.findMulti("parentId", attribute.attributeId)}
                                        value={this.props.page.state.variations.findMulti("value", attribute.variations)}
                                        onChange={(item: any, e) => this.onChangeAttributeVariations(attribute, item)}
                                    />
                                </div>
                            </div>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            )
        }

        return (
            <div className="row mb-3">
                <div className="col-md-7">
                    <button type={"button"} className="btn btn-gradient-success btn-lg"
                            onClick={() => this.onAddNewAttribute()}>+ {this.props.page.props.t("addNew")}
                    </button>
                </div>
                <div className="col-md-7 mt-2">
                    <Accordion flush>
                        {
                            this.props.page.state.formData.eCommerce?.attributes?.map((option, index) => {
                                return Attribute(option, index)
                            })
                        }
                    </Accordion>
                </div>
            </div>
        );
    }

    TabVariations = () => {
        const Variation = (variation: IPostECommerceVariationModel<string>, index: number) => {
            return (
                <Card>
                    <Card.Header>
                        <div className="row">
                            <div className="col-9">
                                <div className="row">
                                    {
                                        this.props.page.state.formData.eCommerce?.attributes?.map(attribute => (
                                            <div className="col-md-4 mt-3">
                                                <ComponentFormSelect
                                                    title={this.props.page.state.attributes.findSingle("value", attribute.attributeId)?.label}
                                                    options={this.props.page.state.variations.findMulti("value", attribute.variations)}
                                                    value={this.props.page.state.variations.findSingle("value", variation.selectedVariations.findSingle("attributeId", attribute.attributeId)?.variationId)}
                                                    onChange={(item: any, e) => this.onChangeVariationAttributeChild(variation, attribute.attributeId, item.value)}
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="col-3 m-auto">
                                <div className="row">
                                    <div className="col-md text-center text-md-end">
                                        {
                                            variation.isDefault
                                                ? <ComponentToolTip message={this.props.page.props.t("default")}>
                                                    <label className="badge badge-gradient-success pt-2 pb-2 ps-4 pe-4">
                                                        <i className="mdi mdi-check"></i>
                                                    </label>
                                                </ComponentToolTip>
                                                : <button type="button" className="btn btn-gradient-danger btn-lg"
                                                          onClick={() => this.onDeleteVariation(index)}>
                                                    <i className="mdi mdi-trash-can"></i>
                                                </button>
                                        }
                                    </div>
                                    {
                                        variation.isWarningForIsThereOther
                                            ? <div className="col-md text-center pt-1 mt-5 m-md-auto">
                                                <ComponentToolTip
                                                    message={this.props.page.props.t("sameVariationErrorMessage")}>
                                                    <div className="fs-4 cursor-pointer text-warning"><i
                                                        className="mdi mdi-alert-circle"></i></div>
                                                </ComponentToolTip>
                                            </div> : null
                                    }
                                    <div className="col-md text-center pt-1 mt-5 m-md-auto">
                                        <ComponentAccordionToggle eventKey={variation._id || ""}>
                                            <div className="fs-4 cursor-pointer"><i
                                                className="mdi mdi-menu"></i></div>
                                        </ComponentAccordionToggle>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card.Header>
                    <Accordion.Collapse eventKey={variation._id || ""}>
                        <Card.Body>
                            <Tabs
                                onSelect={(key: any) => this.onChange(this.props.page.state, `activeKey${variation._id}`, key)}
                                activeKey={this.props.page.state[`activeKey${variation._id}`] || "general"}
                                className="mb-5"
                                transition={false}>
                                <Tab eventKey="general" title={this.props.page.props.t("general")}>
                                    <div className="row mb-4">
                                        <div className="col-md-7 mb-3">
                                            <ComponentThemeChooseImage
                                                {...this.props.page.props}
                                                isShow={this.props.page.state[`selectImage${variation._id}`]}
                                                onHide={() => this.props.page.setState((state: PostPageState) => {
                                                    state[`selectImage${variation._id}`] = false;
                                                    return state;
                                                })}
                                                onSelected={images => this.props.page.setState((state: PostPageState) => {
                                                    if (variation.contents) {
                                                        variation.contents.image = images[0];
                                                    }
                                                    state[`selectImage${variation._id}`] = false;
                                                    return state;
                                                })}
                                                isMulti={false}
                                                selectedImages={(variation.contents && variation.contents.image) ? [variation.contents.image] : undefined}
                                            />
                                            <Image
                                                src={ImageSourceUtil.getUploadedImageSrc(variation.contents?.image)}
                                                alt="Empty Image"
                                                className="post-image img-fluid"
                                                width={100}
                                                height={100}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-gradient-warning btn-xs ms-1"
                                                onClick={() => this.onChange(this.props.page.state, `selectImage${variation._id}`, true)}
                                            ><i className="fa fa-pencil-square-o"></i></button>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <ComponentFormType
                                                title={this.props.page.props.t("shortContent").toCapitalizeCase()}
                                                type="textarea"
                                                value={variation.contents?.shortContent}
                                                onChange={e => this.onChange(variation.contents, "shortContent", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="content" title={this.props.page.props.t("content")}>
                                    <div className="row mb-4">
                                        <div className="col-md-12 mb-3">
                                            {
                                                (this.props.page.state[`activeKey${variation._id}`] === "content")
                                                    ? <ComponentThemeRichTextBox
                                                        value={variation.contents?.content || ""}
                                                        onChange={newContent => this.onChange(variation.contents, "content", newContent)}
                                                        {...this.props.page.props}
                                                    />
                                                    : ""
                                            }
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="gallery" title={this.props.page.props.t("gallery")}>
                                    <div className="row mb-4">
                                        <div className="col-md-7 mb-3">
                                            <ComponentThemeChooseImage
                                                {...this.props.page.props}
                                                isShow={this.props.page.state[`selectGallery${variation._id}`]}
                                                onHide={() => this.props.page.setState((state: PostPageState) => {
                                                    state[`selectGallery${variation._id}`] = false;
                                                    return state;
                                                })}
                                                onSelected={images => this.props.page.setState((state: PostPageState) => {
                                                    variation.images = images;
                                                    return state
                                                })}
                                                isMulti={true}
                                                selectedImages={variation.images}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-gradient-info btn-lg ms-1"
                                                onClick={() => this.onChange(this.props.page.state, `selectGallery${variation._id}`, true)}
                                            ><i className="fa fa-pencil-square-o"></i> Resim Sec
                                            </button>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="row">
                                                {
                                                    variation.images.map(image => (
                                                        <div className="col-md-3 mb-3">
                                                            <Image
                                                                src={ImageSourceUtil.getUploadedImageSrc(image)}
                                                                alt="Empty Image"
                                                                className="post-image img-fluid"
                                                                width={100}
                                                                height={100}
                                                            />
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="pricing" title={this.props.page.props.t("pricing")}>
                                    <div className="row mb-4">
                                        <div className="col-md-6 mb-3">
                                            <ComponentFormType
                                                title={this.props.page.props.t("taxIncludedPrice")}
                                                type="number"
                                                value={variation.pricing?.taxIncluded}
                                                onChange={e => this.onChange(variation.pricing, "taxIncluded", Number(e.target.value) || 0)}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <ComponentFormType
                                                title={this.props.page.props.t("taxExcludedPrice")}
                                                type="number"
                                                value={variation.pricing?.taxExcluded}
                                                onChange={e => this.onChange(variation.pricing, "taxExcluded", Number(e.target.value) || 0)}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <ComponentFormType
                                                title={this.props.page.props.t("taxRate")}
                                                type="number"
                                                value={variation.pricing?.taxRate}
                                                onChange={e => this.onChange(variation.pricing, "taxRate", Number(e.target.value) || 0)}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <ComponentFormType
                                                title={this.props.page.props.t("comparedPrice")}
                                                type="number"
                                                value={variation.pricing?.compared}
                                                onChange={e => this.onChange(variation.pricing, "compared", Number(e.target.value) || 0)}
                                            />
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="inventory" title={this.props.page.props.t("inventory")}>
                                    <div className="row mb-4">
                                        <div className="col-md-6 mb-3">
                                            <ComponentFormType
                                                title={this.props.page.props.t("sku")}
                                                type="text"
                                                value={variation.inventory?.sku}
                                                onChange={e => this.onChange(variation.inventory, "sku", e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <ComponentFormType
                                                disabled={!variation.inventory?.isManageStock || false}
                                                title={this.props.page.props.t("quantity")}
                                                type="number"
                                                value={variation.inventory?.quantity}
                                                onChange={e => this.onChange(variation.inventory, "quantity", e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-7 mb-3">
                                            <ComponentFormCheckBox
                                                title={this.props.page.props.t("isManageStock")}
                                                checked={Boolean(variation.inventory?.isManageStock)}
                                                onChange={e => this.onChange(variation.inventory, "isManageStock", e.target.checked)}
                                            />
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="shipping" title={this.props.page.props.t("shipping")}>
                                    <div className="row mb-4">
                                        <div className="col-md-6 mb-3">
                                            <ComponentFormType
                                                title={this.props.page.props.t("width")}
                                                type="text"
                                                value={variation.shipping?.width}
                                                onChange={e => this.onChange(variation.shipping, "width", e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <ComponentFormType
                                                title={this.props.page.props.t("height")}
                                                type="text"
                                                value={variation.shipping?.height}
                                                onChange={e => this.onChange(variation.shipping, "height", e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <ComponentFormType
                                                title={this.props.page.props.t("depth")}
                                                type="text"
                                                value={variation.shipping?.depth}
                                                onChange={e => this.onChange(variation.shipping, "depth", e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <ComponentFormType
                                                title={this.props.page.props.t("weight")}
                                                type="text"
                                                value={variation.shipping?.weight}
                                                onChange={e => this.onChange(variation.shipping, "weight", e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <ComponentFormType
                                                title={this.props.page.props.t("shippingPrice")}
                                                type="number"
                                                value={variation.pricing?.shipping}
                                                onChange={e => this.onChange(variation.pricing, "shipping", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            )
        }

        return (
            <div className="row mb-3">
                <div className="col-md-7">
                    <h4>{this.props.page.props.t("default")}</h4>
                    <div className="row">
                        {
                            this.props.page.state.formData.eCommerce?.attributes?.map(attribute => (
                                <div className="col-md-4 mt-3">
                                    <ComponentFormSelect
                                        title={this.props.page.state.attributes.findSingle("value", attribute.attributeId)?.label}
                                        options={this.props.page.state.variations.findMulti("value", attribute.variations)}
                                        value={this.props.page.state.variations.findSingle("value", this.props.page.state.formData.eCommerce?.variationDefaults?.findSingle("attributeId", attribute.attributeId)?.variationId)}
                                        onChange={(item: any, e) => this.onChangeVariationDefault(attribute.attributeId, item.value)}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="col-md-7 mt-3">
                    <button type={"button"} className="btn btn-gradient-success btn-lg"
                            onClick={() => this.onAddNewVariation()}>+ {this.props.page.props.t("addNew")}
                    </button>
                </div>
                <div className="col-md-7 mt-3">
                    <Accordion flush>
                        {
                            this.props.page.state.formData.eCommerce?.variations?.map((variation, index) => Variation(variation, index))
                        }
                    </Accordion>
                </div>
            </div>
        );
    }

    TabOptions = () => {
        return (
            <div className="row">
                <div className="col-md-7 mb-3">
                    <ComponentFormSelect
                        title={this.props.page.props.t("productType")}
                        name="formData.eCommerce.typeId"
                        options={this.props.page.state.productTypes}
                        value={this.props.page.state.productTypes?.findSingle("value", this.props.page.state.formData.eCommerce?.typeId || "")}
                        onChange={(item: any, e) => HandleFormLibrary.onChangeSelect(e.name, item.value, this.props.page)}
                    />
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="theme-tabs">
                            <Tabs
                                onSelect={(key: any) => this.setState({mainTabActiveKey: key})}
                                activeKey={this.state.mainTabActiveKey}
                                className="mb-5"
                                transition={false}>
                                <Tab eventKey="options" title={this.props.page.props.t("options")}>
                                    <this.TabOptions/>
                                </Tab>
                                {
                                    this.props.page.state.formData.eCommerce?.typeId == ProductTypeId.SimpleProduct
                                        ? <Tab eventKey="gallery" title={this.props.page.props.t("gallery")}>
                                            <this.TabGallery/>
                                        </Tab> : null
                                }
                                {
                                    this.props.page.state.formData.eCommerce?.typeId == ProductTypeId.SimpleProduct
                                        ? <Tab eventKey="pricing" title={this.props.page.props.t("pricing")}>
                                            <this.TabPricing/>
                                        </Tab> : null
                                }
                                {
                                    this.props.page.state.formData.eCommerce?.typeId == ProductTypeId.SimpleProduct
                                        ? <Tab eventKey="inventory" title={this.props.page.props.t("inventory")}>
                                            <this.TabInventory/>
                                        </Tab> : null
                                }
                                {
                                    this.props.page.state.formData.eCommerce?.typeId == ProductTypeId.SimpleProduct
                                        ? <Tab eventKey="shipping" title={this.props.page.props.t("shipping")}>
                                            <this.TabShipping/>
                                        </Tab> : null
                                }
                                <Tab eventKey="attributes" title={this.props.page.props.t("attributes")}>
                                    <this.TabAttributes/>
                                </Tab>
                                {
                                    this.props.page.state.formData.eCommerce?.typeId == ProductTypeId.VariableProduct
                                        ? <Tab eventKey="variations" title={this.props.page.props.t("variations")}>
                                            <this.TabVariations/>
                                        </Tab> : null
                                }
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}