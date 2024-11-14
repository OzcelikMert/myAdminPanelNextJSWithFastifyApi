import { ISubscriberModel } from '../models/subscriber.model';

export type ISubscriberGetResultService = {} & ISubscriberModel;

export interface ISubscriberGetWithIdParamService {
  _id: string;
}

export interface ISubscriberGetManyParamService {
  _id?: string[];
  email?: string[];
}

export type ISubscriberAddParamService = {} & Omit<ISubscriberModel, '_id'>;

export interface ISubscriberDeleteWithIdParamService {
  _id: string;
}

export interface ISubscriberDeleteManyParamService {
  _id: string[];
}
