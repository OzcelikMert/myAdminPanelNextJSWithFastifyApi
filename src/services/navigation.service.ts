import Api from "./api";
import {ApiEndPoints} from "constants/index";
import {
    NavigationAddParamDocument,
    NavigationGetOneParamDocument,
    NavigationDeleteManyParamDocument,
    NavigationGetManyParamDocument,
    NavigationUpdateManyStatusIdParamDocument,
    NavigationGetResultDocument,
    NavigationUpdateOneParamDocument,
    NavigationUpdateOneRankParamDocument
} from "types/services/navigation";
import {NavigationApiEndPoint} from "constants/apiEndPoints/navigation.api.endPoint";

const getOne = (params: NavigationGetOneParamDocument) =>  {
    return Api.get<NavigationGetResultDocument | null>({
        url: [ApiEndPoints.NAVIGATION, NavigationApiEndPoint.GET_WITH_ID(params._id)],
        data: params,
    });
}

const getMany = (params: NavigationGetManyParamDocument) =>  {
    return Api.get<NavigationGetResultDocument[]>({
        url: [ApiEndPoints.NAVIGATION, NavigationApiEndPoint.GET],
        data: params,
    });
}

const add = (params: NavigationAddParamDocument) =>  {
    return Api.post({
        url: [ApiEndPoints.NAVIGATION, NavigationApiEndPoint.ADD],
        data: params,
    });
}

const updateOne = (params: NavigationUpdateOneParamDocument) =>  {
    return Api.put({
        url: [ApiEndPoints.NAVIGATION, NavigationApiEndPoint.UPDATE_WITH_ID(params._id)],
        data: params,
    });
}

const updateOneRank = (params: NavigationUpdateOneRankParamDocument) =>  {
    return Api.put({
        url: [ApiEndPoints.NAVIGATION, NavigationApiEndPoint.UPDATE_RANK_WITH_ID(params._id)],
        data: params
    });
}

const updateManyStatus = (params: NavigationUpdateManyStatusIdParamDocument) =>  {
    return Api.put({
        url: [ApiEndPoints.NAVIGATION, NavigationApiEndPoint.UPDATE_STATUS],
        data: params
    });
}

const deleteMany = (params: NavigationDeleteManyParamDocument) =>  {
    return Api.delete({
        url: [ApiEndPoints.NAVIGATION, NavigationApiEndPoint.DELETE],
        data: params,
    });
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