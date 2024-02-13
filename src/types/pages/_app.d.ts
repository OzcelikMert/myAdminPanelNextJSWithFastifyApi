import {ILanguageGetResultService} from "types/services/language.service";
import {CurrencyId} from "constants/currencyTypes";
import {ISessionAuthModel} from "types/models/sessionAuth.model";

export type IGetStateApp = {
    isAppLoading: boolean
    isPageLoading: boolean
    appData: IGetStateAppAppData
    pageData: IGetStateAppPageData,
    sessionAuth?: ISessionAuthModel
}

export type IGetStateAppAppData = {
    mainLangId: string
    contentLanguages: ILanguageGetResultService[]
    currencyId: CurrencyId
}

export type IGetStateAppPageData = {
    langId: string
}

export type ISetStateApp = {
    appData?: Partial<IGetStateAppAppData>
    pageData?: Partial<IGetStateAppPageData>
} & Partial<Omit<IGetStateApp, "appData"|"pageData">>