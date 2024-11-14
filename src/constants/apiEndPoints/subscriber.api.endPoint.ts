import { ApiEndPoints } from '@constants/apiEndPoints/index';
import { PathUtil } from '@utils/path.util';

export class SubscriberApiEndPoint {
  private mainPath: string;

  constructor(mainPath = ApiEndPoints.SUBSCRIBER) {
    this.mainPath = mainPath;
  }

  get GET() {
    return PathUtil.createPath(this.mainPath, '/get');
  }
  GET_WITH_ID(_id: string) {
    return PathUtil.createPath(this.mainPath, `/get/${_id}`);
  }
  GET_WITH_EMAIL(email: string) {
    return PathUtil.createPath(this.mainPath, `/get/email/${email}`);
  }
  get ADD() {
    return PathUtil.createPath(this.mainPath, '/add');
  }
  UPDATE_WITH_ID(_id: string) {
    return PathUtil.createPath(this.mainPath, `/update/${_id}`);
  }
  get DELETE() {
    return PathUtil.createPath(this.mainPath, '/delete');
  }
  DELETE_WITH_ID(_id: string) {
    return PathUtil.createPath(this.mainPath, `/delete/${_id}`);
  }
  DELETE_WITH_EMAIL(email: string) {
    return PathUtil.createPath(this.mainPath, `/delete/email/${email}`);
  }
}
