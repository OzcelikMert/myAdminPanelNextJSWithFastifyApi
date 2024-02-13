import {UserRoleId} from "../userRoles";
import {PermissionId} from "../permissions";
import {IEndPointPermission} from "types/constants/endPoint.permissions";

const add: IEndPointPermission = {
    permissionId: [],
    minUserRoleId: UserRoleId.SuperAdmin
}

const update: IEndPointPermission = {
    permissionId: [PermissionId.ComponentEdit],
    minUserRoleId: UserRoleId.Editor
}

const sidebarNav: IEndPointPermission = {
    permissionId: [PermissionId.ComponentEdit],
    minUserRoleId: UserRoleId.SuperAdmin
}

const remove: IEndPointPermission = {
    permissionId: [],
    minUserRoleId: UserRoleId.SuperAdmin
}

export const ComponentEndPointPermission = {
    SIDEBAR_NAV: sidebarNav,
    ADD: add,
    UPDATE: update,
    DELETE: remove
}