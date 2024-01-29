import {LanguageDocument} from "../models/language";

export type LanguageGetResultDocument = {} & LanguageDocument

export interface LanguageGetOneParamDocument {
    _id?: string
    shortKey?: string
    locale?: string
}

export interface LanguageGetManyParamDocument {
    _id?: string[]
    statusId?: number
}

export type LanguageAddParamDocument = {} & Omit<LanguageDocument, "_id">

export type LanguageUpdateOneParamDocument = {
    _id: string
} & LanguageAddParamDocument

export type LanguageUpdateOneRankParamDocument = {
    _id: string
    rank: number
}