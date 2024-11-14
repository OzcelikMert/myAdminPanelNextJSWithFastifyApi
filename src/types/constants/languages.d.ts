import { LanguageId } from '@constants/languages';

export interface ILanguage {
  id: LanguageId;
  code: string;
  title: string;
  rank: number;
  image: string;
}
