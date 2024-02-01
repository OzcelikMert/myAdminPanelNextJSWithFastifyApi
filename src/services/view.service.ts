import Api from "./api";
import {ServicePages} from "constants/index";
import {
    ViewGetStatisticsResultDocument,
    ViewGetNumberResultDocument,
    ViewAddParamDocument,
} from "types/services/view";

const getNumber = () => {
    return Api.get<ViewGetNumberResultDocument>({
        url: [ServicePages.view, "number"]
    });
}

const getStatistics = () => {
    return Api.get<ViewGetStatisticsResultDocument>({
        url: [ServicePages.view, "statistics"]
    });
}

const add = (params: ViewAddParamDocument) => {
    return Api.get({
        url: [ServicePages.view, "one"],
        data: params
    });
}

export default {
    getNumber: getNumber,
    getStatistics: getStatistics,
    add: add,
}