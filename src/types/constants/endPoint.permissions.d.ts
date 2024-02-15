import {PermissionId} from "constants/permissions";
import {UserRoleId} from "constants/userRoles";

export interface IEndPointPermission {
    path: string
    permissionId: PermissionId[],
    userRoleId: UserRoleId
}