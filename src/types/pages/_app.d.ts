import {LanguageGetResultDocument} from "types/services/language.service";
import {CurrencyId} from "constants/currencyTypes";
import {SessionAuthDocument} from "types/models/sessionAuth.model";

type AppAdminGetState = {
    isAppLoading: boolean
    isPageLoading: boolean
    appData: {
        mainLangId: string
        contentLanguages: LanguageGetResultDocument[]
        currencyId: CurrencyId
    }
    pageData: {
        langId: string
    },
    sessionAuth: SessionAuthDocument
}

type AppAdminSetState = Partial<AppAdminGetState>

export {
    AppAdminGetState,
    AppAdminSetState
}