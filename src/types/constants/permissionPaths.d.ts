import {PermissionId} from "constants/permissions";
import {UserRoleId} from "constants/userRoles";

export interface PermissionPathDocument {
    path: string,
    permissionId?: PermissionId,
    userRoleId?: UserRoleId
}


