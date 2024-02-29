import {ApiEndPoints} from "constants/apiEndPoints";
import {
    PostAddParamDocument,
    IPostDeleteManyParamService,
    IPostGetCountParamService,
    IPostGetManyParamService, IPostGetManyResultService,
    IPostGetWithIdParamService, IPostGetWithIdResultService,
    IPostUpdateManyStatusIdParamService,
    IPostUpdateWithIdParamService,
    IPostUpdateRankWithIdParamService,
} from "types/services/post.service";
import ApiRequest from "library/api/request";
import {PathUtil} from "utils/path.util";

const getWithId = (params: IPostGetWithIdParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.POST_WITH.GET_WITH_ID(params._id),
        data: params
    }).get<IPostGetWithIdResultService>();
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

const updateWithId = (params: IPostUpdateWithIdParamService) =>  {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.POST_WITH.UPDATE_WITH_ID(params._id),
        data: params
    }).put();
}

const updateRankWithId = (params: IPostUpdateRankWithIdParamService) =>  {
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
    getWithId: getWithId,
    getMany: getMany,
    getCount: getCount,
    add: add,
    updateWithId: updateWithId,
    updateRankWithId: updateRankWithId,
    updateManyStatus: updateManyStatus,
    deleteMany: deleteMany,
}