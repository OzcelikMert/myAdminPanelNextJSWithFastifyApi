import {ILanguageKeys} from "../languages";
import {ProductTypeId} from "constants/productTypes";

export interface IProductType {
    id: ProductTypeId,
    rank: number,
    langKey: ILanguageKeys
}