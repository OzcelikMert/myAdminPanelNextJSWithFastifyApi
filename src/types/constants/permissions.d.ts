import {LanguageKeys} from "../languages";
import {PermissionId} from "constants/permissions";
import {PermissionGroupId} from "constants/permissionGroups";

export interface PermissionDocument {
    id: PermissionId,
    groupId: PermissionGroupId,
    defaultRoleRank: number,
    langKey: LanguageKeys
}
