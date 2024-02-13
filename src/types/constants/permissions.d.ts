import {ILanguageKeys} from "../languages";
import {PermissionId} from "constants/permissions";
import {PermissionGroupId} from "constants/permissionGroups";

export interface IPermission {
    id: PermissionId,
    groupId: PermissionGroupId,
    defaultRoleRank: number,
    langKey: ILanguageKeys
}
