import {PermissionId} from "../permissions";
import {UserRoleId} from "../userRoles";
import {IEndPointPermission} from "types/constants/endPoint.permissions";

const updateGeneral: IEndPointPermission = {
    permissionId: [PermissionId.SettingEdit],
    minUserRoleId: UserRoleId.Admin
}

const updateSEO: IEndPointPermission = {
    permissionId: [PermissionId.SEOEdit],
    minUserRoleId: UserRoleId.Admin
}

const updateContactForm: IEndPointPermission = {
    permissionId: [],
    minUserRoleId: UserRoleId.Admin
}

const updateStaticLanguage: IEndPointPermission = {
    permissionId: [PermissionId.StaticLanguage],
    minUserRoleId: UserRoleId.Admin
}

const updateSocialMedia: IEndPointPermission = {
    permissionId: [PermissionId.SettingEdit],
    minUserRoleId: UserRoleId.Admin
}

const sidebarNav: IEndPointPermission = {
    permissionId: [
        ...updateGeneral.permissionId,
        ...updateSEO.permissionId,
        ...updateContactForm.permissionId,
        ...updateStaticLanguage.permissionId,
        ...updateSocialMedia.permissionId
    ],
    minUserRoleId: UserRoleId.Admin
}

export const SettingsEndPointPermission = {
    UPDATE_GENERAL: updateGeneral,
    UPDATE_SEO: updateSEO,
    UPDATE_CONTACT_FORM: updateContactForm,
    UPDATE_STATIC_LANGUAGE: updateStaticLanguage,
    UPDATE_SOCIAL_MEDIA: updateSocialMedia,
    SIDEBAR_NAV: sidebarNav,
}