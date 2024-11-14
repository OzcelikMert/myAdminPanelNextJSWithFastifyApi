import { IPagePropCommon } from 'types/pageProps';
import { PostTypeId } from '@constants/postTypes';
import { PostTermTypeId } from '@constants/postTermTypes';

export interface IPostGetPageTitleParamUtil {
  t: IPagePropCommon['t'];
  postTypeId: PostTypeId;
  termTypeId?: PostTermTypeId;
}
