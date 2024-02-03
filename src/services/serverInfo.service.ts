import Api from "./api";
import {ApiEndPoints} from "constants/index";
import ServerInfoDocument from "types/services/serverInfo";
import {ServerInfoApiEndPoint} from "constants/apiEndPoints/serverInfo.api.endPoint";

const get = () => {
    return Api.get<ServerInfoDocument>({
        url: [ApiEndPoints.SERVER_INFO, ServerInfoApiEndPoint.GET]
    });
}

export default {
    get: get,
}