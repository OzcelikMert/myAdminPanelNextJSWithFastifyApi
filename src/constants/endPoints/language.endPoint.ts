import { EndPoints } from '@constants/endPoints/index';
import { PathUtil } from '@utils/path.util';

export class LanguageEndPoint {
  private mainPath: string;

  constructor(mainPath = EndPoints.LANGUAGE) {
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
