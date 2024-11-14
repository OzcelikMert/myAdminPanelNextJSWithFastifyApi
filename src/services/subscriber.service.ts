import { ApiEndPoints } from '@constants/apiEndPoints';
import {
  ISubscriberAddParamService,
  ISubscriberGetWithIdParamService,
  ISubscriberDeleteWithIdParamService,
  ISubscriberDeleteManyParamService,
  ISubscriberGetResultService,
  ISubscriberGetManyParamService,
} from 'types/services/subscriber.service';
import { ApiRequest } from '@library/api/request';
import { PathUtil } from '@utils/path.util';
import { ISubscriberModel } from 'types/models/subscriber.model';

const getWithId = (
  params: ISubscriberGetWithIdParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.SUBSCRIBER_WITH.GET_WITH_ID(params._id),
    data: params,
    signal: signal,
  }).get<ISubscriberGetResultService>();
};

const getMany = (
  params: ISubscriberGetManyParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.SUBSCRIBER_WITH.GET,
    data: params,
    signal: signal,
  }).get<ISubscriberGetResultService[]>();
};

const add = (params: ISubscriberAddParamService, signal?: AbortSignal) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.SUBSCRIBER_WITH.ADD,
    data: params,
    signal: signal,
  }).post<ISubscriberModel>();
};

const deleteWithId = (
  params: ISubscriberDeleteWithIdParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.SUBSCRIBER_WITH.DELETE_WITH_ID(params._id),
    data: params,
    signal: signal,
  }).delete();
};

const deleteMany = (
  params: ISubscriberDeleteManyParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.SUBSCRIBER_WITH.DELETE,
    data: params,
    signal: signal,
  }).delete();
};

export const SubscriberService = {
  getWithId: getWithId,
  getMany: getMany,
  add: add,
  deleteWithId: deleteWithId,
  deleteMany: deleteMany,
};
