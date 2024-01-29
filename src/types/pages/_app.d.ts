import {LanguageId, UserRoleId} from "constants/index";
import {LanguageGetResultDocument} from "types/services/language";
import {CurrencyId} from "constants/currencyTypes";

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
    sessionData: {
        id: string,
        langId: LanguageId,
        image: string,
        name: string,
        email: string,
        roleId: UserRoleId,
        permissions: number[]
    }
}

type AppAdminSetState = {
    isAppLoading?: boolean
    isPageLoading?: boolean
    appData?: {
        mainLangId?: string
        contentLanguages?: LanguageGetResultDocument[]
        currencyId?: CurrencyId
    }
    pageData?: {
        langId?: string
    }
    sessionData?: {
        id?: string,
        langId?: LanguageId,
        image?: string,
        name?: string,
        email?: string,
        roleId?: UserRoleId,
        permissions?: number[]
    }
}

export {
    AppAdminGetState,
    AppAdminSetState
}