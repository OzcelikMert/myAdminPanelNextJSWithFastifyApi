import { ApiEndPoints } from '@constants/apiEndPoints';
import {
  IPostTermGetResultService,
  IPostTermUpdateStatusManyParamService,
  IPostTermUpdateRankWithIdParamService,
  IPostTermAddParamService,
  IPostTermGetManyParamService,
  IPostTermUpdateWithIdParamService,
  IPostTermGetWithIdParamService,
  IPostTermDeleteManyParamService,
} from 'types/services/postTerm.service';
import { ApiRequest } from '@library/api/request';
import { PathUtil } from '@utils/path.util';
import { IPostTermModel } from 'types/models/postTerm.model';

const getWithId = (
  params: IPostTermGetWithIdParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.POST_TERM_WITH.GET_WITH_ID(params._id),
    data: params,
    signal: signal,
  }).get<IPostTermGetResultService>();
};

const getMany = (
  params: IPostTermGetManyParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.POST_TERM_WITH.GET,
    data: params,
    signal: signal,
  }).get<IPostTermGetResultService[]>();
};

const add = (params: IPostTermAddParamService, signal?: AbortSignal) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.POST_TERM_WITH.ADD,
    data: params,
    signal: signal,
  }).post<IPostTermModel>();
};

const updateWithId = (
  params: IPostTermUpdateWithIdParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.POST_TERM_WITH.UPDATE_WITH_ID(params._id),
    data: params,
    signal: signal,
  }).put();
};

const updateRankWithId = (
  params: IPostTermUpdateRankWithIdParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.POST_TERM_WITH.UPDATE_RANK_WITH_ID(params._id),
    data: params,
    signal: signal,
  }).put();
};

const updateStatusMany = (
  params: IPostTermUpdateStatusManyParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.POST_TERM_WITH.UPDATE_STATUS,
    data: params,
    signal: signal,
  }).put();
};

const deleteMany = (
  params: IPostTermDeleteManyParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.POST_TERM_WITH.DELETE,
    data: params,
    signal: signal,
  }).delete();
};

export const PostTermService = {
  getWithId: getWithId,
  getMany: getMany,
  add: add,
  updateWithId: updateWithId,
  updateRankWithId: updateRankWithId,
  updateStatusMany: updateStatusMany,
  deleteMany: deleteMany,
};
