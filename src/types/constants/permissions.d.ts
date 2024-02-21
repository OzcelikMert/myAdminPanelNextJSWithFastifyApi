import {ILanguageKeys} from "../languages";
import {PermissionId} from "constants/permissions";
import {PermissionGroupId} from "constants/permissionGroups";
import {UserRoleId, UserRoleRank} from "constants/userRoles";

export interface IPermission {
    id: PermissionId,
    groupId: PermissionGroupId,
    minUserRoleId: UserRoleId,
    langKey: ILanguageKeys
}
