import {ApiEndPoints} from "constants/apiEndPoints";
import  {
    ILanguageAddParamService,
    ILanguageGetOneParamService,
    ILanguageGetResultService, ILanguageGetOneParamService,
    ILanguageUpdateOneParamService,
    ILanguageUpdateOneRankParamService
} from "types/services/language.service";
import {LanguageApiEndPoint} from "constants/apiEndPoints/language.api.endPoint";
import ApiRequest from "library/api/request";
import pathUtil from "utils/path.util";

const getOne = (params: ILanguageGetOneParamService) =>{
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.LANGUAGE, LanguageApiEndPoint.GET_WITH_ID(params._id)],
        data: params
    }).get<ILanguageGetResultService>();
}

const getMany = (params: ILanguageGetOneParamService) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.LANGUAGE, LanguageApiEndPoint.GET],
        data: params
    }).get<ILanguageGetResultService[]>();
}

const getFlags = (params: {}) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.LANGUAGE, LanguageApiEndPoint.GET_FLAGS],
        data: params
    }).get<string[]>();
}

const add = (params: ILanguageAddParamService) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.LANGUAGE, LanguageApiEndPoint.ADD],
        data: params
    }).post();
}

const updateOne = (params: ILanguageUpdateOneParamService) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.LANGUAGE, LanguageApiEndPoint.UPDATE_WITH_ID(params._id)],
        data: params
    }).put();
}

const updateOneRank = (params: ILanguageUpdateOneRankParamService) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.LANGUAGE, LanguageApiEndPoint.UPDATE_RANK_WITH_ID(params._id)],
        data: params
    }).put();
}

export default {
    getOne: getOne,
    getMany: getMany,
    getFlags: getFlags,
    add: add,
    updateOne: updateOne,
    updateOneRank: updateOneRank
}