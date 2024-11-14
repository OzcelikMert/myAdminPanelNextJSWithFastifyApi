import { PermissionId } from '../permissions';
import { IEndPointPermission } from 'types/constants/endPoint.permissions';
import { UserRoleId } from '../userRoles';

const add: IEndPointPermission = {
  permissionId: [PermissionId.NavigationAdd],
  userRoleId: UserRoleId.Editor,
};

const update: IEndPointPermission = {
  permissionId: [PermissionId.NavigationEdit],
  userRoleId: UserRoleId.Editor,
};

const remove: IEndPointPermission = {
  permissionId: [PermissionId.NavigationDelete],
  userRoleId: UserRoleId.Editor,
};

const get: IEndPointPermission = {
  permissionId: [
    PermissionId.NavigationAdd,
    PermissionId.NavigationEdit,
    PermissionId.NavigationDelete,
  ],
  userRoleId: UserRoleId.Editor,
};

export const NavigationEndPointPermission = {
  ADD: add,
  UPDATE: update,
  DELETE: remove,
  GET: get,
};
