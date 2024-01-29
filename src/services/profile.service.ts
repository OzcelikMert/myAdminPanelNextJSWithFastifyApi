import Api from "./api";
import {ServicePages} from "constants/index";
import {ProfileChangePasswordParamDocument, ProfileUpdateParamDocument} from "types/services/profile";

export default {
    update(params: ProfileUpdateParamDocument) {
        return Api.put({
            url: [ServicePages.user, "profile"],
            data: params,
        });
    },
    changePassword(params: ProfileChangePasswordParamDocument) {
        return Api.put({
            url: [ServicePages.user, "changePassword"],
            data: params,
        });
    },
}