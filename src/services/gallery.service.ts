import {ApiEndPoints} from "constants/apiEndPoints";
import {IGalleryDeleteManyParamService, IGalleryAddParamService, IGalleryGetManyParamService} from "types/services/gallery.service";
import ApiRequest from "library/api/request";
import {PathUtil} from "utils/path.util";
import {ApiRequestParamDocument} from "library/types/api";
import {IGalleryModel} from "types/models/gallery.model";

const get = (params: IGalleryGetManyParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.GALLERY_WITH.GET_IMAGE,
        data: params
    }).get<IGalleryModel[]>();
}

const add = (params: IGalleryAddParamService, onUploadProgress: ApiRequestParamDocument["onUploadProgress"]) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.GALLERY_WITH.ADD_IMAGE,
        data: params,
        contentType: false,
        processData: false,
        onUploadProgress: onUploadProgress
    }).post();
}

const deleteMany = (params: IGalleryDeleteManyParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.GALLERY_WITH.DELETE_IMAGE,
        data: params
    }).delete();
}

export default {
    get: get,
    add: add,
    deleteMany: deleteMany,
}