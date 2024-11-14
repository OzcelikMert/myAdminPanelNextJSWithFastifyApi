import { PathUtil } from '@utils/path.util';
import { EndPoints } from '@constants/endPoints/index';

export class GalleryEndPoint {
  private mainPath: string;

  constructor(mainPath = EndPoints.GALLERY) {
    this.mainPath = mainPath;
  }

  get UPLOAD() {
    return PathUtil.createPath(this.mainPath, '/upload');
  }
  get LIST() {
    return PathUtil.createPath(this.mainPath, '/list');
  }
}
