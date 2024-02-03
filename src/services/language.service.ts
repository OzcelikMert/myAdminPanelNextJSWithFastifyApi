import Api from "./api";
import {ApiEndPoints} from "constants/index";
import  {
    LanguageAddParamDocument,
    LanguageGetOneParamDocument,
    LanguageGetResultDocument, LanguageGetManyParamDocument,
    LanguageUpdateOneParamDocument,
    LanguageUpdateOneRankParamDocument
} from "types/services/language";
import {LanguageApiEndPoint} from "constants/apiEndPoints/language.api.endPoint";

const getOne = (params: LanguageGetOneParamDocument) =>{
    return Api.get<LanguageGetResultDocument | null>({
        url: [ApiEndPoints.LANGUAGE, LanguageApiEndPoint.GET_WITH_ID(params._id)],
        data: params
    });
}

const getMany = (params: LanguageGetManyParamDocument) => {
    return Api.get<LanguageGetResultDocument[]>({
        url: [ApiEndPoints.LANGUAGE, LanguageApiEndPoint.GET],
        data: params
    });
}

const getFlags = (params: {}) => {
    return Api.get<string[]>({
        url: [ApiEndPoints.LANGUAGE, LanguageApiEndPoint.GET_FLAGS],
        data: params
    });
}

const add = (params: LanguageAddParamDocument) => {
    return Api.post({
        url: [ApiEndPoints.LANGUAGE, LanguageApiEndPoint.ADD],
        data: params
    });
}

const updateOne = (params: LanguageUpdateOneParamDocument) => {
    return Api.put({
        url: [ApiEndPoints.LANGUAGE, LanguageApiEndPoint.UPDATE_WITH_ID(params._id)],
        data: params
    });
}

const updateOneRank = (params: LanguageUpdateOneRankParamDocument) => {
    return Api.put({
        url: [ApiEndPoints.LANGUAGE, LanguageApiEndPoint.UPDATE_RANK_WITH_ID(params._id)],
        data: params
    });
}

export default {
    getOne: getOne,
    getMany: getMany,
    getFlags: getFlags,
    add: add,
    updateOne: updateOne,
    updateOneRank: updateOneRank
}