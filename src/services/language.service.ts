import Api from "./api";
import {ServicePages} from "constants/index";
import  {
    LanguageAddParamDocument,
    LanguageGetOneParamDocument,
    LanguageGetResultDocument, LanguageGetManyParamDocument,
    LanguageUpdateOneParamDocument,
    LanguageUpdateOneRankParamDocument
} from "types/services/language";

const getOne = (params: LanguageGetOneParamDocument) =>{
    return Api.get<LanguageGetResultDocument | null>({
        url: [ServicePages.language, "one"],
        data: params
    });
}

const getMany = (params: LanguageGetManyParamDocument) => {
    return Api.get<LanguageGetResultDocument[]>({
        url: [ServicePages.language, "many"],
        data: params
    });
}

const getFlags = (params: {}) => {
    return Api.get<string[]>({
        url: [ServicePages.language, "flags"],
        data: params
    });
}

const add = (params: LanguageAddParamDocument) => {
    return Api.post({
        url: [ServicePages.language, "one"],
        data: params
    });
}

const updateOne = (params: LanguageUpdateOneParamDocument) => {
    return Api.put({
        url: [ServicePages.language, "one", params._id.toString()],
        data: params
    });
}

const updateOneRank = (params: LanguageUpdateOneRankParamDocument) => {
    return Api.put({
        url: [ServicePages.language, "one", params._id.toString(), "rank"],
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