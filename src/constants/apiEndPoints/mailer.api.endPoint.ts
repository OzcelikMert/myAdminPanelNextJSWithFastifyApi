import { ApiEndPoints } from '@constants/apiEndPoints/index';
import { PathUtil } from '@utils/path.util';

export class MailerApiEndPoint {
  private mainPath: string;

  constructor(mainPath = ApiEndPoints.MAILER) {
    this.mainPath = mainPath;
  }

  get SEND() {
    return PathUtil.createPath(this.mainPath, '/send');
  }
}
