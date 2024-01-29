import {CurrencyTypeDocument} from "types/constants/currencyTypes";

export enum CurrencyId {
    TurkishLira = 1,
    Dollar,
    Euro,
}

export const CurrencyTypes: Array<CurrencyTypeDocument> = [
    {id: CurrencyId.TurkishLira, title: "Turkish Lira", icon: "TL"},
    {id: CurrencyId.Dollar, title: "Dollar", icon: "$"},
    {id: CurrencyId.Euro, title: "Euro", icon: "€"},
]
