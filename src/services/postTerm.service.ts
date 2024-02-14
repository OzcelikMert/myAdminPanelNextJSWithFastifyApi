import {ApiEndPoints} from "constants/apiEndPoints";
import  {
    IPostTermGetResultService,
    IPostTermUpdateManyStatusIdParamService,
    IPostTermUpdateOneRankParamService,
    IPostTermAddParamService,
    IPostTermGetManyParamService,
    IPostTermUpdateOneParamService,
    IPostTermGetOneParamService,
    IPostTermDeleteManyParamService
} from "types/services/postTerm.service";
import ApiRequest from "library/api/request";
import {PathUtil} from "utils/path.util";

const getOne = (params: IPostTermGetOneParamService) => {
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

const updateOne = (params: IPostTermUpdateOneParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.POST_TERM_WITH.UPDATE_WITH_ID(params._id),
        data: params
    }).put();
}

const updateOneRank = (params: IPostTermUpdateOneRankParamService) => {
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

export default {
    getOne: getOne,
    getMany: getMany,
    add: add,
    updateOne: updateOne,
    updateOneRank: updateOneRank,
    updateManyStatus: updateManyStatus,
    deleteMany: deleteMany,
}