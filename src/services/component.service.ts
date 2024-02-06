import {
    ComponentAddParamDocument, ComponentDeleteManyParamDocument,
    ComponentGetResultDocument,
    ComponentGetManyParamDocument,
    ComponentGetOneParamDocument, ComponentUpdateOneParamDocument,
} from "types/services/component.service";
import {ComponentApiEndPoint} from "constants/apiEndPoints/component.api.endPoint";
import ApiRequest from "library/api/request";
import pathUtil from "utils/path.util";
import {ApiEndPoints} from "constants/apiEndPoints";

const getOne = (params: ComponentGetOneParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.COMPONENT, ComponentApiEndPoint.GET_WITH_ID(params._id)],
        data: params,
    }).get<ComponentGetResultDocument>();
}

const getMany = (params: ComponentGetManyParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.COMPONENT, ComponentApiEndPoint.GET],
        data: params,
    }).get<ComponentGetResultDocument[]>();
}

const add = (params: ComponentAddParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.COMPONENT, ComponentApiEndPoint.ADD],
        data: params,
    }).post();
}

const updateOne = (params: ComponentUpdateOneParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.COMPONENT, ComponentApiEndPoint.UPDATE_WITH_ID(params._id)],
        data: params,
    }).put();
}

const deleteMany = (params: ComponentDeleteManyParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.COMPONENT, ComponentApiEndPoint.DELETE],
        data: params,
    }).delete();
}

export default {
    getOne: getOne,
    getMany: getMany,
    add: add,
    updateOne: updateOne,
    deleteMany: deleteMany,
}