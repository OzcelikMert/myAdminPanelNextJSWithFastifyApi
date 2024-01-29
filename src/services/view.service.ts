import Api from "./api";
import {ServicePages} from "constants/index";
import {
    ViewGetStatisticsResultDocument,
    ViewGetNumberResultDocument,
    ViewAddParamDocument,
} from "types/services/view";

export default {
    getNumber() {
        return Api.get<ViewGetNumberResultDocument>({
            url: [ServicePages.view, "number"]
        });
    },
    getStatistics() {
        return Api.get<ViewGetStatisticsResultDocument>({
            url: [ServicePages.view, "statistics"]
        });
    },
    add(params: ViewAddParamDocument) {
        return Api.get({
            url: [ServicePages.view, "one"],
            data: params
        });
    },
}