import {ApiEndPoints} from "constants/apiEndPoints";
import {
    PostAddParamDocument,
    IPostDeleteManyParamService,
    IPostGetCountParamService,
    IPostGetManyParamService, IPostGetManyResultService,
    IPostGetOneParamService, IPostGetOneResultService,
    IPostUpdateManyStatusIdParamService,
    IPostUpdateOneParamService,
    IPostUpdateOneRankParamService,
    IPostUpdateOneViewParamService
} from "types/services/post.service";
import {PostApiEndPoint} from "constants/apiEndPoints/post.api.endPoint";
import ApiRequest from "library/api/request";
import pathUtil from "utils/path.util";

const getOne = (params: IPostGetOneParamService) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.POST, PostApiEndPoint.GET_WITH_ID(params._id)],
        data: params
    }).get<IPostGetOneResultService>();
}

const getMany = (params: IPostGetManyParamService) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.POST, PostApiEndPoint.GET],
        data: params
    }).get<IPostGetManyResultService[]>();
}

const getCount = (params: IPostGetCountParamService) => {
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

const updateOne = (params: IPostUpdateOneParamService) =>  {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.POST, PostApiEndPoint.UPDATE_WITH_ID(params._id)],
        data: params
    }).put();
}

const updateOneRank = (params: IPostUpdateOneRankParamService) =>  {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.POST, PostApiEndPoint.UPDATE_RANK_WITH_ID(params._id)],
        data: params
    }).put();
}

const updateManyStatus = (params: IPostUpdateManyStatusIdParamService) =>  {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.POST, PostApiEndPoint.UPDATE_STATUS],
        data: params
    }).put();
}

const deleteMany = (params: IPostDeleteManyParamService) =>  {
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