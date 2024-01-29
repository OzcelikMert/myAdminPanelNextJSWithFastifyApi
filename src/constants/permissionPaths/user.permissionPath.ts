import PagePaths from "../pagePaths";
import {PermissionId} from "../permissions";
import {PermissionPathDocument} from "types/constants/permissionPaths";
import {UserRoleId} from "../userRoles";

export default [
    {
        path: PagePaths.settings().user().add(),
        permissionId: PermissionId.UserAdd
    },
    {
        path: PagePaths.settings().user().edit(),
        permissionId: PermissionId.UserEdit
    },
] as PermissionPathDocument[]