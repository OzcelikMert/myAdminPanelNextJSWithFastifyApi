import {PermissionId} from "../permissions";
import {IEndPointPermission} from "types/constants/endPoint.permissions";
import {UserRoleId} from "../userRoles";

const add: IEndPointPermission = {
    permissionId: [PermissionId.NavigationAdd],
    minUserRoleId: UserRoleId.Editor
}

const update: IEndPointPermission = {
    permissionId: [PermissionId.NavigationEdit],
    minUserRoleId: UserRoleId.Editor
}

const remove: IEndPointPermission = {
    permissionId: [PermissionId.NavigationDelete],
    minUserRoleId: UserRoleId.Editor
}

const sidebarNav: IEndPointPermission = {
    permissionId: [PermissionId.NavigationAdd, PermissionId.NavigationEdit, PermissionId.NavigationDelete],
    minUserRoleId: UserRoleId.Editor
}

export const NavigationEndPointPermission = {
    ADD: add,
    UPDATE: update,
    DELETE: remove,
    SIDEBAR_NAV: sidebarNav
}