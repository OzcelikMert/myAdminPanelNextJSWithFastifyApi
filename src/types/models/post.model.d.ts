import {PostTypeId} from "constants/postTypes";
import {StatusId} from "constants/status";
import {PageTypeId} from "constants/pageTypes";
import {ProductTypeId} from "constants/productTypes";
import {AttributeTypeId} from "constants/attributeTypes";

export interface IPostModel {
    _id: string
    typeId: PostTypeId,
    statusId: StatusId,
    pageTypeId?: PageTypeId,
    authorId: string
    lastAuthorId: string
    dateStart: Date,
    rank: number,
    isFixed?: boolean,
    categories?: string[]
    tags?: string[]
    contents: IPostContentModel
    components?: string []
    beforeAndAfter?: IPostBeforeAndAfterModel
    eCommerce?: IPostECommerceModel
    updatedAt?: string
    createdAt?: string
}

export interface IPostContentModel {
    _id?: string
    langId: string
    image?: string
    icon?: string
    title?: string,
    content?: string,
    shortContent?: string,
    url?: string,
    views?: number,
    buttons?: IPostContentButtonModel[]
}

export interface IPostBeforeAndAfterModel {
    imageBefore: string
    imageAfter: string
    images: string[]
}

export interface IPostContentButtonModel {
    _id?: string
    title: string,
    url?: string
}

export interface IPostECommerceModel<T = string, P = string[]> {
    typeId: ProductTypeId
    images: string[]
    pricing?: IPostECommercePricingModel
    inventory?: IPostECommerceInventoryModel
    shipping?: IPostECommerceShippingModel
    attributes?: IPostECommerceAttributeModel<T, P>[]
    variations?: IPostECommerceVariationModel<T>[]
    variationDefaults?: IPostECommerceVariationSelectedModel<T>[]
}

export interface IPostECommercePricingModel {
    taxRate: number
    taxExcluded: number
    taxIncluded: number
    compared: number
    shipping: number
}

export interface IPostECommerceInventoryModel {
    sku: string
    isManageStock: boolean
    quantity: number
}

export interface IPostECommerceShippingModel {
    width: string
    height: string
    depth: string
    weight: string
}

export interface IPostECommerceAttributeModel<T = string, P = string[]> {
    _id?: string
    attributeId: T
    variations: P
    typeId: AttributeTypeId
}

export interface IPostECommerceVariationModel<T = string> {
    _id?: string
    rank: number
    selectedVariations: IPostECommerceVariationSelectedModel<T>[]
    images: string[]
    contents?: IPostECommerceVariationContentModel
    inventory: IPostECommerceInventoryModel
    shipping: IPostECommerceShippingModel
    pricing: IPostECommercePricingModel
    isWarningForIsThereOther?: boolean
    isDefault?: boolean
}

export interface IPostECommerceVariationSelectedModel<T = string> {
    _id?: string
    attributeId: T
    variationId: T
}

export interface IPostECommerceVariationContentModel {
    _id?: string
    langId: string
    image?: string
    content?: string,
    shortContent?: string,
}