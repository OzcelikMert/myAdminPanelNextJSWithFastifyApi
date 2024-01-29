import Api from "./api";
import {ServicePages} from "constants/index";
import {UserGetResultDocument} from "types/services/user";
import {AuthLoginParamDocument, AuthGetSessionParamDocument} from "types/services/auth";

export default {
    getSession(params: AuthGetSessionParamDocument) {
        return Api.get<UserGetResultDocument>({
            url: [ServicePages.auth],
            data: params,
        });
    },
    login(params: AuthLoginParamDocument) {
        return Api.post<UserGetResultDocument>({
            url: [ServicePages.auth],
            data: params,
        });
    },
    logOut() {
        return Api.delete({
            url: [ServicePages.auth],
        });
    },
}