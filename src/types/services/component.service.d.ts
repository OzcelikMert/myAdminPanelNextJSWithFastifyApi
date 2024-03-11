import {IUserPopulateService} from "./user.service";
import {IComponentElementContentModel, IComponentElementModel, IComponentModel} from "types/models/component.model";

export type IComponentGetResultService = {
    authorId: IUserPopulateService,
    lastAuthorId: IUserPopulateService,
    elements: (Omit<IComponentElementModel, "contents"> & {
        contents?: IComponentElementContentModel
    })[]
} & Omit<IComponentModel, "elements"|"authorId"|"lastAuthorId">

export interface IComponentGetWithIdParamService {
    _id: string
    langId?: string
}

export interface IComponentGetWithElementIdParamService {
    elementId: string
    langId?: string
}

export interface IComponentGetManyParamService {
    _id?: string[]
    elementId?: string[]
    langId?: string
}

export type IComponentAddParamService = {} & Omit<IComponentModel, "_id"|"authorId"|"lastAuthorId">

export type IComponentUpdateWithIdParamService = {
    _id: string
} & Omit<IComponentAddParamService, "_id">

export interface IComponentDeleteManyParamService {
    _id: string[]
}