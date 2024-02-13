import {IUserPopulateService} from "./user.service";
import {INavigationContentModel, INavigationModel} from "../models/navigation.model";
import {StatusId} from "constants/status";

export interface INavigatePopulateService {
    _id:  string
    contents: {
        langId: string
        title: string,
        url: string,
    }
}

export type INavigationGetResultService = {
    authorId: IUserPopulateService,
    lastAuthorId: IUserPopulateService,
    mainId?: INavigatePopulateService,
    contents?: INavigationContentModel
} & Omit<INavigationModel, "contents"|"mainId"|"authorId"|"lastAuthorId">

export interface INavigationGetOneParamService {
    _id: string
    langId?: string
    statusId?: StatusId
}

export interface INavigationGetManyParamService {
    _id?: string[]
    langId?: string
    statusId?: StatusId
    ignoreDefaultLanguage?: boolean
}

export type INavigationAddParamService = {} & Omit<INavigationModel, "_id"|"authorId"|"lastAuthorId">

export type INavigationUpdateOneParamService = {
    _id: string
} & Omit<INavigationAddParamService, "authorId">

export type INavigationUpdateOneRankParamService = {
    _id: string
    rank: number
}

export type INavigationUpdateManyStatusIdParamService = {
    _id: string[],
    statusId: StatusId
}

export interface INavigationDeleteManyParamService {
    _id: string[]
}