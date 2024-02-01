import Api from "./api";
import {ServicePages} from "constants/index";
import GalleryDocument, {GalleryDeleteParamDocument, GalleryAddParamDocument} from "types/services/gallery";
import {ApiRequestParamDocument} from "types/services/api";

const get = () => {
    return Api.get<GalleryDocument[]>({
        url: [ServicePages.gallery],
    });
}

const add = (params: GalleryAddParamDocument, onUploadProgress: ApiRequestParamDocument["onUploadProgress"]) => {
    return Api.post({
        url: [ServicePages.gallery],
        data: params,
        contentType: false,
        processData: false,
        onUploadProgress: onUploadProgress
    });
}

const deleteMany = (params: GalleryDeleteParamDocument) => {
    return Api.delete({
        url: [ServicePages.gallery],
        data: params
    });
}

export default {
    get: get,
    add: add,
    deleteMany: deleteMany,
}