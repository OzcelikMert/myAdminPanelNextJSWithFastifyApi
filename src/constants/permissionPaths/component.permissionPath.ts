import PagePaths from "../pagePaths";
import {PermissionId} from "../permissions";
import {PermissionPathDocument} from "types/constants/permissionPaths";
import {UserRoleId} from "../userRoles";

export default [
    {
        path: PagePaths.component().edit(undefined),
        permissionId: PermissionId.ComponentEdit
    },
    {
        path: PagePaths.component().add(),
        userRoleId: UserRoleId.SuperAdmin
    }
] as PermissionPathDocument[]