import LanguageKeys from "types/languages";
import {PermissionId} from "constants/permissions";
import {UserRoleId} from "constants/userRoles";

export interface SideBarPath {
    path: string,
    title: LanguageKeys,
    icon?: string,
    state?: string,
    subPaths?: SideBarPath[]
    permId?: PermissionId | PermissionId[]
    roleId?: UserRoleId
}