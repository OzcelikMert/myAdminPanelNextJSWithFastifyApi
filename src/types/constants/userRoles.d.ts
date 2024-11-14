import { ILanguageKeys } from './languageKeys';
import { UserRoleId } from '@constants/userRoles';

export interface IUserRole {
  id: UserRoleId;
  rank: number;
  langKey: ILanguageKeys;
}
