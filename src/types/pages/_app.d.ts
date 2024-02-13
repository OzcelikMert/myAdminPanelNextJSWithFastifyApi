import {ILanguageGetResultService} from "types/services/language.service";
import {CurrencyId} from "constants/currencyTypes";
import {ISessionAuthModel} from "types/models/sessionAuth.model";

type IAppGetState = {
    isAppLoading: boolean
    isPageLoading: boolean
    appData: {
        mainLangId: string
        contentLanguages: ILanguageGetResultService[]
        currencyId: CurrencyId
    }
    pageData: {
        langId: string
    },
    sessionAuth?: ISessionAuthModel
}

type IAppSetState = Partial<IAppGetState>

export {
    IAppGetState,
    IAppSetState
}