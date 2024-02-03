import Api from "./api";
import {ApiEndPoints} from "constants/index";
import {UserGetResultDocument} from "types/services/user";
import {AuthLoginParamDocument, AuthGetSessionParamDocument} from "types/services/auth";
import {AuthApiEndPoint} from "constants/apiEndPoints/auth.api.EndPoint";

const getSession = (params: AuthGetSessionParamDocument) => {
    return Api.get<UserGetResultDocument>({
        url: [ApiEndPoints.AUTH, AuthApiEndPoint.GET],
        data: params,
    });
}

const login = (params: AuthLoginParamDocument) => {
    return Api.post<UserGetResultDocument>({
        url: [ApiEndPoints.AUTH, AuthApiEndPoint.LOGIN],
        data: params,
    });
}

const logOut = () => {
    return Api.delete({
        url: [ApiEndPoints.AUTH, AuthApiEndPoint.LOGOUT],
    });
}

export default {
    getSession: getSession,
    login: login,
    logOut: logOut
}