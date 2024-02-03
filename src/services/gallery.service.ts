import Api from "./api";
import {ApiEndPoints} from "constants/index";
import GalleryDocument, {GalleryDeleteParamDocument, GalleryAddParamDocument} from "types/services/gallery";
import {ApiRequestParamDocument} from "types/services/api";
import {GalleryApiEndPoint} from "constants/apiEndPoints/gallery.api.endPoint";

const get = () => {
    return Api.get<GalleryDocument[]>({
        url: [ApiEndPoints.GALLERY, GalleryApiEndPoint.GET_IMAGE],
    });
}

const add = (params: GalleryAddParamDocument, onUploadProgress: ApiRequestParamDocument["onUploadProgress"]) => {
    return Api.post({
        url: [ApiEndPoints.GALLERY, GalleryApiEndPoint.ADD_IMAGE],
        data: params,
        contentType: false,
        processData: false,
        onUploadProgress: onUploadProgress
    });
}

const deleteMany = (params: GalleryDeleteParamDocument) => {
    return Api.delete({
        url: [ApiEndPoints.GALLERY, GalleryApiEndPoint.DELETE_IMAGE],
        data: params
    });
}

export default {
    get: get,
    add: add,
    deleteMany: deleteMany,
}