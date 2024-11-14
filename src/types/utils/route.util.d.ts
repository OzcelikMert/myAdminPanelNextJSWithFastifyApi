import { IPagePropCommon } from 'types/pageProps';

export interface IRouteChangeParamUtil {
  props: IPagePropCommon;
  path: string;
  as?: string;
}
