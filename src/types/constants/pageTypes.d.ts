import { PageTypeId } from '@constants/pageTypes';
import { ILanguageKeys } from './languageKeys';

export interface IPageType {
  id: PageTypeId;
  rank: number;
  langKey: ILanguageKeys;
}
