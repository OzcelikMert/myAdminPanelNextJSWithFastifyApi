import { PathUtil } from '@utils/path.util';
import { ApiEndPoints } from '@constants/apiEndPoints/index';

export class AuthApiEndPoint {
  private mainPath: string;

  constructor(mainPath = ApiEndPoints.AUTH) {
    this.mainPath = mainPath;
  }

  get GET() {
    return PathUtil.createPath(this.mainPath, '/get');
  }
  get LOGIN() {
    return PathUtil.createPath(this.mainPath, '/login');
  }
  get LOGOUT() {
    return PathUtil.createPath(this.mainPath, '/logout');
  }
}
