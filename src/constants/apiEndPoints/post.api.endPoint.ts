import { ApiEndPoints } from '@constants/apiEndPoints/index';
import { PathUtil } from '@utils/path.util';

export class PostApiEndPoint {
  private mainPath: string;

  constructor(mainPath = ApiEndPoints.POST) {
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
  GET_PREV_NEXT_WITH_ID(_id: string) {
    return PathUtil.createPath(this.mainPath, `/get/prev-next/${_id}`);
  }
  get GET_COUNT() {
    return PathUtil.createPath(this.mainPath, '/get/count');
  }
  get ADD() {
    return PathUtil.createPath(this.mainPath, '/add');
  }
  get ADD_PRODUCT() {
    return PathUtil.createPath(this.mainPath, '/add/product');
  }
  UPDATE_WITH_ID(_id: string) {
    return PathUtil.createPath(this.mainPath, `/update/${_id}`);
  }
  UPDATE_PRODUCT_WITH_ID(_id: string) {
    return PathUtil.createPath(this.mainPath, `/update/product/${_id}`);
  }
  UPDATE_VIEW_WITH_ID(_id: string) {
    return PathUtil.createPath(this.mainPath, `/update/view/${_id}`);
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
  get DELETE_PRODUCT() {
    return PathUtil.createPath(this.mainPath, '/delete/product');
  }
}
