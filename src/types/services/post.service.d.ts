import {IUserPopulateService} from "./user.service";
import {IPostTermPopulateService} from "./postTerm.service";
import {
    IPostContentModel,
    IPostModel,
    IPostECommerceModel,
    IPostECommerceVariationContentModel,
    IPostECommerceVariationModel
} from "../models/post.model";
import {IComponentModel} from "../models/component.model";
import {PostTypeId} from "constants/postTypes";
import {PageTypeId} from "constants/pageTypes";
import {StatusId} from "constants/status";

export interface IPostAlternateService {
    langId: string
    title?: string,
    url?: string
}

export type IPostGetWithIdResultService = {
    authorId: IUserPopulateService,
    lastAuthorId: IUserPopulateService,
    views?: number,
    categories?: IPostTermPopulateService[]
    tags?: IPostTermPopulateService[]
    contents?: IPostContentModel
    components?: IComponentModel[],
    alternates?: IPostAlternateService[]
    eCommerce?: (Omit<IPostECommerceModel<IPostTermPopulateService, IPostTermPopulateService[]>, "variations"> & {
        variations?: (Omit<IPostECommerceVariationModel<IPostTermPopulateService>, "contents"> & {
            contents?: IPostECommerceVariationContentModel
        })[]
    })
} & Omit<IPostModel, "contents"|"categories"|"tags"|"components"|"eCommerce"|"authorId"|"lastAuthorId">

export type IPostGetManyResultService = {
    components?: IPostModel["components"]
    eCommerce?: (Omit<IPostECommerceModel, "variations"> & {
        variations?: (Omit<IPostECommerceVariationModel, "contents"> & {
            contents?: IPostECommerceVariationContentModel | IPostECommerceVariationContentModel[]
        })[]
    })
} & Omit<IPostGetWithIdResultService, "eCommerce"|"components">

export interface IPostGetWithIdParamService {
    typeId: PostTypeId,
    _id: string
    pageTypeId?: PageTypeId
    langId?: string
    statusId?: StatusId,
}

export interface IPostGetManyParamService {
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

export interface IPostGetCountParamService {
    typeId: PostTypeId
    statusId?: StatusId
    title?: string
    categories?: string[]
}

export type PostAddParamDocument = {} & Omit<IPostModel, "_id"|"views"|"authorId"|"lastAuthorId">

export type IPostUpdateWithIdParamService = {
    _id: string
} & PostAddParamDocument

export type IPostUpdateWithIdRankParamService = {
    _id: string
    typeId: PostTypeId
    rank: number
}

export type IPostUpdateWithIdViewParamService = {
    _id: string,
    typeId: PostTypeId
    langId: string
}

export type IPostUpdateManyStatusIdParamService = {
    _id: string[],
    typeId: PostTypeId
    statusId: StatusId,
}

export interface IPostDeleteManyParamService {
    _id: string[]
    typeId: PostTypeId
}