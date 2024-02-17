import {ApiEndPoints} from "constants/apiEndPoints";
import {
    INavigationAddParamService,
    INavigationGetOneParamService,
    INavigationDeleteManyParamService,
    INavigationGetManyParamService,
    INavigationUpdateManyStatusIdParamService,
    INavigationGetResultService,
    INavigationUpdateOneParamService,
    INavigationUpdateOneRankParamService
} from "types/services/navigation.service";
import {PathUtil} from "utils/path.util";
import ApiRequest from "library/api/request";

const getOne = (params: INavigationGetOneParamService) =>  {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.NAVIGATION_WITH.GET_WITH_ID(params._id),
        data: params
    }).get<INavigationGetResultService>();
}

const getMany = (params: INavigationGetManyParamService) =>  {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.NAVIGATION_WITH.GET,
        data: params,
    }).get<INavigationGetResultService[]>();
}

const add = (params: INavigationAddParamService) =>  {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.NAVIGATION_WITH.ADD,
        data: params,
    }).post();
}

const updateOne = (params: INavigationUpdateOneParamService) =>  {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.NAVIGATION_WITH.UPDATE_WITH_ID(params._id),
        data: params,
    }).put();
}

const updateOneRank = (params: INavigationUpdateOneRankParamService) =>  {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.NAVIGATION_WITH.UPDATE_RANK_WITH_ID(params._id),
        data: params
    }).put();
}

const updateManyStatus = (params: INavigationUpdateManyStatusIdParamService) =>  {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.NAVIGATION_WITH.UPDATE_STATUS,
        data: params
    }).put();
}

const deleteMany = (params: INavigationDeleteManyParamService) =>  {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.NAVIGATION_WITH.DELETE,
        data: params,
    }).delete();
}

export const NavigationService = {
    getOne: getOne,
    getMany: getMany,
    add: add,
    updateOne: updateOne,
    updateOneRank: updateOneRank,
    updateManyStatus: updateManyStatus,
    deleteMany: deleteMany,
}