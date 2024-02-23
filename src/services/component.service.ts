import {
    IComponentAddParamService, IComponentDeleteManyParamService,
    IComponentGetResultService,
    IComponentGetManyParamService,
    IComponentGetWithIdParamService, IComponentUpdateWithIdParamService,
} from "types/services/component.service";
import ApiRequest from "library/api/request";
import {PathUtil} from "utils/path.util";
import {ApiEndPoints} from "constants/apiEndPoints";

const getWithId = (params: IComponentGetWithIdParamService) => {
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

const updateWithId = (params: IComponentUpdateWithIdParamService) => {
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
    getWithId: getWithId,
    getMany: getMany,
    add: add,
    updateWithId: updateWithId,
    deleteMany: deleteMany,
}