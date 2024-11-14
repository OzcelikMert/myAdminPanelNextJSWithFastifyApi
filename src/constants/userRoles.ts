import { IUserRole } from 'types/constants/userRoles';

export enum UserRoleId {
  User = 1,
  Author,
  Editor,
  Admin,
  SuperAdmin,
}

export const userRoles: Array<IUserRole> = [
  { id: UserRoleId.User, rank: 1, langKey: 'user' },
  { id: UserRoleId.Author, rank: 2, langKey: 'author' },
  { id: UserRoleId.Editor, rank: 3, langKey: 'editor' },
  { id: UserRoleId.Admin, rank: 4, langKey: 'admin' },
  { id: UserRoleId.SuperAdmin, rank: 5, langKey: 'superAdmin' },
];
