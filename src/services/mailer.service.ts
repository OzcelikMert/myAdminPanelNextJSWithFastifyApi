import {ApiEndPoints} from "constants/apiEndPoints";
import {IMailerSendParamService} from "types/services/mailer.service";
import ApiRequest from "library/api/request";
import {PathUtil} from "utils/path.util";

const send = (params: IMailerSendParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.MAILER_WITH.SEND,
        data: params,
    }).post();
}

export default {
    send: send
}