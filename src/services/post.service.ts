import {ApiEndPoints} from "constants/apiEndPoints";
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
} from "types/services/post.service";
import {PostApiEndPoint} from "constants/apiEndPoints/post.api.endPoint";
import ApiRequest from "library/api/request";
import pathUtil from "utils/path.util";

const getOne = (params: PostGetOneParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.POST, PostApiEndPoint.GET_WITH_ID(params._id)],
        data: params
    }).get<PostGetOneResultDocument>();
}

const getMany = (params: PostGetManyParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.POST, PostApiEndPoint.GET],
        data: params
    }).get<PostGetManyResultDocument[]>();
}

const getCount = (params: PostGetCountParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.POST, PostApiEndPoint.GET_COUNT],
        data: params
    }).get<number>();
}

const add = (params: PostAddParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.POST, PostApiEndPoint.ADD],
        data: params
    }).post();
}

const updateOne = (params: PostUpdateOneParamDocument) =>  {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.POST, PostApiEndPoint.UPDATE_WITH_ID(params._id)],
        data: params
    }).put();
}

const updateOneRank = (params: PostUpdateOneRankParamDocument) =>  {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.POST, PostApiEndPoint.UPDATE_RANK_WITH_ID(params._id)],
        data: params
    }).put();
}

const updateManyStatus = (params: PostUpdateManyStatusIdParamDocument) =>  {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.POST, PostApiEndPoint.UPDATE_STATUS],
        data: params
    }).put();
}

const deleteMany = (params: PostDeleteManyParamDocument) =>  {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.POST, PostApiEndPoint.DELETE],
        data: params
    }).delete();
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