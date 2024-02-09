import {PermissionId} from "constants/permissions";
import {UserRoleId} from "constants/userRoles";

export interface EndPointPermissionDocument {
    permissionId: PermissionId[],
    minUserRoleId: UserRoleId
}

