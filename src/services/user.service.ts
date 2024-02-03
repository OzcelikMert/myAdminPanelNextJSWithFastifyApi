import Api from "./api";
import {ApiEndPoints} from "constants/index";
import {
    UserGetOneParamDocument,
    UserGetManyParamDocument,
    UserUpdateOneParamDocument,
    UserGetResultDocument,
    UserAddParamDocument,
    UserDeleteOneParamDocument, UserUpdateProfileParamDocument, UserUpdatePasswordParamDocument
} from "types/services/user";
import {UserApiEndPoint} from "constants/apiEndPoints/user.api.endPoint";

const getOne = (params: UserGetOneParamDocument) => {
    return Api.get<UserGetResultDocument | null>({
        url: [ApiEndPoints.USER, UserApiEndPoint.GET_WITH_ID(params._id)],
        data: params,
    });
}

const getMany = (params: UserGetManyParamDocument) => {
    return Api.get<UserGetResultDocument[]>({
        url: [ApiEndPoints.USER, UserApiEndPoint.GET],
        data: params,
    });
}

const add = (params: UserAddParamDocument) => {
    return Api.post({
        url: [ApiEndPoints.USER, UserApiEndPoint.ADD],
        data: params,
    });
}

const updateOne = (params: UserUpdateOneParamDocument) => {
    return Api.put({
        url: [ApiEndPoints.USER, UserApiEndPoint.UPDATE_WITH_ID(params._id)],
        data: params,
    });
}

const updateProfile = (params: UserUpdateProfileParamDocument) => {
    return Api.put({
        url: [ApiEndPoints.USER, UserApiEndPoint.UPDATE_PROFILE],
        data: params,
    });
}

const updatePassword = (params: UserUpdatePasswordParamDocument) => {
    return Api.put({
        url: [ApiEndPoints.USER, UserApiEndPoint.UPDATE_PASSWORD],
        data: params,
    });
}

const deleteOne = (params: UserDeleteOneParamDocument) => {
    return Api.delete({
        url: [ApiEndPoints.USER, UserApiEndPoint.DELETE_WITH_ID(params._id)],
        data: params,
    });
}

export default {
    getOne: getOne,
    getMany: getMany,
    add: add,
    updateOne: updateOne,
    updateProfile: updateProfile,
    updatePassword: updatePassword,
    deleteOne: deleteOne,
}