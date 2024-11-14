import { ILanguageKeys } from 'types/constants/languageKeys';
import { IEndPointPermission } from 'types/constants/endPoint.permissions';

export interface ISidebarPath {
  path: string;
  maskPath?: string;
  title: ILanguageKeys;
  icon?: string;
  state?: string;
  subPaths?: ISidebarPath[];
  permission?: IEndPointPermission;
}
