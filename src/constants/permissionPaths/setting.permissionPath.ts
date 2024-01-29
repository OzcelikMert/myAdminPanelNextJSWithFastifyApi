import PagePaths from "../pagePaths";
import {PermissionId} from "../permissions";
import {PermissionPathDocument} from "types/constants/permissionPaths";
import {UserRoleId} from "../userRoles";

export default [
    {
        path: PagePaths.settings().seo(),
        permissionId: PermissionId.SeoEdit
    },
    {
        path: PagePaths.settings().general(),
        permissionId: PermissionId.SettingEdit
    },
    {
        path: PagePaths.settings().contactForms(),
        userRoleId: UserRoleId.Admin
    },
    {
        path: PagePaths.settings().staticLanguages(),
        permissionId: PermissionId.StaticLanguage
    },
    {
        path: PagePaths.settings().socialMedia(),
        permissionId: PermissionId.SettingEdit
    },
    {
        path: PagePaths.eCommerce().settings(),
        userRoleId: UserRoleId.Admin
    }
] as PermissionPathDocument[]