import Api from "./api";
import {ServicePages} from "constants/index";
import  {
    LanguageAddParamDocument,
    LanguageGetOneParamDocument,
    LanguageGetResultDocument, LanguageGetManyParamDocument,
    LanguageUpdateOneParamDocument,
    LanguageUpdateOneRankParamDocument
} from "types/services/language";

export default {
    getOne(params: LanguageGetOneParamDocument){
        return Api.get<LanguageGetResultDocument | null>({
            url: [ServicePages.language, "one"],
            data: params
        });
    },
    getMany(params: LanguageGetManyParamDocument) {
        return Api.get<LanguageGetResultDocument[]>({
            url: [ServicePages.language, "many"],
            data: params
        });
    },
    getFlags(params: {}) {
        return Api.get<string[]>({
            url: [ServicePages.language, "flags"],
            data: params
        });
    },
    add(params: LanguageAddParamDocument) {
        return Api.post({
            url: [ServicePages.language, "one"],
            data: params
        });
    },
    updateOne(params: LanguageUpdateOneParamDocument) {
        return Api.put({
            url: [ServicePages.language, "one", params._id.toString()],
            data: params
        });
    },
    updateOneRank(params: LanguageUpdateOneRankParamDocument) {
        return Api.put({
            url: [ServicePages.language, "one", params._id.toString(), "rank"],
            data: params
        });
    }
}