import { UserRoleId } from '@constants/userRoles';

export interface ISessionAuthUserModel {
  userId: string;
  roleId: UserRoleId;
  email: string;
  name: string;
  image: string;
  ip: string;
  permissions: number[];
  createAt?: Date;
  updatedAt?: Date;
  refreshedAt?: Date;
}

export interface ISessionAuthModel {
  _id?: string;
  user: ISessionAuthUserModel;
}
