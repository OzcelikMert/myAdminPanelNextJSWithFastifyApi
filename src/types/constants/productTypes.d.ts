import { ILanguageKeys } from './languageKeys';
import { ProductTypeId } from '@constants/productTypes';

export interface IProductType {
  id: ProductTypeId;
  rank: number;
  langKey: ILanguageKeys;
}
