import {ILanguageKeys} from "types/languages";
import {IEndPointPermission} from "types/constants/endPoint.permissions";

export interface ISidebarPath {
    path: string,
    maskPath?: string
    title: ILanguageKeys,
    icon?: string,
    state?: string,
    subPaths?: ISidebarPath[]
    permission?: IEndPointPermission
}