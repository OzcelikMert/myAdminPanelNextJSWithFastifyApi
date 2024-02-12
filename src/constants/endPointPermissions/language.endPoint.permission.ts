import {UserRoleId} from "../userRoles";
import {EndPointPermissionDocument} from "types/constants/endPoint.permissions";
import {PermissionId} from "constants/permissions";

const getFlags: EndPointPermissionDocument = {
    permissionId: [],
    minUserRoleId: UserRoleId.SuperAdmin
}

const add: EndPointPermissionDocument = {
    permissionId: [],
    minUserRoleId: UserRoleId.SuperAdmin
}

const update: EndPointPermissionDocument = {
    permissionId: [],
    minUserRoleId: UserRoleId.SuperAdmin
}

const remove: EndPointPermissionDocument = {
    permissionId: [],
    minUserRoleId: UserRoleId.SuperAdmin
}

const sidebarNav: EndPointPermissionDocument = {
    permissionId: [],
    minUserRoleId: UserRoleId.SuperAdmin
}

export const LanguageEndPointPermission = {
    GET_FLAGS: getFlags,
    ADD: add,
    UPDATE: update,
    DELETE: remove,
    SIDEBAR_NAV: sidebarNav,
}