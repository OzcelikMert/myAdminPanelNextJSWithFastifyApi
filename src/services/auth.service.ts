import {ApiEndPoints} from "constants/index";
import {UserGetResultDocument} from "types/services/user.service";
import {AuthLoginParamDocument, AuthGetSessionParamDocument} from "types/services/auth.service";
import {AuthApiEndPoint} from "constants/apiEndPoints/auth.api.EndPoint";
import ApiRequest from "library/api/request";
import pathUtil from "utils/path.util";

const getSession = (params: AuthGetSessionParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.AUTH, AuthApiEndPoint.GET],
        data: params,
    }).get<UserGetResultDocument>();
}

const login = (params: AuthLoginParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.AUTH, AuthApiEndPoint.LOGIN],
        data: params,
    }).post<UserGetResultDocument>();
}

const logOut = () => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.AUTH, AuthApiEndPoint.LOGOUT],
    }).delete();
}

export default {
    getSession: getSession,
    login: login,
    logOut: logOut
}