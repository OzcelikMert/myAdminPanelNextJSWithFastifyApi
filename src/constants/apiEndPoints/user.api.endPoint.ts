import { ApiEndPoints } from '@constants/apiEndPoints/index';
import { PathUtil } from '@utils/path.util';

export class UserApiEndPoint {
  private mainPath: string;

  constructor(mainPath = ApiEndPoints.USER) {
    this.mainPath = mainPath;
  }

  get GET() {
    return PathUtil.createPath(this.mainPath, '/get');
  }
  GET_WITH_ID(_id: string) {
    return PathUtil.createPath(this.mainPath, `/get/${_id}`);
  }
  GET_WITH_URL(url: string) {
    return PathUtil.createPath(this.mainPath, `/get/url/${url}`);
  }
  get ADD() {
    return PathUtil.createPath(this.mainPath, '/add');
  }
  UPDATE_WITH_ID(_id: string) {
    return PathUtil.createPath(this.mainPath, `/update/${_id}`);
  }
  get UPDATE_PROFILE() {
    return PathUtil.createPath(this.mainPath, '/update/profile');
  }
  get UPDATE_PROFILE_IMAGE() {
    return PathUtil.createPath(this.mainPath, '/update/profile/image');
  }
  get UPDATE_PASSWORD() {
    return PathUtil.createPath(this.mainPath, '/update/password');
  }
  get DELETE() {
    return PathUtil.createPath(this.mainPath, '/delete');
  }
  DELETE_WITH_ID(_id: string) {
    return PathUtil.createPath(this.mainPath, `/delete/${_id}`);
  }
}
