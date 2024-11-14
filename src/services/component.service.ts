import { ApiEndPoints } from '@constants/apiEndPoints';
import { PathUtil } from '@utils/path.util';
import { ApiRequest } from '@library/api/request';
import {
  IComponentAddParamService,
  IComponentDeleteManyParamService,
  IComponentGetManyParamService,
  IComponentGetResultService,
  IComponentGetWithKeyParamService,
  IComponentGetWithIdParamService,
  IComponentUpdateWithIdParamService,
} from 'types/services/component.service';
import { IComponentModel } from 'types/models/component.model';

const getWithId = (
  params: IComponentGetWithIdParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.COMPONENT_WITH.GET_WITH_ID(params._id),
    data: params,
    signal: signal,
  }).get<IComponentGetResultService>();
};

const getWithKey = (
  params: IComponentGetWithKeyParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.COMPONENT_WITH.GET_WITH_KEY(params.key),
    data: params,
    signal: signal,
  }).get<IComponentGetResultService>();
};

const getMany = (
  params: IComponentGetManyParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.COMPONENT_WITH.GET,
    data: params,
    signal: signal,
  }).get<IComponentGetResultService[]>();
};

const add = (params: IComponentAddParamService, signal?: AbortSignal) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.COMPONENT_WITH.ADD,
    data: params,
    signal: signal,
  }).post<IComponentModel>();
};

const updateWithId = (
  params: IComponentUpdateWithIdParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.COMPONENT_WITH.UPDATE_WITH_ID(params._id),
    data: params,
    signal: signal,
  }).put();
};

const deleteMany = (
  params: IComponentDeleteManyParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.COMPONENT_WITH.DELETE,
    data: params,
    signal: signal,
  }).delete();
};

export const ComponentService = {
  getWithId: getWithId,
  getWithKey: getWithKey,
  getMany: getMany,
  add: add,
  updateWithId: updateWithId,
  deleteMany: deleteMany,
};
