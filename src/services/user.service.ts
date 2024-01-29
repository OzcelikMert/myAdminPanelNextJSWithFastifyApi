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

export default {
    getOne(params: UserGetOneParamDocument) {
        return Api.get<UserGetResultDocument | null>({
            url: [ServicePages.user, "one"],
            data: params,
        });
    },
    getMany(params: UserGetManyParamDocument) {
        return Api.get<UserGetResultDocument[]>({
            url: [ServicePages.user, "many"],
            data: params,
        });
    },
    add(params: UserAddParamDocument) {
        return Api.post({
            url: [ServicePages.user, "one"],
            data: params,
        });
    },
    updateOne(params: UserUpdateOneParamDocument) {
        return Api.put({
            url: [ServicePages.user, "one", params._id.toString()],
            data: params,
        });
    },
    deleteOne(params: UserDeleteOneParamDocument) {
        return Api.delete({
            url: [ServicePages.user, "one", params._id.toString()],
            data: params,
        });
    },
}