import {ISubscriberModel} from "../models/subscriber.model";

export type ISubscriberGetResultService = {} & ISubscriberModel

export interface ISubscriberGetOneParamService {
    _id: string
}

export interface ISubscriberGetManyParamService {
    _id?: string[]
    email?: string[]
}

export type ISubscriberAddParamService = {} & Omit<ISubscriberModel, "_id">

export interface ISubscriberDeleteOneParamService {
    _id: string
}

export interface ISubscriberDeleteManyParamService {
    _id: string[]
}