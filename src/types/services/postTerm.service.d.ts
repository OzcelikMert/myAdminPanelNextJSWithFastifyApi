import {UserPopulateDocument} from "./user.service";
import {PostTermContentDocument, PostTermDocument} from "../models/postTerm.model";
import {PostTermTypeId} from "constants/postTermTypes";
import {PostTypeId} from "constants/postTypes";
import {StatusId} from "constants/status";

export interface PostTermPopulateDocument {
    _id: string,
    typeId: number,
    contents: {
        langId: string,
        title?: string,
        image?: string
        url?: string
    }
}

export interface PostTermAlternateDocument {
    langId: string
    title?: string,
    url?: string
}

export type PostTermGetResultDocument = {
    authorId: UserPopulateDocument,
    lastAuthorId: UserPopulateDocument,
    mainId?: PostTermPopulateDocument,
    contents?: PostTermContentDocument
    alternates?: PostTermAlternateDocument[],
    postCount?: number
} & Omit<PostTermDocument, "contents"|"authorId"|"lastAuthorId"|"mainId">

export interface PostTermGetOneParamDocument {
    langId?: string
    _id?: string
    typeId: PostTermTypeId,
    postTypeId: PostTypeId,
    statusId?: StatusId,
    url?: string
    ignoreTermId?: string[]
}

export interface PostTermGetManyParamDocument {
    langId?: string
    _id?: string[]
    typeId?: PostTermTypeId[],
    postTypeId: PostTypeId,
    url?: string
    title?: string
    statusId?: StatusId,
    ignoreTermId?: string[],
    count?: number
    page?: number
    withPostCount?: boolean
    ignoreDefaultLanguage?: boolean
}

export type PostTermAddParamDocument = {} & Omit<PostTermDocument, "_id"|"lastAuthorId"|"authorId">

export type PostTermUpdateOneParamDocument = {
    _id: string,
} & Omit<PostTermAddParamDocument, "authorId">

export type PostTermUpdateOneRankParamDocument = {
    _id: string,
    postTypeId: PostTypeId,
    typeId: PostTermTypeId
    rank: number,
}

export type PostTermUpdateManyStatusIdParamDocument = {
    _id: string[],
    postTypeId: PostTypeId,
    typeId: PostTermTypeId
    statusId: number,
}

export interface PostTermDeleteManyParamDocument {
    _id: string[]
    typeId: PostTermTypeId,
    postTypeId: PostTypeId
}