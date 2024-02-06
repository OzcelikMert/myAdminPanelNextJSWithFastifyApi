import {UserPopulateDocument} from "./user.service";
import {NavigationContentDocument, NavigationDocument} from "../models/navigation.model";
import {StatusId} from "constants/status";

export interface NavigatePopulateDocument {
    _id:  string
    contents: {
        langId: string
        title: string,
        url: string,
    }
}

export type NavigationGetResultDocument = {
    authorId: UserPopulateDocument,
    lastAuthorId: UserPopulateDocument,
    mainId?: NavigatePopulateDocument,
    contents?: NavigationContentDocument
} & Omit<NavigationDocument, "contents"|"mainId"|"authorId"|"lastAuthorId">

export interface NavigationGetOneParamDocument {
    _id: string
    langId?: string
    statusId?: StatusId
}

export interface NavigationGetManyParamDocument {
    _id?: string[]
    langId?: string
    statusId?: StatusId
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
    statusId: StatusId
}

export interface NavigationDeleteManyParamDocument {
    _id: string[]
}