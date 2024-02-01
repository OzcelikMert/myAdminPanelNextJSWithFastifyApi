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

const getOne = (params: NavigationGetOneParamDocument) =>  {
    return Api.get<NavigationGetResultDocument | null>({
        url: [ServicePages.navigation, "one"],
        data: params,
    });
}

const getMany = (params: NavigationGetManyParamDocument) =>  {
    return Api.get<NavigationGetResultDocument[]>({
        url: [ServicePages.navigation, "many"],
        data: params,
    });
}

const add = (params: NavigationAddParamDocument) =>  {
    return Api.post({
        url: [ServicePages.navigation, "one"],
        data: params,
    });
}

const updateOne = (params: NavigationUpdateOneParamDocument) =>  {
    return Api.put({
        url: [ServicePages.navigation, "one", params._id.toString()],
        data: params,
    });
}

const updateOneRank = (params: NavigationUpdateOneRankParamDocument) =>  {
    return Api.put({
        url: [ServicePages.navigation, "one", params._id.toString(), "rank"],
        data: params
    });
}

const updateManyStatus = (params: NavigationUpdateManyStatusIdParamDocument) =>  {
    return Api.put({
        url: [ServicePages.navigation, "many", "status"],
        data: params
    });
}

const deleteMany = (params: NavigationDeleteManyParamDocument) =>  {
    return Api.delete({
        url: [ServicePages.navigation, "many"],
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