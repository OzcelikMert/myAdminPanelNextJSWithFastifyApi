import { ApiEndPoints } from '@constants/apiEndPoints/index';
import { PathUtil } from '@utils/path.util';

export class SitemapApiEndPoint {
  private mainPath: string;

  constructor(mainPath = ApiEndPoints.SITEMAP) {
    this.mainPath = mainPath;
  }

  get GET_MAPS() {
    return PathUtil.createPath(this.mainPath, '/get/maps');
  }
  get GET_POST() {
    return PathUtil.createPath(this.mainPath, '/get/post');
  }
  get GET_POST_TERM() {
    return PathUtil.createPath(this.mainPath, '/get/post-term');
  }
}
