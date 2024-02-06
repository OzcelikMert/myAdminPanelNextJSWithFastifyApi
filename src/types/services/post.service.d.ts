import {UserPopulateDocument} from "./user.service";
import {PostTermPopulateDocument} from "./postTerm.service";
import {
    PostContentDocument,
    PostDocument,
    PostECommerceDocument,
    PostECommerceVariationContentDocument,
    PostECommerceVariationDocument
} from "../models/post.model";
import {ComponentDocument} from "../models/component.model";
import {PostTypeId} from "constants/postTypes";
import {PageTypeId} from "constants/pageTypes";
import {StatusId} from "constants/status";

export interface PostAlternateDocument {
    langId: string
    title?: string,
    url?: string
}

export type PostGetOneResultDocument = {
    authorId: UserPopulateDocument,
    lastAuthorId: UserPopulateDocument,
    views?: number,
    categories?: PostTermPopulateDocument[]
    tags?: PostTermPopulateDocument[]
    contents?: PostContentDocument
    components?: ComponentDocument[],
    alternates?: PostAlternateDocument[]
    eCommerce?: (Omit<PostECommerceDocument<PostTermPopulateDocument, PostTermPopulateDocument[]>, "variations"> & {
        variations?: (Omit<PostECommerceVariationDocument<PostTermPopulateDocument>, "contents"> & {
            contents?: PostECommerceVariationContentDocument
        })[]
    })
} & Omit<PostDocument, "contents"|"categories"|"tags"|"components"|"eCommerce"|"authorId"|"lastAuthorId">

export type PostGetManyResultDocument = {
    components?: PostDocument["components"]
    eCommerce?: (Omit<PostECommerceDocument, "variations"> & {
        variations?: (Omit<PostECommerceVariationDocument, "contents"> & {
            contents?: PostECommerceVariationContentDocument | PostECommerceVariationContentDocument[]
        })[]
    })
} & Omit<PostGetOneResultDocument, "eCommerce"|"components">

export interface PostGetOneParamDocument {
    typeId: PostTypeId,
    _id: string
    pageTypeId?: PageTypeId
    langId?: string
    statusId?: StatusId,
}

export interface PostGetManyParamDocument {
    _id?: string[]
    isRecent?: boolean
    typeId?: PostTypeId[],
    pageTypeId?: PageTypeId[]
    langId?: string
    statusId?: StatusId,
    count?: number,
    page?: number
    ignorePostId?: string[]
    title?: string
    ignoreDefaultLanguage?: boolean
    categories?: string[]
}

export interface PostGetCountParamDocument {
    typeId: PostTypeId
    statusId?: StatusId
    title?: string
    categories?: string[]
}

export type PostAddParamDocument = {} & Omit<PostDocument, "_id"|"views"|"authorId"|"lastAuthorId">

export type PostUpdateOneParamDocument = {
    _id: string
} & PostAddParamDocument

export type PostUpdateOneRankParamDocument = {
    _id: string
    typeId: PostTypeId
    rank: number
}

export type PostUpdateOneViewParamDocument = {
    _id: string,
    typeId: PostTypeId
    langId: string
}

export type PostUpdateManyStatusIdParamDocument = {
    _id: string[],
    typeId: PostTypeId
    statusId: StatusId,
}

export interface PostDeleteManyParamDocument {
    _id: string[]
    typeId: PostTypeId
}