import PagePaths from "../pagePaths";
import {PermissionId} from "../permissions";
import {PermissionPathDocument} from "types/constants/permissionPaths";
import {UserRoleId} from "../userRoles";

export default [
    {
        path: PagePaths.settings().language().list(),
        userRoleId: UserRoleId.SuperAdmin
    },
    {
        path: PagePaths.settings().language().add(),
        userRoleId: UserRoleId.SuperAdmin
    },
    {
        path: PagePaths.settings().language().edit(),
        userRoleId: UserRoleId.SuperAdmin
    },
] as PermissionPathDocument[]