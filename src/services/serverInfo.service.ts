import Api from "./api";
import {ServicePages} from "constants/index";
import ServerInfoDocument from "types/services/serverInfo";

export default {
    get() {
        return Api.get<ServerInfoDocument>({
            url: [ServicePages.serverInfo]
        });
    },
}