import {ApiEndPoints} from "constants/apiEndPoints";
import {
    IUserGetWithIdParamService,
    IUserGetManyParamService,
    IUserUpdateWithIdParamService,
    IUserGetResultService,
    IUserAddParamService,
    IUserDeleteWithIdParamService, IUserUpdateProfileParamService, IUserUpdatePasswordParamService
} from "types/services/user.service";
import ApiRequest from "library/api/request";
import {PathUtil} from "utils/path.util";
import {IUserModel} from "types/models/user.model";

const getWithId = (params: IUserGetWithIdParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.USER_WITH.GET_WITH_ID(params._id),
        data: params,
    }).get<IUserGetResultService>();
}

const getMany = (params: IUserGetManyParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.USER_WITH.GET,
        data: params,
    }).get<IUserGetResultService[]>();
}

const add = (params: IUserAddParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.USER_WITH.ADD,
        data: params,
    }).post<IUserModel>();
}

const updateWithId = (params: IUserUpdateWithIdParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.USER_WITH.UPDATE_WITH_ID(params._id),
        data: params,
    }).put();
}

const updateProfile = (params: IUserUpdateProfileParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.USER_WITH.UPDATE_PROFILE,
        data: params,
    }).put();
}

const updatePassword = (params: IUserUpdatePasswordParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.USER_WITH.UPDATE_PASSWORD,
        data: params,
    }).put();
}

const deleteWithId = (params: IUserDeleteWithIdParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.USER_WITH.DELETE_WITH_ID(params._id),
        data: params,
    }).delete();
}

export const UserService = {
    getWithId: getWithId,
    getMany: getMany,
    add: add,
    updateWithId: updateWithId,
    updateProfile: updateProfile,
    updatePassword: updatePassword,
    deleteWithId: deleteWithId,
}