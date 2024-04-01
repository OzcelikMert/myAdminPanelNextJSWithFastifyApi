import {
    ISettingContactFormModel,
    ISettingModel, ISettingECommerceModel,
    ISettingSeoContentModel, ISettingSocialMediaModel,
} from "../models/setting.model";
import {SettingProjectionKeys} from "constants/settingProjections";

export type ISettingGetResultService = {
    seoContents?: ISettingSeoContentModel
} & Omit<ISettingModel, "seoContents">

export type ISettingGetParamService = {
    langId?: string
    projection?: SettingProjectionKeys
}

export type ISettingUpdateGeneralParamService = {} & Omit<ISettingModel, "seoContents"|"contactForms"|"socialMedia">

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