import Api from "./api";
import {ServicePages} from "constants/index";
import {
    PostAddParamDocument,
    PostDeleteManyParamDocument,
    PostGetCountParamDocument,
    PostGetManyParamDocument, PostGetManyResultDocument,
    PostGetOneParamDocument, PostGetOneResultDocument,
    PostUpdateManyStatusIdParamDocument,
    PostUpdateOneParamDocument,
    PostUpdateOneRankParamDocument,
    PostUpdateOneViewParamDocument
} from "types/services/post";

const getOne = (params: PostGetOneParamDocument) => {
    return Api.get<PostGetOneResultDocument | null>({
        url: [ServicePages.post, "one", params.typeId.toString()],
        data: params
    });
}

const getMany = (params: PostGetManyParamDocument) => {
    return Api.get<PostGetManyResultDocument[]>({
        url: [ServicePages.post, "many"],
        data: params
    });
}

const getCount = (params: PostGetCountParamDocument) => {
    return Api.get<number>({
        url: [ServicePages.post, params.typeId.toString()],
        data: params
    });
}

const add = (params: PostAddParamDocument) => {
    return Api.post({
        url: [ServicePages.post, "one", params.typeId.toString()],
        data: params
    });
}

const updateOne = (params: PostUpdateOneParamDocument) =>  {
    return Api.put({
        url: [ServicePages.post, "one", params.typeId.toString(), params._id.toString()],
        data: params
    });
}

const updateOneRank = (params: PostUpdateOneRankParamDocument) =>  {
    return Api.put({
        url: [ServicePages.post, "one", params.typeId.toString(), params._id.toString(), "rank"],
        data: params
    });
}

const updateManyStatus = (params: PostUpdateManyStatusIdParamDocument) =>  {
    return Api.put({
        url: [ServicePages.post, "many", params.typeId.toString(), "status"],
        data: params
    });
}

const deleteMany = (params: PostDeleteManyParamDocument) =>  {
    return Api.delete({
        url: [ServicePages.post, "many", params.typeId.toString()],
        data: params
    });
}

export default {
    getOne: getOne,
    getMany: getMany,
    getCount: getCount,
    add: add,
    updateOne: updateOne,
    updateOneRank: updateOneRank,
    updateManyStatus: updateManyStatus,
    deleteMany: deleteMany,
}