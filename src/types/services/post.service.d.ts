import {IUserPopulateService} from "./user.service";
import {IPostTermPopulateService} from "./postTerm.service";
import {
    IPostContentModel,
    IPostModel,
    IPostECommerceModel,
    IPostECommerceVariationContentModel,
    IPostECommerceVariationModel
} from "../models/post.model";
import {PostTypeId} from "constants/postTypes";
import {PageTypeId} from "constants/pageTypes";
import {StatusId} from "constants/status";

export interface IPostAlternateService {
    langId: string
    title?: string,
    url?: string
}

export type IPostGetOneResultService = {
    authorId: IUserPopulateService,
    lastAuthorId: IUserPopulateService,
    views?: number,
    categories?: IPostTermPopulateService[]
    tags?: IPostTermPopulateService[]
    contents?: IPostContentModel
    alternates?: IPostAlternateService[]
    eCommerce?: (Omit<IPostECommerceModel<IPostTermPopulateService, IPostTermPopulateService[]>, "variations"> & {
        variations?: (Omit<IPostECommerceVariationModel<IPostTermPopulateService>, "contents"> & {
            contents?: IPostECommerceVariationContentModel
        })[]
    })
} & Omit<IPostModel, "contents"|"categories"|"tags"|"eCommerce"|"authorId"|"lastAuthorId">

export type IPostGetManyResultService = {
    eCommerce?: (Omit<IPostECommerceModel, "variations"> & {
        variations?: (Omit<IPostECommerceVariationModel, "contents"> & {
            contents?: IPostECommerceVariationContentModel | IPostECommerceVariationContentModel[]
        })[]
    })
} & Omit<IPostGetOneResultService, "eCommerce">

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

export type IPostAddParamService = {} & Omit<IPostModel, "_id"|"views"|"authorId"|"lastAuthorId">

export type IPostUpdateWithIdParamService = {
    _id: string
} & IPostAddParamService

export type IPostUpdateRankWithIdParamService = {
    _id: string
    typeId: PostTypeId
    rank: number
}

export type IPostUpdateViewWithIdParamService = {
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