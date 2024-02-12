import {PermissionId} from "../permissions";
import {EndPointPermissionDocument} from "types/constants/endPoint.permissions";
import {UserRoleId} from "../userRoles";

const add: EndPointPermissionDocument = {
    permissionId: [PermissionId.UserAdd],
    minUserRoleId: UserRoleId.Editor
}

const update: EndPointPermissionDocument = {
    permissionId: [PermissionId.UserEdit],
    minUserRoleId: UserRoleId.Editor
}

const remove: EndPointPermissionDocument = {
    permissionId: [PermissionId.UserDelete],
    minUserRoleId: UserRoleId.Editor
}

const sidebarNav: EndPointPermissionDocument = {
    permissionId: [PermissionId.UserAdd, PermissionId.UserEdit, PermissionId.UserDelete],
    minUserRoleId: UserRoleId.Editor
}

export const UserEndPointPermission = {
    ADD: add,
    UPDATE: update,
    DELETE: remove,
    SIDEBAR_NAV: sidebarNav
}