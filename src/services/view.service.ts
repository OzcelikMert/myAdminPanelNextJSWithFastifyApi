import {ApiEndPoints} from "constants/index";
import {
    ViewGetStatisticsResultDocument,
    ViewGetNumberResultDocument,
    ViewAddParamDocument,
} from "types/services/view.service";
import {ViewApiEndPoint} from "constants/apiEndPoints/view.api.endPoint";
import ApiRequest from "library/api/request";
import pathUtil from "utils/path.util";

const getNumber = () => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.VIEW, ViewApiEndPoint.GET_NUMBER]
    }).get<ViewGetNumberResultDocument>();
}

const getStatistics = () => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.VIEW, ViewApiEndPoint.GET_STATISTICS]
    }).get<ViewGetStatisticsResultDocument>();
}

const add = (params: ViewAddParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.VIEW, ViewApiEndPoint.ADD],
        data: params
    }).get();
}

export default {
    getNumber: getNumber,
    getStatistics: getStatistics,
    add: add,
}