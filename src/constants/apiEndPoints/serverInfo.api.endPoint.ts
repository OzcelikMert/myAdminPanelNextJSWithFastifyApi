import { ApiEndPoints } from '@constants/apiEndPoints/index';
import { PathUtil } from '@utils/path.util';

export class ServerInfoApiEndPoint {
  private mainPath: string;

  constructor(mainPath = ApiEndPoints.SERVER_INFO) {
    this.mainPath = mainPath;
  }

  get GET() {
    return PathUtil.createPath(this.mainPath, '/get');
  }
}
