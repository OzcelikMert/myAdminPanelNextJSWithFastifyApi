import {ApiEndPoints} from "constants/apiEndPoints";
import {
    NavigationAddParamDocument,
    NavigationGetOneParamDocument,
    NavigationDeleteManyParamDocument,
    NavigationGetManyParamDocument,
    NavigationUpdateManyStatusIdParamDocument,
    NavigationGetResultDocument,
    NavigationUpdateOneParamDocument,
    NavigationUpdateOneRankParamDocument
} from "types/services/navigation.service";
import {NavigationApiEndPoint} from "constants/apiEndPoints/navigation.api.endPoint";
import pathUtil from "utils/path.util";
import ApiRequest from "library/api/request";

const getOne = (params: NavigationGetOneParamDocument) =>  {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.NAVIGATION, NavigationApiEndPoint.GET_WITH_ID(params._id)],
        data: params
    }).get<NavigationGetResultDocument>();
}

const getMany = (params: NavigationGetManyParamDocument) =>  {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.NAVIGATION, NavigationApiEndPoint.GET],
        data: params,
    }).get<NavigationGetResultDocument[]>();
}

const add = (params: NavigationAddParamDocument) =>  {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.NAVIGATION, NavigationApiEndPoint.ADD],
        data: params,
    }).post();
}

const updateOne = (params: NavigationUpdateOneParamDocument) =>  {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.NAVIGATION, NavigationApiEndPoint.UPDATE_WITH_ID(params._id)],
        data: params,
    }).put();
}

const updateOneRank = (params: NavigationUpdateOneRankParamDocument) =>  {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.NAVIGATION, NavigationApiEndPoint.UPDATE_RANK_WITH_ID(params._id)],
        data: params
    }).put();
}

const updateManyStatus = (params: NavigationUpdateManyStatusIdParamDocument) =>  {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.NAVIGATION, NavigationApiEndPoint.UPDATE_STATUS],
        data: params
    }).put();
}

const deleteMany = (params: NavigationDeleteManyParamDocument) =>  {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.NAVIGATION, NavigationApiEndPoint.DELETE],
        data: params,
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