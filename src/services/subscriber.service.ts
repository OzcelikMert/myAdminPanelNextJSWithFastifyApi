import Api from "./api";
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

const getOne = (params: SubscriberGetOneParamDocument) => {
    return Api.get<SubscriberGetResultDocument | null>({
        url: [ApiEndPoints.SUBSCRIBER, SubscriberApiEndPoint.GET_WITH_ID(params._id)],
        data: params
    });
}

const getMany = (params: SubscriberGetManyParamDocument) => {
    return Api.get<SubscriberGetResultDocument[]>({
        url: [ApiEndPoints.SUBSCRIBER, SubscriberApiEndPoint.GET],
        data: params
    });
}

const add = (params: SubscriberAddDocument) => {
    return Api.post({
        url: [ApiEndPoints.SUBSCRIBER, SubscriberApiEndPoint.ADD],
        data: params
    });
}

const deleteOne = (params: SubscriberDeleteOneParamDocument) => {
    return Api.delete({
        url: [ApiEndPoints.SUBSCRIBER, SubscriberApiEndPoint.DELETE_WITH_ID(params._id)],
        data: params
    });
}

const deleteMany = (params: SubscriberDeleteManyParamDocument) => {
    return Api.delete({
        url: [ApiEndPoints.SUBSCRIBER, SubscriberApiEndPoint.DELETE],
        data: params
    });
}


export default {
    getOne: getOne,
    getMany: getMany,
    add: add,
    deleteOne: deleteOne,
    deleteMany: deleteMany,
}