import {
    ISettingContactFormModel,
    ISettingModel, ISettingECommerceModel,
    ISettingSeoContentModel, ISettingSocialMediaModel,
    ISettingStaticLanguageContentModel,
    ISettingStaticLanguageModel
} from "../models/setting.model";
import {SettingProjectionKeys} from "constants/settingProjections";

export type ISettingGetResultService = {
    seoContents?: ISettingSeoContentModel
    staticLanguages?: (Omit<ISettingStaticLanguageModel, "contents"> & { contents?: ISettingStaticLanguageContentModel })[]
} & Omit<ISettingModel, "seoContents" | "staticLanguages">

export type ISettingGetParamService = {
    langId?: string
    projection?: SettingProjectionKeys
}

export type ISettingUpdateGeneralParamService = {} & Omit<ISettingModel, "seoContents"|"contactForms"|"staticLanguages"|"socialMedia">

export type ISettingUpdateSEOParamService = {
    seoContents: ISettingSeoContentModel
}

export type ISettingUpdateECommerceParamService = {
    eCommerce: ISettingECommerceModel
}

export type ISettingUpdateContactFormParamService = {
    contactForms: ISettingContactFormModel[]
}

export type ISettingUpdateSocialMediaParamService = {
    socialMedia: ISettingSocialMediaModel[]
}

export type ISettingUpdateStaticLanguageParamService = {
    staticLanguages: ISettingStaticLanguageModel[]
}