import {ApiEndPoints} from "constants/apiEndPoints";
import {IUserGetResultService} from "types/services/user.service";
import {IAuthLoginParamService} from "types/services/auth.service";
import ApiRequest from "library/api/request";
import {PathUtil} from "utils/path.util";
import {ISessionAuthModel} from "types/models/sessionAuth.model";

const getSession = () => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.AUTH_WITH.GET
    }).get<ISessionAuthModel>();
}

const login = (params: IAuthLoginParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.AUTH_WITH.LOGIN,
        data: params,
    }).post<IUserGetResultService>();
}

const logOut = () => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.AUTH_WITH.LOGOUT,
    }).delete();
}

export const AuthService = {
    getSession: getSession,
    login: login,
    logOut: logOut
}