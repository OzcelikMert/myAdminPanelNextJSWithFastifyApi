import { ILanguageKeys } from './constants/languageKeys';
import { IGetStateApp, ISetStateApp } from './pages/_app';
import { AppProps } from 'next/app';

export interface IPagePropCommon {
  router: AppProps['router'];
  t: (key: ILanguageKeys) => string;
  setBreadCrumb: (titles: string[]) => void;
  setStateApp: (data: ISetStateApp, callBack?: () => void) => void;
  getStateApp: IGetStateApp;
}
