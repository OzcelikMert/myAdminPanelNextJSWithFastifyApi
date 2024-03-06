import {ApiEndPoints} from "constants/apiEndPoints";
import {
    INavigationAddParamService,
    INavigationGetWithIdParamService,
    INavigationDeleteManyParamService,
    INavigationGetManyParamService,
    INavigationUpdateStatusManyIdParamService,
    INavigationGetResultService,
    INavigationUpdateWithIdParamService,
    INavigationUpdateRankWithIdParamService
} from "types/services/navigation.service";
import {PathUtil} from "utils/path.util";
import ApiRequest from "library/api/request";
import {INavigationModel} from "types/models/navigation.model";

const getWithId = (params: INavigationGetWithIdParamService) =>  {
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
    }).post<INavigationModel>();
}

const updateWithId = (params: INavigationUpdateWithIdParamService) =>  {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.NAVIGATION_WITH.UPDATE_WITH_ID(params._id),
        data: params,
    }).put();
}

const updateRankWithId = (params: INavigationUpdateRankWithIdParamService) =>  {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.NAVIGATION_WITH.UPDATE_RANK_WITH_ID(params._id),
        data: params
    }).put();
}

const updateStatusMany = (params: INavigationUpdateStatusManyIdParamService) =>  {
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
    getWithId: getWithId,
    getMany: getMany,
    add: add,
    updateWithId: updateWithId,
    updateRankWithId: updateRankWithId,
    updateStatusMany: updateStatusMany,
    deleteMany: deleteMany,
}