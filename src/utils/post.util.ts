import { PostTypeId, postTypes } from '@constants/postTypes';
import { IPostGetPageTitleParamUtil } from 'types/utils/post.util';
import { postTermTypes } from '@constants/postTermTypes';
import { EndPoints } from '@constants/endPoints';
import { PathUtil } from '@utils/path.util';
import { PostEndPoint } from '@constants/endPoints/post.endPoint';

const getPagePath = (postTypeId: PostTypeId) => {
  let pagePath = '';

  if ([PostTypeId.Page].includes(postTypeId)) {
    pagePath = EndPoints.POST(postTypeId);
  } else if ([PostTypeId.Product].includes(postTypeId)) {
    pagePath = PathUtil.createPath(
      EndPoints.ECOMMERCE,
      EndPoints.POST(postTypeId)
    );
  } else {
    pagePath = PathUtil.createPath(
      EndPoints.THEME_CONTENT,
      EndPoints.POST(postTypeId)
    );
  }

  return new PostEndPoint(pagePath);
};

const getPageTitles = (params: IPostGetPageTitleParamUtil) => {
  let titles: string[] = [
    params.t(
      postTypes.findSingle('id', params.postTypeId)?.langKey ?? '[noLangAdd]'
    ),
  ];

  if (params.termTypeId) {
    titles = [
      ...titles,
      params.t(
        postTermTypes.findSingle('id', params.termTypeId)?.langKey ??
          '[noLangAdd]'
      ),
    ];
  }

  if (params.postTypeId == PostTypeId.Product) {
    titles = [params.t('eCommerce'), ...titles];
  } else if (
    ![PostTypeId.Page, PostTypeId.Product].includes(params.postTypeId)
  ) {
    titles = [params.t('themeContents'), ...titles];
  }

  return titles;
};

export const PostUtil = {
  getPagePath: getPagePath,
  getPageTitles: getPageTitles,
};
