import {CurrencyId} from "constants/currencyTypes";

export interface CurrencyTypeDocument {
    id: CurrencyId,
    title: string
    icon: string
}