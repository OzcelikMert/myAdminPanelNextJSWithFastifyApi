import {PostECommercePricingDocument} from "types/models/post";
import {ProductTypeId} from "constants/productTypes";
import {CurrencyId, CurrencyTypes} from "constants/currencyTypes";
import {PostGetManyResultDocument} from "types/services/post";

export default {
    getCurrencyType(currencyId: CurrencyId = CurrencyId.TurkishLira) {
        return CurrencyTypes.findSingle("id", currencyId);
    },
    getPricingDefault(item: PostGetManyResultDocument) {
        let data: PostECommercePricingDocument = {
            taxRate: 0,
            taxExcluded: 0,
            shipping: 0,
            compared: 0,
            taxIncluded: 0
        }

        if(item.eCommerce){
            if(item.eCommerce.typeId == ProductTypeId.SimpleProduct){
                data = {
                    ...data,
                    ...item.eCommerce.pricing
                };
            }else if (item.eCommerce.typeId == ProductTypeId.VariableProduct) {
                if(item.eCommerce.variations && item.eCommerce.variations.length > 0){
                    let variation = item.eCommerce.variations[0];
                    data = {
                        ...data,
                        ...variation.pricing
                    }
                }
            }
        }

        return data;
    }
}