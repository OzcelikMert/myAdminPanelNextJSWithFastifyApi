import Api from "./api";
import {ApiEndPoints} from "constants/index";
import {MailerSendParamDocument} from "types/services/mailer";
import {MailerApiEndPoint} from "constants/apiEndPoints/mailer.api.endPoint";

const send = (params: MailerSendParamDocument) => {
    return Api.post({
        url: [ApiEndPoints.MAILER, MailerApiEndPoint.SEND],
        data: params,
    });
}

export default {
    send: send
}