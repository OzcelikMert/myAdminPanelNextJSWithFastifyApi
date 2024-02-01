import Api from "./api";
import {ServicePages} from "constants/index";
import {ProfileChangePasswordParamDocument, ProfileUpdateParamDocument} from "types/services/profile";

const update = (params: ProfileUpdateParamDocument) => {
    return Api.put({
        url: [ServicePages.user, "profile"],
        data: params,
    });
}

const changePassword = (params: ProfileChangePasswordParamDocument) => {
    return Api.put({
        url: [ServicePages.user, "changePassword"],
        data: params,
    });
}

export default {
    update: update,
    changePassword: changePassword,
}