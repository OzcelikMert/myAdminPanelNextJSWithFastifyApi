import { ApiEndPoints } from '@constants/apiEndPoints';
import {
  INavigationAddParamService,
  INavigationGetWithIdParamService,
  INavigationDeleteManyParamService,
  INavigationGetManyParamService,
  INavigationUpdateStatusManyIdParamService,
  INavigationGetResultService,
  INavigationUpdateWithIdParamService,
  INavigationUpdateRankWithIdParamService,
} from 'types/services/navigation.service';
import { PathUtil } from '@utils/path.util';
import { ApiRequest } from '@library/api/request';
import { INavigationModel } from 'types/models/navigation.model';

const getWithId = (
  params: INavigationGetWithIdParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.NAVIGATION_WITH.GET_WITH_ID(params._id),
    data: params,
    signal: signal,
  }).get<INavigationGetResultService>();
};

const getMany = (
  params: INavigationGetManyParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.NAVIGATION_WITH.GET,
    data: params,
    signal: signal,
  }).get<INavigationGetResultService[]>();
};

const add = (params: INavigationAddParamService, signal?: AbortSignal) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.NAVIGATION_WITH.ADD,
    data: params,
    signal: signal,
  }).post<INavigationModel>();
};

const updateWithId = (
  params: INavigationUpdateWithIdParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.NAVIGATION_WITH.UPDATE_WITH_ID(params._id),
    data: params,
    signal: signal,
  }).put();
};

const updateRankWithId = (
  params: INavigationUpdateRankWithIdParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.NAVIGATION_WITH.UPDATE_RANK_WITH_ID(params._id),
    data: params,
    signal: signal,
  }).put();
};

const updateStatusMany = (
  params: INavigationUpdateStatusManyIdParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.NAVIGATION_WITH.UPDATE_STATUS,
    data: params,
    signal: signal,
  }).put();
};

const deleteMany = (
  params: INavigationDeleteManyParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.NAVIGATION_WITH.DELETE,
    data: params,
    signal: signal,
  }).delete();
};

export const NavigationService = {
  getWithId: getWithId,
  getMany: getMany,
  add: add,
  updateWithId: updateWithId,
  updateRankWithId: updateRankWithId,
  updateStatusMany: updateStatusMany,
  deleteMany: deleteMany,
};
