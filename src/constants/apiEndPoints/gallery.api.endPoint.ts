import { ApiEndPoints } from '@constants/apiEndPoints/index';
import { PathUtil } from '@utils/path.util';

export class GalleryApiEndPoint {
  private mainPath: string;

  constructor(mainPath = ApiEndPoints.GALLERY) {
    this.mainPath = mainPath;
  }

  get GET_IMAGE() {
    return PathUtil.createPath(this.mainPath, '/get/image');
  }
  get ADD_IMAGE() {
    return PathUtil.createPath(this.mainPath, '/add/image');
  }
  get DELETE_IMAGE() {
    return PathUtil.createPath(this.mainPath, '/delete/image');
  }
}
