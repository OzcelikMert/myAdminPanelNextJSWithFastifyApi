import Api from "./api";
import {ServicePages} from "constants/index";
import {
    SubscriberAddDocument,
    SubscriberGetOneParamDocument,
    SubscriberDeleteOneParamDocument,
    SubscriberDeleteManyParamDocument,
    SubscriberGetResultDocument,
    SubscriberGetManyParamDocument
} from "types/services/subscriber";

const getOne = (params: SubscriberGetOneParamDocument) => {
    return Api.get<SubscriberGetResultDocument | null>({
        url: [ServicePages.subscriber, "one"],
        data: params
    });
}

const getMany = (params: SubscriberGetManyParamDocument) => {
    return Api.get<SubscriberGetResultDocument[]>({
        url: [ServicePages.subscriber, "many"],
        data: params
    });
}

const add = (params: SubscriberAddDocument) => {
    return Api.post({
        url: [ServicePages.subscriber, "one"],
        data: params
    });
}

const deleteOne = (params: SubscriberDeleteOneParamDocument) => {
    return Api.delete({
        url: [ServicePages.subscriber, "one"],
        data: params
    });
}

const deleteMany = (params: SubscriberDeleteManyParamDocument) => {
    return Api.delete({
        url: [ServicePages.subscriber, "many"],
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