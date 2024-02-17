import {ApiEndPoints} from "constants/apiEndPoints";
import  {
    ILanguageAddParamService,
    ILanguageGetResultService,
    ILanguageGetOneParamService,
    ILanguageUpdateOneParamService,
    ILanguageUpdateOneRankParamService
} from "types/services/language.service";
import ApiRequest from "library/api/request";
import {PathUtil} from "utils/path.util";

const getOne = (params: ILanguageGetOneParamService) =>{
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.LANGUAGE_WITH.GET_WITH_ID(params._id),
        data: params
    }).get<ILanguageGetResultService>();
}

const getMany = (params: ILanguageGetOneParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.LANGUAGE_WITH.GET,
        data: params
    }).get<ILanguageGetResultService[]>();
}

const getFlags = (params: {}) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.LANGUAGE_WITH.GET_FLAGS,
        data: params
    }).get<string[]>();
}

const add = (params: ILanguageAddParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.LANGUAGE_WITH.ADD,
        data: params
    }).post();
}

const updateOne = (params: ILanguageUpdateOneParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.LANGUAGE_WITH.UPDATE_WITH_ID(params._id),
        data: params
    }).put();
}

const updateOneRank = (params: ILanguageUpdateOneRankParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.LANGUAGE_WITH.UPDATE_RANK_WITH_ID(params._id),
        data: params
    }).put();
}

export const LanguageService = {
    getOne: getOne,
    getMany: getMany,
    getFlags: getFlags,
    add: add,
    updateOne: updateOne,
    updateOneRank: updateOneRank
}