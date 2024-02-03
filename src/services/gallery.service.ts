import {ApiEndPoints} from "constants/index";
import GalleryDocument, {GalleryDeleteParamDocument, GalleryAddParamDocument} from "types/services/gallery";
import {GalleryApiEndPoint} from "constants/apiEndPoints/gallery.api.endPoint";
import ApiRequest from "library/api/request";
import pathUtil from "utils/path.util";
import {ApiRequestParamDocument} from "library/types/api";

const get = () => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.GALLERY, GalleryApiEndPoint.GET_IMAGE]
    }).get<GalleryDocument[]>();
}

const add = (params: GalleryAddParamDocument, onUploadProgress: ApiRequestParamDocument["onUploadProgress"]) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.GALLERY, GalleryApiEndPoint.ADD_IMAGE],
        data: params,
        contentType: false,
        processData: false,
        onUploadProgress: onUploadProgress
    }).post();
}

const deleteMany = (params: GalleryDeleteParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.GALLERY, GalleryApiEndPoint.DELETE_IMAGE],
        data: params
    }).delete();
}

export default {
    get: get,
    add: add,
    deleteMany: deleteMany,
}