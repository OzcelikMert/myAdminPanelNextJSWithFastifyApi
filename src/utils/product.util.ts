import { IPostECommercePricingModel } from 'types/models/post.model';
import { ProductTypeId } from '@constants/productTypes';
import { CurrencyId, currencyTypes } from '@constants/currencyTypes';
import { IPostGetManyResultService } from 'types/services/post.service';

const getCurrencyType = (currencyId: CurrencyId = CurrencyId.TurkishLira) => {
  return currencyTypes.findSingle('id', currencyId);
};

const getPricingDefault = (item: IPostGetManyResultService) => {
  let data: IPostECommercePricingModel = {
    taxRate: 0,
    taxExcluded: 0,
    shipping: 0,
    compared: 0,
    taxIncluded: 0,
  };

  if (item.eCommerce) {
    if (item.eCommerce.typeId == ProductTypeId.SimpleProduct) {
      data = {
        ...data,
        ...item.eCommerce.pricing,
      };
    } else if (item.eCommerce.typeId == ProductTypeId.VariableProduct) {
      if (item.eCommerce.variations && item.eCommerce.variations.length > 0) {
        const variation = item.eCommerce.variations[0];
        data = {
          ...data,
          ...variation.itemId.eCommerce.pricing,
        };
      }
    }
  }

  return data;
};

export const ProductUtil = {
  getCurrencyType: getCurrencyType,
  getPricingDefault: getPricingDefault,
};
