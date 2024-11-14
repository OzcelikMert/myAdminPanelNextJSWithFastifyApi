import { PermissionId } from '../permissions';
import { UserRoleId } from '../userRoles';
import { IEndPointPermission } from 'types/constants/endPoint.permissions';

const get: IEndPointPermission = {
  permissionId: [PermissionId.SettingEdit],
  userRoleId: UserRoleId.Admin,
};

export const ServerInfoEndPointPermission = {
  GET: get,
};
