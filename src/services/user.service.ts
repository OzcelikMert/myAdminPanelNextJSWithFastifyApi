import Api from "./api";
import {ServicePages} from "constants/index";
import {
    UserGetOneParamDocument,
    UserGetManyParamDocument,
    UserUpdateOneParamDocument,
    UserGetResultDocument,
    UserAddParamDocument,
    UserDeleteOneParamDocument
} from "types/services/user";

const getOne = (params: UserGetOneParamDocument) => {
    return Api.get<UserGetResultDocument | null>({
        url: [ServicePages.user, "one"],
        data: params,
    });
}

const getMany = (params: UserGetManyParamDocument) => {
    return Api.get<UserGetResultDocument[]>({
        url: [ServicePages.user, "many"],
        data: params,
    });
}

const add = (params: UserAddParamDocument) => {
    return Api.post({
        url: [ServicePages.user, "one"],
        data: params,
    });
}

const updateOne = (params: UserUpdateOneParamDocument) => {
    return Api.put({
        url: [ServicePages.user, "one", params._id.toString()],
        data: params,
    });
}

const deleteOne = (params: UserDeleteOneParamDocument) => {
    return Api.delete({
        url: [ServicePages.user, "one", params._id.toString()],
        data: params,
    });
}


export default {
    getOne: getOne,
    getMany: getMany,
    add: add,
    updateOne: updateOne,
    deleteOne: deleteOne,
}