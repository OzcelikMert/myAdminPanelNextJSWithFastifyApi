import {ApiEndPoints} from "constants/index";
import {
    SubscriberAddDocument,
    SubscriberGetOneParamDocument,
    SubscriberDeleteOneParamDocument,
    SubscriberDeleteManyParamDocument,
    SubscriberGetResultDocument,
    SubscriberGetManyParamDocument
} from "types/services/subscriber";
import {SubscriberApiEndPoint} from "constants/apiEndPoints/subscriber.api.endPoint";
import ApiRequest from "library/api/request";
import pathUtil from "utils/path.util";

const getOne = (params: SubscriberGetOneParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.SUBSCRIBER, SubscriberApiEndPoint.GET_WITH_ID(params._id)],
        data: params
    }).get<SubscriberGetResultDocument>();
}

const getMany = (params: SubscriberGetManyParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.SUBSCRIBER, SubscriberApiEndPoint.GET],
        data: params
    }).get<SubscriberGetResultDocument[]>();
}

const add = (params: SubscriberAddDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.SUBSCRIBER, SubscriberApiEndPoint.ADD],
        data: params
    }).post();
}

const deleteOne = (params: SubscriberDeleteOneParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.SUBSCRIBER, SubscriberApiEndPoint.DELETE_WITH_ID(params._id)],
        data: params
    }).delete();
}

const deleteMany = (params: SubscriberDeleteManyParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
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