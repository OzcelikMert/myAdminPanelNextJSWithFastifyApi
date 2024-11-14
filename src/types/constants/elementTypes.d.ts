import { ILanguageKeys } from './languageKeys';
import { ElementTypeId } from '@constants/elementTypes';

export interface IElementType {
  id: ElementTypeId;
  langKey: ILanguageKeys;
}
