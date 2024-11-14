import { CurrencyId } from '@constants/currencyTypes';
import { ISessionAuthModel } from 'types/models/sessionAuth.model';
import { ILanguageGetResultService } from 'types/services/language.service';

export type IGetStateApp = {
  isAppLoading: boolean;
  isPageLoading: boolean;
  isRouteChanged: boolean;
  isLock: boolean;
  appData: IGetStateAppData;
  sessionAuth?: ISessionAuthModel;
};

export type IGetStateAppData = {
  mainLangId: string;
  currentLangId: string;
  contentLanguages: ILanguageGetResultService[];
  currencyId: CurrencyId;
};

export type ISetStateApp = {
  appData?: Partial<IGetStateAppData>;
} & Partial<Omit<IGetStateApp, 'appData'>>;
