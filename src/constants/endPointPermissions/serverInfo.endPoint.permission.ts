import {PermissionId} from "../permissions";
import {UserRoleId} from "../userRoles";
import {EndPointPermissionDocument} from "types/constants/endPoint.permissions";

const get: EndPointPermissionDocument = {
    permissionId: [PermissionId.SettingEdit],
    minUserRoleId: UserRoleId.Admin
}

export const ServerInfoEndPointPermission = {
    GET: get
}