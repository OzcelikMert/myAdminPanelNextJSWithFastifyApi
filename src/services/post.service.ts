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
} from "types/services/post.service";
import ApiRequest from "library/api/request";
import {PathUtil} from "utils/path.util";

const getOne = (params: IPostGetOneParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.POST_WITH.GET_WITH_ID(params._id),
        data: params
    }).get<IPostGetOneResultService>();
}

const getMany = (params: IPostGetManyParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.POST_WITH.GET,
        data: params
    }).get<IPostGetManyResultService[]>();
}

const getCount = (params: IPostGetCountParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.POST_WITH.GET_COUNT,
        data: params
    }).get<number>();
}

const add = (params: PostAddParamDocument) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.POST_WITH.ADD,
        data: params
    }).post();
}

const updateOne = (params: IPostUpdateOneParamService) =>  {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.POST_WITH.UPDATE_WITH_ID(params._id),
        data: params
    }).put();
}

const updateOneRank = (params: IPostUpdateOneRankParamService) =>  {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.POST_WITH.UPDATE_RANK_WITH_ID(params._id),
        data: params
    }).put();
}

const updateManyStatus = (params: IPostUpdateManyStatusIdParamService) =>  {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.POST_WITH.UPDATE_STATUS,
        data: params
    }).put();
}

const deleteMany = (params: IPostDeleteManyParamService) =>  {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.POST_WITH.DELETE,
        data: params
    }).delete();
}

export const PostService = {
    getOne: getOne,
    getMany: getMany,
    getCount: getCount,
    add: add,
    updateOne: updateOne,
    updateOneRank: updateOneRank,
    updateManyStatus: updateManyStatus,
    deleteMany: deleteMany,
}