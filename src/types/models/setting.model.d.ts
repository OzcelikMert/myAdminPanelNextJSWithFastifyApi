import {CurrencyId} from "@constants/currencyTypes";

export interface ISettingModel {
    icon?: string
    logo?: string
    logoTwo?: string
    head?: string
    script?: string
    seoContents?: ISettingSeoContentModel,
    contact?: ISettingContactModel
    contactForms?: ISettingContactFormModel[],
    socialMedia?: ISettingSocialMediaModel[]
    eCommerce?: ISettingECommerceModel
    paths?: ISettingPathModel[]
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
    key: string
    title: string
    url: string
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
}

export interface ISettingSeoContentModel {
    _id?: string
    langId: string
    title?: string,
    content?: string,
    tags?: string[]
}

export interface ISettingPathModel {
    _id?: string
    title: string
    key: string
    path: string
    contents: ISettingPathContentModel
}

export interface ISettingPathContentModel {
    _id?: string
    langId: string
    asPath: string,
}