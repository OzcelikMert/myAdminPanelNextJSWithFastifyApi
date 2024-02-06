import {ApiEndPoints} from "constants/apiEndPoints";
import {MailerSendParamDocument} from "types/services/mailer.service";
import {MailerApiEndPoint} from "constants/apiEndPoints/mailer.api.endPoint";
import ApiRequest from "library/api/request";
import pathUtil from "utils/path.util";

const send = (params: MailerSendParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.MAILER, MailerApiEndPoint.SEND],
        data: params,
    }).post();
}

export default {
    send: send
}