import PagePaths from "../pagePaths";
import {PermissionId} from "../permissions";
import {PermissionPathDocument} from "types/constants/permissionPaths";
import {UserRoleId} from "../userRoles";

export default [
    {
        path: PagePaths.navigation().edit(undefined),
        permissionId: PermissionId.NavigationEdit
    },
    {
        path: PagePaths.navigation().add(),
        permissionId: PermissionId.NavigationAdd
    }
] as PermissionPathDocument[]