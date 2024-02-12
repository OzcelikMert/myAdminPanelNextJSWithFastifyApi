import {EndPointPermissionDocument} from "types/constants/endPoint.permissions";
import {UserRoleId} from "constants/userRoles";
import {PermissionId} from "constants/permissions";

const settings: EndPointPermissionDocument = {
    permissionId: [PermissionId.ECommerce],
    minUserRoleId: UserRoleId.Admin
}

const sidebarNav: EndPointPermissionDocument = {
    permissionId: [PermissionId.ECommerce],
    minUserRoleId: UserRoleId.Author
}

export const ECommerceEndPointPermission = {
    SETTINGS: settings,
    SIDEBAR_NAV: sidebarNav,
}