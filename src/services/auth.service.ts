import {ApiEndPoints} from "constants/apiEndPoints";
import {IUserGetResultService} from "types/services/user.service";
import {IAuthLoginParamService, AuthGetSessionParamDocument} from "types/services/auth.service";
import {AuthApiEndPoint} from "constants/apiEndPoints/auth.api.EndPoint";
import ApiRequest from "library/api/request";
import pathUtil from "utils/path.util";

const getSession = (params: AuthGetSessionParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.AUTH, AuthApiEndPoint.GET],
        data: params,
    }).get<IUserGetResultService>();
}

const login = (params: IAuthLoginParamService) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.AUTH, AuthApiEndPoint.LOGIN],
        data: params,
    }).post<IUserGetResultService>();
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