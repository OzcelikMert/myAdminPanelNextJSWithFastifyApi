import {ApiEndPoints} from "constants/apiEndPoints";
import {
    IViewGetStatisticsResultService,
    IViewGetNumberResultService,
    IViewAddParamService,
} from "types/services/view.service";
import ApiRequest from "library/api/request";
import {PathUtil} from "utils/path.util";
import {IViewModel} from "types/models/view.model";

const getNumber = () => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.VIEW_WITH.GET_NUMBER
    }).get<IViewGetNumberResultService>();
}

const getStatistics = () => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.VIEW_WITH.GET_STATISTICS
    }).get<IViewGetStatisticsResultService>();
}

const add = (params: IViewAddParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.VIEW_WITH.ADD,
        data: params
    }).post<IViewModel>();
}

export const ViewService = {
    getNumber: getNumber,
    getStatistics: getStatistics,
    add: add,
}