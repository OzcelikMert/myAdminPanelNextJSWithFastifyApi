import {ApiEndPoints} from "constants/apiEndPoints";
import {GalleryDeleteManyParamDocument, GalleryAddParamDocument, GalleryGetManyParamDocument} from "types/services/gallery.service";
import {GalleryApiEndPoint} from "constants/apiEndPoints/gallery.api.endPoint";
import ApiRequest from "library/api/request";
import pathUtil from "utils/path.util";
import {ApiRequestParamDocument} from "library/types/api";
import {GalleryDocument} from "types/models/gallery.model";

const get = (params: GalleryGetManyParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.GALLERY, GalleryApiEndPoint.GET_IMAGE],
        data: params
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

const deleteMany = (params: GalleryDeleteManyParamDocument) => {
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