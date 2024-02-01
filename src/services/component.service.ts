import Api from "./api";
import {ServicePages} from "constants/index";
import {
    ComponentAddParamDocument, ComponentDeleteManyParamDocument,
    ComponentGetResultDocument,
    ComponentGetManyParamDocument,
    ComponentGetOneParamDocument, ComponentUpdateOneParamDocument,
} from "types/services/component";

const getOne = (params: ComponentGetOneParamDocument) => {
    return Api.get<ComponentGetResultDocument | null>({
        url: [ServicePages.component, "one"],
        data: params,
    });
}

const getMany = (params: ComponentGetManyParamDocument) => {
    return Api.get<ComponentGetResultDocument[]>({
        url: [ServicePages.component, "many"],
        data: params,
    });
}

const add = (params: ComponentAddParamDocument) => {
    return Api.post({
        url: [ServicePages.component, "one"],
        data: params,
    });
}

const updateOne = (params: ComponentUpdateOneParamDocument) => {
    return Api.put({
        url: [ServicePages.component, "one", params._id.toString()],
        data: params,
    });
}

const deleteMany = (params: ComponentDeleteManyParamDocument) => {
    return Api.delete({
        url: [ServicePages.component, "many"],
        data: params,
    });
}

export default {
    getOne: getOne,
    getMany: getMany,
    add: add,
    updateOne: updateOne,
    deleteMany: deleteMany,
}