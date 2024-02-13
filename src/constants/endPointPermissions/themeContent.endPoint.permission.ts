import {IEndPointPermission} from "types/constants/endPoint.permissions";
import {UserRoleId} from "constants/userRoles";
import {PostEndPointPermission} from "constants/endPointPermissions/post.endPoint.permission";

const sidebarNav: IEndPointPermission = {
    permissionId: [
        ...PostEndPointPermission.SIDEBAR_NAV_BLOG.permissionId,
        ...PostEndPointPermission.SIDEBAR_NAV_PORTFOLIO.permissionId,
        ...PostEndPointPermission.SIDEBAR_NAV_SLIDER.permissionId,
        ...PostEndPointPermission.SIDEBAR_NAV_REFERENCE.permissionId,
        ...PostEndPointPermission.SIDEBAR_NAV_SERVICE.permissionId,
        ...PostEndPointPermission.SIDEBAR_NAV_TESTIMONIAL.permissionId,
        ...PostEndPointPermission.SIDEBAR_NAV_BEFORE_AND_AFTER.permissionId
    ],
    minUserRoleId: UserRoleId.Author
}

export const ThemeContentEndPointPermission = {
    SIDEBAR_NAV: sidebarNav,
}