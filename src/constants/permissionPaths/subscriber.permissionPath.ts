import PagePaths from "../pagePaths";
import {PermissionId} from "../permissions";
import {PermissionPathDocument} from "types/constants/permissionPaths";
import {UserRoleId} from "../userRoles";

export default [
    {
        path: PagePaths.settings().subscribers(),
        permissionId: PermissionId.SubscriberEdit
    }
] as PermissionPathDocument[]