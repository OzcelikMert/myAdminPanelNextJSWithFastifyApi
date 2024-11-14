import { UserRoleId } from '../userRoles';
import { IEndPointPermission } from 'types/constants/endPoint.permissions';

const getFlags: IEndPointPermission = {
  permissionId: [],
  userRoleId: UserRoleId.SuperAdmin,
};

const add: IEndPointPermission = {
  permissionId: [],
  userRoleId: UserRoleId.SuperAdmin,
};

const update: IEndPointPermission = {
  permissionId: [],
  userRoleId: UserRoleId.SuperAdmin,
};

const remove: IEndPointPermission = {
  permissionId: [],
  userRoleId: UserRoleId.SuperAdmin,
};

const get: IEndPointPermission = {
  permissionId: [],
  userRoleId: UserRoleId.Admin,
};

export const LanguageEndPointPermission = {
  GET_FLAGS: getFlags,
  ADD: add,
  UPDATE: update,
  DELETE: remove,
  GET: get,
};
