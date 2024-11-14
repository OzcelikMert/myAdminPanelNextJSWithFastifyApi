import { IProductType } from 'types/constants/productTypes';

export enum ProductTypeId {
  SimpleProduct = 1,
  VariableProduct,
  ExternalProduct,
}

export const productTypes: Array<IProductType> = [
  { id: ProductTypeId.SimpleProduct, rank: 1, langKey: 'simpleProduct' },
  { id: ProductTypeId.VariableProduct, rank: 2, langKey: 'variableProduct' },
];
