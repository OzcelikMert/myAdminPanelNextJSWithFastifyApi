import {ApiEndPoints} from "constants/apiEndPoints";
import {IMailerSendParamService} from "types/services/mailer.service";
import {MailerApiEndPoint} from "constants/apiEndPoints/mailer.api.endPoint";
import ApiRequest from "library/api/request";
import {PathUtil} from "utils/path.util";

const send = (params: IMailerSendParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoints: [ApiEndPoints.MAILER, MailerApiEndPoint.SEND],
        data: params,
    }).post();
}

export default {
    send: send
}