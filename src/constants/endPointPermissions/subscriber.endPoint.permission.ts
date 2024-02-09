import {PermissionId} from "../permissions";
import {UserRoleId} from "../userRoles";
import {EndPointPermissionDocument} from "types/constants/endPoint.permissions";

const sidebarNav: EndPointPermissionDocument = {
    permissionId: [PermissionId.SubscriberEdit],
    minUserRoleId: UserRoleId.Admin
}

export const SubscriberEndPointPermission = {
    SIDEBAR_NAV: sidebarNav
}