import { PathUtil } from '@utils/path.util';
import { EndPoints } from '@constants/endPoints/index';

export class PostTermEndPoint {
  private mainPath: string;

  constructor(mainPath = EndPoints.POST_WITH().TERM()) {
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
