import {ILanguageKeys} from "./languages";
import {IAppGetState, IAppSetState} from "./pages/_app";
import {AppProps} from "next/app";

export interface IPagePropCommon {
    router: AppProps["router"],
    t: (key: ILanguageKeys) => string
    setBreadCrumb: (titles: string[]) => void
    setStateApp: (data: IAppSetState, callBack?: () => void) => void
    getStateApp: IAppGetState
}