import {ApiEndPoints} from "constants/apiEndPoints";
import {IUserGetResultService} from "types/services/user.service";
import {IAuthLoginParamService} from "types/services/auth.service";
import {AuthApiEndPoint} from "constants/apiEndPoints/auth.api.EndPoint";
import ApiRequest from "library/api/request";
import {PathUtil} from "utils/path.util";
import {ISessionAuthModel} from "types/models/sessionAuth.model";

const getSession = () => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoints: [ApiEndPoints.AUTH, AuthApiEndPoint.GET]
    }).get<ISessionAuthModel>();
}

const login = (params: IAuthLoginParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoints: [ApiEndPoints.AUTH, AuthApiEndPoint.LOGIN],
        data: params,
    }).post<IUserGetResultService>();
}

const logOut = () => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoints: [ApiEndPoints.AUTH, AuthApiEndPoint.LOGOUT],
    }).delete();
}

export default {
    getSession: getSession,
    login: login,
    logOut: logOut
}