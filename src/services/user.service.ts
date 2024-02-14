import {ApiEndPoints} from "constants/apiEndPoints";
import {
    IUserGetOneParamService,
    IUserGetManyParamService,
    IUserUpdateOneParamService,
    IUserGetResultService,
    IUserAddParamService,
    IUserDeleteOneParamService, IUserUpdateProfileParamService, IUserUpdatePasswordParamService
} from "types/services/user.service";
import ApiRequest from "library/api/request";
import {PathUtil} from "utils/path.util";

const getOne = (params: IUserGetOneParamService) => {
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
    }).post();
}

const updateOne = (params: IUserUpdateOneParamService) => {
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

const deleteOne = (params: IUserDeleteOneParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.USER_WITH.DELETE_WITH_ID(params._id),
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