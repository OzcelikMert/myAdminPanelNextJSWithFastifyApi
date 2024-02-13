import {ILanguageModel} from "../models/language.model";
import {StatusId} from "constants/status";

export type ILanguageGetResultService = {} & ILanguageModel

export interface ILanguageGetOneParamService {
    _id: string
    shortKey?: string
    locale?: string
}

export interface ILanguageGetOneParamService {
    _id?: string[]
    statusId?: StatusId
}

export type ILanguageAddParamService = {} & Omit<ILanguageModel, "_id">

export type ILanguageUpdateOneParamService = {
    _id: string
} & ILanguageAddParamService

export type ILanguageUpdateOneRankParamService = {
    _id: string
    rank: number
}