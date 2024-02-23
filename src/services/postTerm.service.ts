import {ApiEndPoints} from "constants/apiEndPoints";
import  {
    IPostTermGetResultService,
    IPostTermUpdateManyStatusIdParamService,
    IPostTermUpdateWithIdRankParamService,
    IPostTermAddParamService,
    IPostTermGetManyParamService,
    IPostTermUpdateWithIdParamService,
    IPostTermGetWithIdParamService,
    IPostTermDeleteManyParamService
} from "types/services/postTerm.service";
import ApiRequest from "library/api/request";
import {PathUtil} from "utils/path.util";

const getWithId = (params: IPostTermGetWithIdParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.POST_TERM_WITH.GET_WITH_ID(params._id),
        data: params
    }).get<IPostTermGetResultService>();
}

const getMany = (params: IPostTermGetManyParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.POST_TERM_WITH.GET,
        data: params
    }).get<IPostTermGetResultService[]>();
}

const add = (params: IPostTermAddParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.POST_TERM_WITH.ADD,
        data: params
    }).post<{_id: string}>();
}

const updateWithId = (params: IPostTermUpdateWithIdParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.POST_TERM_WITH.UPDATE_WITH_ID(params._id),
        data: params
    }).put();
}

const updateWithIdRank = (params: IPostTermUpdateWithIdRankParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.POST_TERM_WITH.UPDATE_RANK_WITH_ID(params._id),
        data: params
    }).put();
}

const updateManyStatus = (params: IPostTermUpdateManyStatusIdParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.POST_TERM_WITH.UPDATE_STATUS,
        data: params
    }).put();
}

const deleteMany = (params: IPostTermDeleteManyParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.POST_TERM_WITH.DELETE,
        data: params
    }).delete();
}

export const PostTermService = {
    getWithId: getWithId,
    getMany: getMany,
    add: add,
    updateWithId: updateWithId,
    updateWithIdRank: updateWithIdRank,
    updateManyStatus: updateManyStatus,
    deleteMany: deleteMany,
}