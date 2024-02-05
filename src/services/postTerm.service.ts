import {ApiEndPoints} from "constants/index";
import  {
    PostTermGetResultDocument,
    PostTermUpdateManyStatusIdParamDocument,
    PostTermUpdateOneRankParamDocument,
    PostTermAddParamDocument,
    PostTermGetManyParamDocument,
    PostTermUpdateOneParamDocument,
    PostTermGetOneParamDocument,
    PostTermDeleteManyParamDocument
} from "types/services/postTerm.service";
import {PostTermApiEndPoint} from "constants/apiEndPoints/postTerm.api.endPoint";
import ApiRequest from "library/api/request";
import pathUtil from "utils/path.util";

const getOne = (params: PostTermGetOneParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.POST_TERM, PostTermApiEndPoint.GET_WITH_ID(params._id)],
        data: params
    }).get<PostTermGetResultDocument>();
}

const getMany = (params: PostTermGetManyParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.POST_TERM, PostTermApiEndPoint.GET],
        data: params
    }).get<PostTermGetResultDocument[]>();
}

const add = (params: PostTermAddParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.POST_TERM, PostTermApiEndPoint.ADD],
        data: params
    }).post<{_id: string}>();
}

const updateOne = (params: PostTermUpdateOneParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.POST_TERM, PostTermApiEndPoint.UPDATE_WITH_ID(params._id)],
        data: params
    }).put();
}

const updateOneRank = (params: PostTermUpdateOneRankParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.POST_TERM, PostTermApiEndPoint.UPDATE_RANK_WITH_ID(params._id)],
        data: params
    }).put();
}

const updateManyStatus = (params: PostTermUpdateManyStatusIdParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.POST_TERM, PostTermApiEndPoint.UPDATE_STATUS],
        data: params
    }).put();
}

const deleteMany = (params: PostTermDeleteManyParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.POST_TERM, PostTermApiEndPoint.DELETE],
        data: params
    }).delete();
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