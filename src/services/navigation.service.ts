import Api from "./api";
import {ServicePages} from "constants/index";
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

export default {
    getOne(params: NavigationGetOneParamDocument) {
        return Api.get<NavigationGetResultDocument | null>({
            url: [ServicePages.navigation, "one"],
            data: params,
        });
    },
    getMany(params: NavigationGetManyParamDocument) {
        return Api.get<NavigationGetResultDocument[]>({
            url: [ServicePages.navigation, "many"],
            data: params,
        });
    },
    add(params: NavigationAddParamDocument) {
        return Api.post({
            url: [ServicePages.navigation, "one"],
            data: params,
        });
    },
    updateOne(params: NavigationUpdateOneParamDocument) {
        return Api.put({
            url: [ServicePages.navigation, "one", params._id.toString()],
            data: params,
        });
    },
    updateOneRank(params: NavigationUpdateOneRankParamDocument) {
        return Api.put({
            url: [ServicePages.navigation, "one", params._id.toString(), "rank"],
            data: params
        });
    },
    updateManyStatus(params: NavigationUpdateManyStatusIdParamDocument) {
        return Api.put({
            url: [ServicePages.navigation, "many", "status"],
            data: params
        });
    },
    deleteMany(params: NavigationDeleteManyParamDocument) {
        return Api.delete({
            url: [ServicePages.navigation, "many"],
            data: params,
        });
    },
}