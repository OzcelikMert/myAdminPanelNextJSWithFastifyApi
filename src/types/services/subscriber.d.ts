import {SubscriberDocument} from "../models/subscriber";

export type SubscriberGetResultDocument = {} & SubscriberDocument

export interface SubscriberGetOneParamDocument {
    _id?: string
    email?: string
}

export interface SubscriberGetManyParamDocument {
    _id?: string[]
    email?: string
}

export type SubscriberAddDocument = {} & Omit<SubscriberDocument, "_id">

export interface SubscriberDeleteOneParamDocument {
    email: string
    _id: string
}

export interface SubscriberDeleteManyParamDocument {
    _id: string[]
}