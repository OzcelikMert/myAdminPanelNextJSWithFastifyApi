import {ApiEndPoints} from "constants/apiEndPoints";
import {
    IViewGetStatisticsResultService,
    IViewGetNumberResultService,
    IViewAddParamService,
} from "types/services/view.service";
import {ViewApiEndPoint} from "constants/apiEndPoints/view.api.endPoint";
import ApiRequest from "library/api/request";
import {PathUtil} from "utils/path.util";

const getNumber = () => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoints: [ApiEndPoints.VIEW, ViewApiEndPoint.GET_NUMBER]
    }).get<IViewGetNumberResultService>();
}

const getStatistics = () => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoints: [ApiEndPoints.VIEW, ViewApiEndPoint.GET_STATISTICS]
    }).get<IViewGetStatisticsResultService>();
}

const add = (params: IViewAddParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoints: [ApiEndPoints.VIEW, ViewApiEndPoint.ADD],
        data: params
    }).get();
}

export default {
    getNumber: getNumber,
    getStatistics: getStatistics,
    add: add,
}