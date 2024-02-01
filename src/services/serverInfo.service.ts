import Api from "./api";
import {ServicePages} from "constants/index";
import ServerInfoDocument from "types/services/serverInfo";

const get = () => {
    return Api.get<ServerInfoDocument>({
        url: [ServicePages.serverInfo]
    });
}

export default {
    get: get,
}