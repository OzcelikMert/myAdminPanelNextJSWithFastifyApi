import {
    IComponentAddParamService, IComponentDeleteManyParamService,
    IComponentGetResultService,
    IComponentGetManyParamService,
    IComponentGetOneParamService, IComponentUpdateOneParamService,
} from "types/services/component.service";
import ApiRequest from "library/api/request";
import {PathUtil} from "utils/path.util";
import {ApiEndPoints} from "constants/apiEndPoints";

const getOne = (params: IComponentGetOneParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.COMPONENT_WITH.GET_WITH_ID(params._id),
        data: params,
    }).get<IComponentGetResultService>();
}

const getMany = (params: IComponentGetManyParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.COMPONENT_WITH.GET,
        data: params,
    }).get<IComponentGetResultService[]>();
}

const add = (params: IComponentAddParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.COMPONENT_WITH.ADD,
        data: params,
    }).post();
}

const updateOne = (params: IComponentUpdateOneParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.COMPONENT_WITH.UPDATE_WITH_ID(params._id),
        data: params,
    }).put();
}

const deleteMany = (params: IComponentDeleteManyParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.COMPONENT_WITH.DELETE,
        data: params,
    }).delete();
}

export const ComponentService = {
    getOne: getOne,
    getMany: getMany,
    add: add,
    updateOne: updateOne,
    deleteMany: deleteMany,
}