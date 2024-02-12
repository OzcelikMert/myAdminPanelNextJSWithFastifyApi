import {PermissionId} from "../permissions";
import {UserRoleId} from "../userRoles";
import {EndPointPermissionDocument} from "types/constants/endPoint.permissions";

const get: EndPointPermissionDocument = {
    permissionId: [ PermissionId.SubscriberEdit],
    minUserRoleId: UserRoleId.Admin
}

const remove: EndPointPermissionDocument = {
    permissionId: [PermissionId.SubscriberEdit],
    minUserRoleId: UserRoleId.Admin
}

const sidebarNav: EndPointPermissionDocument = {
    permissionId: [PermissionId.SubscriberEdit],
    minUserRoleId: UserRoleId.Admin
}

export const SubscriberEndPointPermission = {
    GET: get,
    DELETE: remove,
    SIDEBAR_NAV: sidebarNav
}