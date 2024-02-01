import Api from "./api";
import {ServicePages} from "constants/index";
import  {
    PostTermGetResultDocument,
    PostTermUpdateManyStatusIdParamDocument,
    PostTermUpdateOneRankParamDocument,
    PostTermAddParamDocument,
    PostTermGetManyParamDocument,
    PostTermUpdateOneParamDocument,
    PostTermGetOneParamDocument,
    PostTermDeleteManyParamDocument
} from "types/services/postTerm";

const getOne = (params: PostTermGetOneParamDocument) => {
    return Api.get<PostTermGetResultDocument | null>({
        url: [ServicePages.postTerm, "one", params.postTypeId.toString(), params.typeId.toString()],
        data: params
    });
}

const getMany = (params: PostTermGetManyParamDocument) => {
    return Api.get<PostTermGetResultDocument[]>({
        url: [ServicePages.postTerm, "many", params.postTypeId.toString()],
        data: params
    });
}

const add = (params: PostTermAddParamDocument) => {
    return Api.post<{_id: string}>({
        url: [ServicePages.postTerm, "one", params.postTypeId.toString(), params.typeId.toString()],
        data: params
    });
}

const updateOne = (params: PostTermUpdateOneParamDocument) => {
    return Api.put({
        url: [ServicePages.postTerm, "one", params.postTypeId.toString(), params.typeId.toString(), params._id.toString()],
        data: params
    });
}

const updateOneRank = (params: PostTermUpdateOneRankParamDocument) => {
    return Api.put({
        url: [ServicePages.postTerm, "one", params.postTypeId.toString(), params.typeId.toString(), params._id.toString(), "rank"],
        data: params
    });
}

const updateManyStatus = (params: PostTermUpdateManyStatusIdParamDocument) => {
    return Api.put({
        url: [ServicePages.postTerm, "many", params.postTypeId.toString(), params.typeId.toString(), "status"],
        data: params
    });
}

const deleteMany = (params: PostTermDeleteManyParamDocument) => {
    return Api.delete({
        url: [ServicePages.postTerm, "many", params.postTypeId.toString(), params.typeId.toString()],
        data: params
    });
}

export default {
    getOne: getOne,
    getMany: getMany,
    add: add,
    updateOne: updateOne,
    updateOneRank: updateOneRank,
    updateManyStatus: updateManyStatus,
    deleteMany: deleteMany,
}