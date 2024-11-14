import { ApiEndPoints } from '@constants/apiEndPoints/index';
import { PathUtil } from '@utils/path.util';

export class NavigationApiEndPoint {
  private mainPath: string;

  constructor(mainPath = ApiEndPoints.NAVIGATION) {
    this.mainPath = mainPath;
  }

  get GET() {
    return PathUtil.createPath(this.mainPath, '/get');
  }
  GET_WITH_ID(_id: string) {
    return PathUtil.createPath(this.mainPath, `/get/${_id}`);
  }
  get ADD() {
    return PathUtil.createPath(this.mainPath, '/add');
  }
  UPDATE_WITH_ID(_id: string) {
    return PathUtil.createPath(this.mainPath, `/update/${_id}`);
  }
  UPDATE_RANK_WITH_ID(_id: string) {
    return PathUtil.createPath(this.mainPath, `/update/rank/${_id}`);
  }
  get UPDATE_STATUS() {
    return PathUtil.createPath(this.mainPath, '/update/status');
  }
  get DELETE() {
    return PathUtil.createPath(this.mainPath, '/delete');
  }
}
