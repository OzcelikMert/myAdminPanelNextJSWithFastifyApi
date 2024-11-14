import { IUserModel } from '../models/user.model';
import { StatusId } from '@constants/status';
import { UserRoleId } from '@constants/userRoles';
import { PermissionId } from '@constants/permissions';

export interface IUserPopulateService {
  _id: string;
  name: string;
  url: string;
  image: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
}

export type IUserGetResultService = {
  isOnline?: boolean;
} & IUserModel;

export interface IUserGetWithIdParamService {
  _id: string;
  statusId?: StatusId;
}

export interface IUserGetManyParamService {
  _id?: string[];
  statusId?: StatusId;
  email?: string;
  count?: number;
  page?: number;
  permissions?: PermissionId[];
}

export type IUserAddParamService = {
  roleId: UserRoleId;
  statusId: StatusId;
  name: string;
  email: string;
  password: string;
  permissions: PermissionId[];
  banDateEnd?: string;
  banComment?: string;
};

export type IUserUpdateWithIdParamService = {
  _id: string;
  password?: string;
} & Omit<IUserAddParamService, 'password'>;

export interface IUserUpdateProfileParamService {
  name: string;
  comment?: string;
  phone?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
}

export interface IUserUpdateProfileImageParamService {
  image: string;
}

export interface IUserUpdatePasswordParamService {
  password: string;
  newPassword: string;
}

export type IUserDeleteWithIdParamService = {
  _id: string;
};
