import Api from "./api";
import {ServicePages} from "constants/index";
import {UserGetResultDocument} from "types/services/user";
import {AuthLoginParamDocument, AuthGetSessionParamDocument} from "types/services/auth";

const getSession = (params: AuthGetSessionParamDocument) => {
    return Api.get<UserGetResultDocument>({
        url: [ServicePages.auth],
        data: params,
    });
}

const login = (params: AuthLoginParamDocument) => {
    return Api.post<UserGetResultDocument>({
        url: [ServicePages.auth],
        data: params,
    });
}

const logOut = () => {
    return Api.delete({
        url: [ServicePages.auth],
    });
}

export default {
    getSession: getSession,
    login: login,
    logOut: logOut
}