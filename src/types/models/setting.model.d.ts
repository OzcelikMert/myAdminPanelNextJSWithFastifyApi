import {CurrencyId} from "constants/currencyTypes";

export interface ISettingModel {
    defaultLangId: string
    icon?: string
    logo?: string
    logoTwo?: string
    head?: string
    script?: string
    seoContents: ISettingSeoContentModel,
    contact?: ISettingContactModel
    contactForms: ISettingContactFormModel[],
    staticLanguages: ISettingStaticLanguageModel[]
    socialMedia: ISettingSocialMediaModel[]
    eCommerce?: ISettingECommerceModel
}

export interface ISettingECommerceModel {
    currencyId: CurrencyId
}

export interface ISettingContactModel {
    email?: string,
    phone?: string,
    address?: string,
    addressMap?: string
}

export interface ISettingSocialMediaModel {
    _id?: string
    elementId: string
    title: string
    url: string
    isEditing?: boolean
}

export interface ISettingContactFormModel {
    _id?: string
    name: string
    key: string
    outGoingEmail: string
    email: string
    password?: string
    outGoingServer: string
    inComingServer: string
    port: number
    isEditing?: boolean
}

export interface ISettingSeoContentModel {
    _id?: string
    langId: string
    title?: string,
    content?: string,
    tags?: string[]
}

export interface ISettingStaticLanguageModel {
    _id?: string
    langKey: string,
    title: string
    contents: ISettingStaticLanguageContentModel
    isEditing?: boolean
}

export interface ISettingStaticLanguageContentModel {
    _id?: string
    langId: string
    content?: string,
}