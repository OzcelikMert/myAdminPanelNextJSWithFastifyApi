import Api from "./api";
import {ServicePages} from "constants/index";
import {
    ComponentAddParamDocument, ComponentDeleteManyParamDocument,
    ComponentGetResultDocument,
    ComponentGetManyParamDocument,
    ComponentGetOneParamDocument, ComponentUpdateOneParamDocument,
} from "types/services/component";

export default {
    getOne(params: ComponentGetOneParamDocument) {
        return Api.get<ComponentGetResultDocument | null>({
            url: [ServicePages.component, "one"],
            data: params,
        });
    },
    getMany(params: ComponentGetManyParamDocument) {
        return Api.get<ComponentGetResultDocument[]>({
            url: [ServicePages.component, "many"],
            data: params,
        });
    },
    add(params: ComponentAddParamDocument) {
        return Api.post({
            url: [ServicePages.component, "one"],
            data: params,
        });
    },
    updateOne(params: ComponentUpdateOneParamDocument) {
        return Api.put({
            url: [ServicePages.component, "one", params._id.toString()],
            data: params,
        });
    },
    delete(params: ComponentDeleteManyParamDocument) {
        return Api.delete({
            url: [ServicePages.component, "many"],
            data: params,
        });
    },
}