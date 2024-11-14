import { ILanguageKeys } from './languageKeys';
import { AttributeTypeId } from '@constants/attributeTypes';

export interface IAttributeType {
  id: AttributeTypeId;
  rank: number;
  langKey: ILanguageKeys;
}
