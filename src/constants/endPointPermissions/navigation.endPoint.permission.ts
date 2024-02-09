import {PermissionId} from "../permissions";
import {EndPointPermissionDocument} from "types/constants/endPoint.permissions";
import {UserRoleId} from "../userRoles";

const add: EndPointPermissionDocument = {
    permissionId: [PermissionId.NavigationAdd],
    minUserRoleId: UserRoleId.Editor
}

const update: EndPointPermissionDocument = {
    permissionId: [PermissionId.NavigationEdit],
    minUserRoleId: UserRoleId.Editor
}

const sidebarNav: EndPointPermissionDocument = {
    permissionId: [PermissionId.NavigationAdd, PermissionId.NavigationEdit, PermissionId.NavigationDelete],
    minUserRoleId: UserRoleId.Editor
}

export const NavigationEndPointPermission = {
    ADD: add,
    UPDATE: update,
    SIDEBAR_NAV: sidebarNav
}