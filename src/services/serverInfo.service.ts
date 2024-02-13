import {ApiEndPoints} from "constants/apiEndPoints";
import IServerInfoGetResultService from "types/services/serverInfo.service";
import {ServerInfoApiEndPoint} from "constants/apiEndPoints/serverInfo.api.endPoint";
import ApiRequest from "library/api/request";
import pathUtil from "utils/path.util";

const get = () => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.SERVER_INFO, ServerInfoApiEndPoint.GET]
    }).get<IServerInfoGetResultService>();
}

export default {
    get: get,
}