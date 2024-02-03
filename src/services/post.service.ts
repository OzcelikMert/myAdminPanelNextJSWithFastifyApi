import Api from "./api";
import {ApiEndPoints} from "constants/index";
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
import {PostApiEndPoint} from "constants/apiEndPoints/post.api.endPoint";

const getOne = (params: PostGetOneParamDocument) => {
    return Api.get<PostGetOneResultDocument | null>({
        url: [ApiEndPoints.POST, PostApiEndPoint.GET_WITH_ID(params._id)],
        data: params
    });
}

const getMany = (params: PostGetManyParamDocument) => {
    return Api.get<PostGetManyResultDocument[]>({
        url: [ApiEndPoints.POST, PostApiEndPoint.GET],
        data: params
    });
}

const getCount = (params: PostGetCountParamDocument) => {
    return Api.get<number>({
        url: [ApiEndPoints.POST, PostApiEndPoint.GET_COUNT],
        data: params
    });
}

const add = (params: PostAddParamDocument) => {
    return Api.post({
        url: [ApiEndPoints.POST, PostApiEndPoint.ADD],
        data: params
    });
}

const updateOne = (params: PostUpdateOneParamDocument) =>  {
    return Api.put({
        url: [ApiEndPoints.POST, PostApiEndPoint.UPDATE_WITH_ID(params._id)],
        data: params
    });
}

const updateOneRank = (params: PostUpdateOneRankParamDocument) =>  {
    return Api.put({
        url: [ApiEndPoints.POST, PostApiEndPoint.UPDATE_RANK_WITH_ID(params._id)],
        data: params
    });
}

const updateManyStatus = (params: PostUpdateManyStatusIdParamDocument) =>  {
    return Api.put({
        url: [ApiEndPoints.POST, PostApiEndPoint.UPDATE_STATUS],
        data: params
    });
}

const deleteMany = (params: PostDeleteManyParamDocument) =>  {
    return Api.delete({
        url: [ApiEndPoints.POST, PostApiEndPoint.DELETE],
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