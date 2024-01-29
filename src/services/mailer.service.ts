import Api from "./api";
import {ServicePages} from "constants/index";
import {MailerSendParamDocument} from "types/services/mailer";

export default {
    send(params: MailerSendParamDocument) {
        return Api.post({
            url: [ServicePages.mailer],
            data: params,
        });
    }
}