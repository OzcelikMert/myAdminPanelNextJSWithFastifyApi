import PagePaths from "../pagePaths";
import {PermissionId} from "../permissions";
import {PermissionPathDocument} from "types/constants/permissionPaths";

export default [
    {
        path: PagePaths.gallery().upload(),
        permissionId: PermissionId.GalleryEdit
    }
] as PermissionPathDocument[]