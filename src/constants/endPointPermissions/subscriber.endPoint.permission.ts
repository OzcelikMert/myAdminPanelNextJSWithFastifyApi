import { PermissionId } from '../permissions';
import { UserRoleId } from '../userRoles';
import { IEndPointPermission } from 'types/constants/endPoint.permissions';

const get: IEndPointPermission = {
  permissionId: [PermissionId.SubscriberEdit],
  userRoleId: UserRoleId.Admin,
};

const remove: IEndPointPermission = {
  permissionId: [PermissionId.SubscriberEdit],
  userRoleId: UserRoleId.Admin,
};

export const SubscriberEndPointPermission = {
  GET: get,
  DELETE: remove,
};
