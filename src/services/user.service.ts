import {ApiEndPoints} from "constants/apiEndPoints";
import {
    UserGetOneParamDocument,
    UserGetManyParamDocument,
    UserUpdateOneParamDocument,
    UserGetResultDocument,
    UserAddParamDocument,
    UserDeleteOneParamDocument, UserUpdateProfileParamDocument, UserUpdatePasswordParamDocument
} from "types/services/user.service";
import {UserApiEndPoint} from "constants/apiEndPoints/user.api.endPoint";
import ApiRequest from "library/api/request";
import pathUtil from "utils/path.util";

const getOne = (params: UserGetOneParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.USER, UserApiEndPoint.GET_WITH_ID(params._id)],
        data: params,
    }).get<UserGetResultDocument>();
}

const getMany = (params: UserGetManyParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.USER, UserApiEndPoint.GET],
        data: params,
    }).get<UserGetResultDocument[]>();
}

const add = (params: UserAddParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.USER, UserApiEndPoint.ADD],
        data: params,
    }).post();
}

const updateOne = (params: UserUpdateOneParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.USER, UserApiEndPoint.UPDATE_WITH_ID(params._id)],
        data: params,
    }).put();
}

const updateProfile = (params: UserUpdateProfileParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.USER, UserApiEndPoint.UPDATE_PROFILE],
        data: params,
    }).put();
}

const updatePassword = (params: UserUpdatePasswordParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.USER, UserApiEndPoint.UPDATE_PASSWORD],
        data: params,
    }).put();
}

const deleteOne = (params: UserDeleteOneParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.USER, UserApiEndPoint.DELETE_WITH_ID(params._id)],
        data: params,
    }).delete();
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