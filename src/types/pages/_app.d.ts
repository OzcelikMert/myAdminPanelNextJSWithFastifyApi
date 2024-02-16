import {ILanguageGetResultService} from "types/services/language.service";
import {CurrencyId} from "constants/currencyTypes";
import {ISessionAuthModel} from "types/models/sessionAuth.model";

export type IGetStateApp = {
    isAppLoading: boolean
    isPageLoading: boolean
    appData: IGetStateAppData
    sessionAuth?: ISessionAuthModel
}

export type IGetStateAppData = {
    mainLangId: string
    currentLangId: string
    contentLanguages: ILanguageGetResultService[]
    currencyId: CurrencyId
}

export type ISetStateApp = {
    appData?: Partial<IGetStateAppData>
} & Partial<Omit<IGetStateApp, "appData">>