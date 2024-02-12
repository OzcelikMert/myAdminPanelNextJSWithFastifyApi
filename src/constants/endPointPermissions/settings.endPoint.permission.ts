import {PermissionId} from "../permissions";
import {UserRoleId} from "../userRoles";
import {EndPointPermissionDocument} from "types/constants/endPoint.permissions";

const updateGeneral: EndPointPermissionDocument = {
    permissionId: [PermissionId.SettingEdit],
    minUserRoleId: UserRoleId.Admin
}

const updateSEO: EndPointPermissionDocument = {
    permissionId: [PermissionId.SEOEdit],
    minUserRoleId: UserRoleId.Admin
}

const updateContactForm: EndPointPermissionDocument = {
    permissionId: [],
    minUserRoleId: UserRoleId.Admin
}

const updateStaticLanguage: EndPointPermissionDocument = {
    permissionId: [PermissionId.StaticLanguage],
    minUserRoleId: UserRoleId.Admin
}

const updateSocialMedia: EndPointPermissionDocument = {
    permissionId: [PermissionId.SettingEdit],
    minUserRoleId: UserRoleId.Admin
}

const sidebarNav: EndPointPermissionDocument = {
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