import {
    SettingContactFormDocument,
    SettingDocument, SettingECommerceDocument,
    SettingSeoContentDocument, SettingSocialMediaDocument,
    SettingStaticLanguageContentDocument,
    SettingStaticLanguageDocument
} from "../models/setting";

export type SettingGetResultDocument = {
    seoContents?: SettingSeoContentDocument
    staticLanguages?: (Omit<SettingStaticLanguageDocument, "contents"> & { contents?: SettingStaticLanguageContentDocument })[]
} & Omit<SettingDocument, "seoContents" | "staticLanguages">

export type SettingGetParamDocument = {
    langId?: string
    getContactFormPasswords?: boolean
    projection?: "general" | "seo" | "eCommerce" | "contactForm" | "socialMedia" | "staticLanguage"
}

export type SettingUpdateGeneralParamDocument = {} & Omit<SettingDocument, "seoContents"|"contactForms"|"staticLanguages"|"socialMedia">

export type SettingUpdateSEOParamDocument = {
    seoContents: SettingSeoContentDocument
}

export type SettingUpdateECommerceParamDocument = {
    eCommerce: SettingECommerceDocument
}

export type SettingUpdateContactFormParamDocument = {
    contactForms: SettingContactFormDocument[]
}

export type SettingUpdateSocialMediaParamDocument = {
    socialMedia: SettingSocialMediaDocument[]
}

export type SettingUpdateStaticLanguageParamDocument = {
    staticLanguages: SettingStaticLanguageDocument[]
}