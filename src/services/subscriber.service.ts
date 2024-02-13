import {ApiEndPoints} from "constants/apiEndPoints";
import {
    ISubscriberAddParamService,
    ISubscriberGetOneParamService,
    ISubscriberDeleteOneParamService,
    ISubscriberDeleteManyParamService,
    ISubscriberGetResultService,
    ISubscriberGetManyParamService
} from "types/services/subscriber.service";
import {SubscriberApiEndPoint} from "constants/apiEndPoints/subscriber.api.endPoint";
import ApiRequest from "library/api/request";
import {PathUtil} from "utils/path.util";

const getOne = (params: ISubscriberGetOneParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoints: [ApiEndPoints.SUBSCRIBER, SubscriberApiEndPoint.GET_WITH_ID(params._id)],
        data: params
    }).get<ISubscriberGetResultService>();
}

const getMany = (params: ISubscriberGetManyParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoints: [ApiEndPoints.SUBSCRIBER, SubscriberApiEndPoint.GET],
        data: params
    }).get<ISubscriberGetResultService[]>();
}

const add = (params: ISubscriberAddParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoints: [ApiEndPoints.SUBSCRIBER, SubscriberApiEndPoint.ADD],
        data: params
    }).post();
}

const deleteOne = (params: ISubscriberDeleteOneParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoints: [ApiEndPoints.SUBSCRIBER, SubscriberApiEndPoint.DELETE_WITH_ID(params._id)],
        data: params
    }).delete();
}

const deleteMany = (params: ISubscriberDeleteManyParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoints: [ApiEndPoints.SUBSCRIBER, SubscriberApiEndPoint.DELETE],
        data: params
    }).delete();
}


export default {
    getOne: getOne,
    getMany: getMany,
    add: add,
    deleteOne: deleteOne,
    deleteMany: deleteMany,
}