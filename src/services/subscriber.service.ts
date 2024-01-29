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

export default {
    getOne(params: SubscriberGetOneParamDocument) {
        return Api.get<SubscriberGetResultDocument | null>({
            url: [ServicePages.subscriber, "one"],
            data: params
        });
    },
    getMany(params: SubscriberGetManyParamDocument) {
        return Api.get<SubscriberGetResultDocument[]>({
            url: [ServicePages.subscriber, "many"],
            data: params
        });
    },
    add(params: SubscriberAddDocument) {
        return Api.post({
            url: [ServicePages.subscriber, "one"],
            data: params
        });
    },
    deleteOne(params: SubscriberDeleteOneParamDocument) {
        return Api.delete({
            url: [ServicePages.subscriber, "one"],
            data: params
        });
    },
    deleteMany(params: SubscriberDeleteManyParamDocument) {
        return Api.delete({
            url: [ServicePages.subscriber, "many"],
            data: params
        });
    },
}