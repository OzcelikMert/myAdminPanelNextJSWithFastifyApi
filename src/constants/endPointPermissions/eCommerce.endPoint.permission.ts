import { IEndPointPermission } from 'types/constants/endPoint.permissions';
import { UserRoleId } from '@constants/userRoles';
import { PermissionId } from '@constants/permissions';

const settings: IEndPointPermission = {
  permissionId: [PermissionId.ECommerce],
  userRoleId: UserRoleId.Admin,
};

const get: IEndPointPermission = {
  permissionId: [PermissionId.ECommerce],
  userRoleId: UserRoleId.Author,
};

export const ECommerceEndPointPermission = {
  SETTINGS: settings,
  GET: get,
};
