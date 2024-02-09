import {LanguageKeys} from "types/languages";
import {EndPointPermissionDocument} from "types/constants/endPoint.permissions";

export interface SideBarPath {
    path: string,
    maskPath?: string
    title: LanguageKeys,
    icon?: string,
    state?: string,
    subPaths?: SideBarPath[]
    permission?: EndPointPermissionDocument
}