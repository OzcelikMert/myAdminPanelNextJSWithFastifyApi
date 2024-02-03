import Api from "./api";
import {ApiEndPoints} from "constants/index";
import {
    ViewGetStatisticsResultDocument,
    ViewGetNumberResultDocument,
    ViewAddParamDocument,
} from "types/services/view";
import {ViewApiEndPoint} from "constants/apiEndPoints/view.api.endPoint";

const getNumber = () => {
    return Api.get<ViewGetNumberResultDocument>({
        url: [ApiEndPoints.VIEW, ViewApiEndPoint.GET_NUMBER]
    });
}

const getStatistics = () => {
    return Api.get<ViewGetStatisticsResultDocument>({
        url: [ApiEndPoints.VIEW, ViewApiEndPoint.GET_STATISTICS]
    });
}

const add = (params: ViewAddParamDocument) => {
    return Api.get({
        url: [ApiEndPoints.VIEW, ViewApiEndPoint.ADD],
        data: params
    });
}

export default {
    getNumber: getNumber,
    getStatistics: getStatistics,
    add: add,
}