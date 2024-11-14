import { PermissionId } from '../permissions';
import { IEndPointPermission } from 'types/constants/endPoint.permissions';
import { UserRoleId } from '../userRoles';

const add: IEndPointPermission = {
  permissionId: [PermissionId.UserAdd],
  userRoleId: UserRoleId.Editor,
};

const update: IEndPointPermission = {
  permissionId: [PermissionId.UserEdit],
  userRoleId: UserRoleId.Editor,
};

const remove: IEndPointPermission = {
  permissionId: [PermissionId.UserDelete],
  userRoleId: UserRoleId.Editor,
};

const get: IEndPointPermission = {
  permissionId: [
    PermissionId.UserAdd,
    PermissionId.UserEdit,
    PermissionId.UserDelete,
  ],
  userRoleId: UserRoleId.Editor,
};

export const UserEndPointPermission = {
  ADD: add,
  UPDATE: update,
  DELETE: remove,
  GET: get,
};
