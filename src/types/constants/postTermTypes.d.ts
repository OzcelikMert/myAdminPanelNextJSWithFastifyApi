import { ILanguageKeys } from './languageKeys';
import { PostTermTypeId } from '@constants/postTermTypes';

export interface IPostTermType {
  id: PostTermTypeId;
  rank: number;
  langKey: ILanguageKeys;
}
