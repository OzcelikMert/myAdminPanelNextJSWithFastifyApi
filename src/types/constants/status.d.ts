import { ILanguageKeys } from './languageKeys';
import { StatusId } from '@constants/status';

export interface IStatus {
  id: StatusId;
  rank: number;
  langKey: ILanguageKeys;
}
