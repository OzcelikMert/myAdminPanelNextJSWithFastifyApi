import {PermissionId} from "../permissions";
import {IEndPointPermission} from "types/constants/endPoint.permissions";
import {UserRoleId} from "../userRoles";

const add: IEndPointPermission = {
    permissionId: [PermissionId.UserAdd],
    minUserRoleId: UserRoleId.Editor
}

const update: IEndPointPermission = {
    permissionId: [PermissionId.UserEdit],
    minUserRoleId: UserRoleId.Editor
}

const remove: IEndPointPermission = {
    permissionId: [PermissionId.UserDelete],
    minUserRoleId: UserRoleId.Editor
}

const sidebarNav: IEndPointPermission = {
    permissionId: [PermissionId.UserAdd, PermissionId.UserEdit, PermissionId.UserDelete],
    minUserRoleId: UserRoleId.Editor
}

export const UserEndPointPermission = {
    ADD: add,
    UPDATE: update,
    DELETE: remove,
    SIDEBAR_NAV: sidebarNav
}