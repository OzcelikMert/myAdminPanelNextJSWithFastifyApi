import {PathUtil} from "utils/path.util";
import {ApiEndPoints} from "constants/apiEndPoints/index";

export class ComponentApiEndPoint {
    private mainPath: string;

    constructor(mainPath = ApiEndPoints.COMPONENT) {
        this.mainPath = mainPath;
    }

    get GET() { return PathUtil.createPath(this.mainPath, "/get"); }
    GET_WITH_ID(_id: string) { return PathUtil.createPath(this.mainPath, `/get/${_id}`); }
    GET_WITH_ELEMENT_ID(elementId: string) { return PathUtil.createPath(this.mainPath, `/get/element-id/${elementId}`); }
    get ADD() { return PathUtil.createPath(this.mainPath, "/add"); }
    UPDATE_WITH_ID(_id: string) { return PathUtil.createPath(this.mainPath, `/update/${_id}`); }
    get DELETE() { return PathUtil.createPath(this.mainPath, "/delete"); }
}