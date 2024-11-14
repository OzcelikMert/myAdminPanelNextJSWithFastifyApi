import { PostTermTypeId } from '@constants/postTermTypes';
import { EndPoints } from '@constants/endPoints/index';
import { PathUtil } from '@utils/path.util';
import { PostTermEndPoint } from '@constants/endPoints/postTerm.endPoint';

export class PostEndPoint {
  private mainPath: string;

  constructor(mainPath = EndPoints.POST()) {
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
  TERM(typeId?: PostTermTypeId) {
    return PathUtil.createPath(
      this.mainPath,
      `/term/${typeId ?? ':termTypeId'}`
    );
  }
  TERM_WITH(typeId?: PostTermTypeId) {
    return new PostTermEndPoint(this.TERM(typeId));
  }
}
