import {ApiEndPoints} from "constants/index";
import ServerInfoDocument from "types/services/serverInfo";
import {ServerInfoApiEndPoint} from "constants/apiEndPoints/serverInfo.api.endPoint";
import ApiRequest from "library/api/request";
import pathUtil from "utils/path.util";

const get = () => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.SERVER_INFO, ServerInfoApiEndPoint.GET]
    }).get<ServerInfoDocument>();
}

export default {
    get: get,
}