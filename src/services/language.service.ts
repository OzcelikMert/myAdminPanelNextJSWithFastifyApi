import {ApiEndPoints} from "constants/index";
import  {
    LanguageAddParamDocument,
    LanguageGetOneParamDocument,
    LanguageGetResultDocument, LanguageGetManyParamDocument,
    LanguageUpdateOneParamDocument,
    LanguageUpdateOneRankParamDocument
} from "types/services/language.service";
import {LanguageApiEndPoint} from "constants/apiEndPoints/language.api.endPoint";
import ApiRequest from "library/api/request";
import pathUtil from "utils/path.util";

const getOne = (params: LanguageGetOneParamDocument) =>{
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.LANGUAGE, LanguageApiEndPoint.GET_WITH_ID(params._id)],
        data: params
    }).get<LanguageGetResultDocument>();
}

const getMany = (params: LanguageGetManyParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.LANGUAGE, LanguageApiEndPoint.GET],
        data: params
    }).get<LanguageGetResultDocument[]>();
}

const getFlags = (params: {}) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.LANGUAGE, LanguageApiEndPoint.GET_FLAGS],
        data: params
    }).get<string[]>();
}

const add = (params: LanguageAddParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.LANGUAGE, LanguageApiEndPoint.ADD],
        data: params
    }).post();
}

const updateOne = (params: LanguageUpdateOneParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.LANGUAGE, LanguageApiEndPoint.UPDATE_WITH_ID(params._id)],
        data: params
    }).put();
}

const updateOneRank = (params: LanguageUpdateOneRankParamDocument) => {
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