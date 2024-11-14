import { EndPoints } from '@constants/endPoints/index';
import { PathUtil } from '@utils/path.util';
import { PostTypeId } from '@constants/postTypes';
import { PostEndPoint } from '@constants/endPoints/post.endPoint';

export class ECommerceEndPoint {
  private mainPath: string;

  constructor(mainPath = EndPoints.ECOMMERCE) {
    this.mainPath = mainPath;
  }

  get SETTINGS() {
    return PathUtil.createPath(this.mainPath, '/settings');
  }

  get PRODUCT() {
    return PathUtil.createPath(
      this.mainPath,
      EndPoints.POST(PostTypeId.Product)
    );
  }
  get PRODUCT_WITH() {
    return new PostEndPoint(this.PRODUCT);
  }
}
