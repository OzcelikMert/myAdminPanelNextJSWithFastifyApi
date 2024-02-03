import Api from "./api";
import {ApiEndPoints} from "constants/index";
import {
    ComponentAddParamDocument, ComponentDeleteManyParamDocument,
    ComponentGetResultDocument,
    ComponentGetManyParamDocument,
    ComponentGetOneParamDocument, ComponentUpdateOneParamDocument,
} from "types/services/component";
import {ComponentApiEndPoint} from "constants/apiEndPoints/component.api.endPoint";

const getOne = (params: ComponentGetOneParamDocument) => {
    return Api.get<ComponentGetResultDocument | null>({
        url: [ApiEndPoints.COMPONENT, ComponentApiEndPoint.GET_WITH_ID(params._id)],
        data: params,
    });
}

const getMany = (params: ComponentGetManyParamDocument) => {
    return Api.get<ComponentGetResultDocument[]>({
        url: [ApiEndPoints.COMPONENT, ComponentApiEndPoint.GET],
        data: params,
    });
}

const add = (params: ComponentAddParamDocument) => {
    return Api.post({
        url: [ApiEndPoints.COMPONENT, ComponentApiEndPoint.ADD],
        data: params,
    });
}

const updateOne = (params: ComponentUpdateOneParamDocument) => {
    return Api.put({
        url: [ApiEndPoints.COMPONENT, ComponentApiEndPoint.UPDATE_WITH_ID(params._id)],
        data: params,
    });
}

const deleteMany = (params: ComponentDeleteManyParamDocument) => {
    return Api.delete({
        url: [ApiEndPoints.COMPONENT, ComponentApiEndPoint.DELETE],
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