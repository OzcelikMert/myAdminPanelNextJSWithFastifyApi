import { PermissionId } from '../permissions';
import { UserRoleId } from '../userRoles';
import { IEndPointPermission } from 'types/constants/endPoint.permissions';

const updateGeneral: IEndPointPermission = {
  permissionId: [PermissionId.SettingEdit],
  userRoleId: UserRoleId.Admin,
};

const updateSEO: IEndPointPermission = {
  permissionId: [PermissionId.SEOEdit],
  userRoleId: UserRoleId.Admin,
};

const updateContactForm: IEndPointPermission = {
  permissionId: [],
  userRoleId: UserRoleId.Admin,
};

const updateSocialMedia: IEndPointPermission = {
  permissionId: [PermissionId.SettingEdit],
  userRoleId: UserRoleId.Admin,
};

const updatePath: IEndPointPermission = {
  permissionId: [],
  userRoleId: UserRoleId.SuperAdmin,
};

const get: IEndPointPermission = {
  permissionId: [
    ...updateGeneral.permissionId,
    ...updateSEO.permissionId,
    ...updateContactForm.permissionId,
    ...updateSocialMedia.permissionId,
    ...updatePath.permissionId,
  ],
  userRoleId: UserRoleId.Admin,
};

export const SettingsEndPointPermission = {
  UPDATE_GENERAL: updateGeneral,
  UPDATE_SEO: updateSEO,
  UPDATE_CONTACT_FORM: updateContactForm,
  UPDATE_SOCIAL_MEDIA: updateSocialMedia,
  UPDATE_PATH: updatePath,
  GET: get,
};
