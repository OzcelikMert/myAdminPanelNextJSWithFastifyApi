import { CurrencyId } from '@constants/currencyTypes';

export interface ICurrencyType {
  id: CurrencyId;
  title: string;
  icon: string;
}
