import {ApiEndPoints} from "constants/apiEndPoints";
import {
    ISubscriberAddParamService,
    ISubscriberGetWithIdParamService,
    ISubscriberDeleteWithIdParamService,
    ISubscriberDeleteManyParamService,
    ISubscriberGetResultService,
    ISubscriberGetManyParamService
} from "types/services/subscriber.service";
import ApiRequest from "library/api/request";
import {PathUtil} from "utils/path.util";
import {ISubscriberModel} from "types/models/subscriber.model";

const getWithId = (params: ISubscriberGetWithIdParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.SUBSCRIBER_WITH.GET_WITH_ID(params._id),
        data: params
    }).get<ISubscriberGetResultService>();
}

const getMany = (params: ISubscriberGetManyParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.SUBSCRIBER_WITH.GET,
        data: params
    }).get<ISubscriberGetResultService[]>();
}

const add = (params: ISubscriberAddParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.SUBSCRIBER_WITH.ADD,
        data: params
    }).post<ISubscriberModel>();
}

const deleteWithId = (params: ISubscriberDeleteWithIdParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.SUBSCRIBER_WITH.DELETE_WITH_ID(params._id),
        data: params
    }).delete();
}

const deleteMany = (params: ISubscriberDeleteManyParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.SUBSCRIBER_WITH.DELETE,
        data: params
    }).delete();
}


export const SubscriberService = {
    getWithId: getWithId,
    getMany: getMany,
    add: add,
    deleteWithId: deleteWithId,
    deleteMany: deleteMany,
}