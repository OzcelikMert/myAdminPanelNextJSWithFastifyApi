import {EndPointPermissionDocument} from "types/constants/endPoint.permissions";
import {UserRoleId} from "constants/userRoles";
import {PermissionId} from "constants/permissions";

const sidebarNav: EndPointPermissionDocument = {
    permissionId: [PermissionId.ECommerce],
    minUserRoleId: UserRoleId.Author
}

const settings: EndPointPermissionDocument = {
    permissionId: [PermissionId.ECommerce],
    minUserRoleId: UserRoleId.Admin
}

export const ECommerceEndPointPermission = {
    SIDEBAR_NAV: sidebarNav,
    SETTINGS: settings
}