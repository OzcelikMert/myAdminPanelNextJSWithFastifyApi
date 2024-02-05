import {UserPopulateDocument} from "./user.service";
import {NavigationContentDocument, NavigationDocument} from "../models/navigation.model";

export type NavigationGetResultDocument = {
    authorId: UserPopulateDocument,
    lastAuthorId: UserPopulateDocument,
    mainId?: {
        _id:  string
        contents: {
            langId: string
            title: string,
            url: string,
        }
    },
    contents?: NavigationContentDocument
} & Omit<NavigationDocument, "contents"|"mainId"|"authorId"|"lastAuthorId">

export interface NavigationGetOneParamDocument {
    _id: string
    langId?: string
    statusId?: number
}

export interface NavigationGetManyParamDocument {
    _id?: string[]
    langId?: string
    statusId?: number
    ignoreDefaultLanguage?: boolean
}

export type NavigationAddParamDocument = {} & Omit<NavigationDocument, "_id"|"authorId"|"lastAuthorId">

export type NavigationUpdateOneParamDocument = {
    _id: string
} & Omit<NavigationAddParamDocument, "authorId">

export type NavigationUpdateOneRankParamDocument = {
    _id: string
    rank: number
}

export type NavigationUpdateManyStatusIdParamDocument = {
    _id: string[],
    statusId: number
}

export interface NavigationDeleteManyParamDocument {
    _id: string[]
}