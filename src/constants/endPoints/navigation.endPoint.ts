import { EndPoints } from '@constants/endPoints/index';
import { PathUtil } from '@utils/path.util';

export class NavigationEndPoint {
  private mainPath: string;

  constructor(mainPath = EndPoints.NAVIGATION) {
    this.mainPath = mainPath;
  }

  get ADD() {
    return PathUtil.createPath(this.mainPath, '/add');
  }
  EDIT(_id?: string) {
    return PathUtil.createPath(this.mainPath, `/edit/${_id ?? ':_id'}`);
  }
  get LIST() {
    return PathUtil.createPath(this.mainPath, '/list');
  }
}
