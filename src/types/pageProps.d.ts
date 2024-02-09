import {LanguageKeys} from "./languages";
import {AppAdminGetState, AppAdminSetState} from "./pages/_app";
import {AppProps} from "next/app";

export interface PagePropCommonDocument {
    router: AppProps["router"],
    t: (key: LanguageKeys) => string
    setBreadCrumb: (titles: string[]) => void
    setStateApp: (data: AppAdminSetState, callBack?: () => void) => void
    getStateApp: AppAdminGetState
}