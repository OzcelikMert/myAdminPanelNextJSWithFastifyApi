import {PostTypeId} from "constants/postTypes";
import {StatusId} from "constants/status";
import {PageTypeId} from "constants/pageTypes";
import {ProductTypeId} from "constants/productTypes";
import {AttributeTypeId} from "constants/attributeTypes";

export interface PostDocument {
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
    contents: PostContentDocument
    components?: string []
    beforeAndAfter?: PostBeforeAndAfterDocument
    eCommerce?: PostECommerceDocument
    updatedAt?: string
    createdAt?: string
}

export interface PostContentDocument {
    _id?: string
    langId: string
    image?: string
    icon?: string
    title?: string,
    content?: string,
    shortContent?: string,
    url?: string,
    views?: number,
    buttons?: PostContentButtonDocument[]
}

export interface PostBeforeAndAfterDocument {
    imageBefore: string
    imageAfter: string
    images: string[]
}

export interface PostContentButtonDocument {
    _id?: string
    title: string,
    url?: string
}

export interface PostECommerceDocument<T = string, P = string[]> {
    typeId: ProductTypeId
    images: string[]
    pricing?: PostECommercePricingDocument
    inventory?: PostECommerceInventoryDocument
    shipping?: PostECommerceShippingDocument
    attributes?: PostECommerceAttributeDocument<T, P>[]
    variations?: PostECommerceVariationDocument<T>[]
    variationDefaults?: PostECommerceVariationSelectedDocument<T>[]
}

export interface PostECommercePricingDocument {
    taxRate: number
    taxExcluded: number
    taxIncluded: number
    compared: number
    shipping: number
}

export interface PostECommerceInventoryDocument {
    sku: string
    isManageStock: boolean
    quantity: number
}

export interface PostECommerceShippingDocument {
    width: string
    height: string
    depth: string
    weight: string
}

export interface PostECommerceAttributeDocument<T = string, P = string[]> {
    _id?: string
    attributeId: T
    variations: P
    typeId: AttributeTypeId
}

export interface PostECommerceVariationDocument<T = string> {
    _id?: string
    rank: number
    selectedVariations: PostECommerceVariationSelectedDocument<T>[]
    images: string[]
    contents?: PostECommerceVariationContentDocument
    inventory: PostECommerceInventoryDocument
    shipping: PostECommerceShippingDocument
    pricing: PostECommercePricingDocument
    isWarningForIsThereOther?: boolean
    isDefault?: boolean
}

export interface PostECommerceVariationSelectedDocument<T = string> {
    _id?: string
    attributeId: T
    variationId: T
}

export interface PostECommerceVariationContentDocument {
    _id?: string
    langId: string
    image?: string
    content?: string,
    shortContent?: string,
}