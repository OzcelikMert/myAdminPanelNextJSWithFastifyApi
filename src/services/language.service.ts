import { ApiEndPoints } from '@constants/apiEndPoints';
import {
  ILanguageAddParamService,
  ILanguageGetManyParamService,
  ILanguageGetResultService,
  ILanguageGetWithIdParamService,
  ILanguageUpdateWithIdParamService,
  ILanguageUpdateRankWithIdParamService,
} from 'types/services/language.service';
import { ApiRequest } from '@library/api/request';
import { PathUtil } from '@utils/path.util';
import { ILanguageModel } from 'types/models/language.model';

const getWithId = (
  params: ILanguageGetWithIdParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.LANGUAGE_WITH.GET_WITH_ID(params._id),
    data: params,
    signal: signal,
  }).get<ILanguageGetResultService>();
};

const getMany = (
  params: ILanguageGetManyParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.LANGUAGE_WITH.GET,
    data: params,
    signal: signal,
  }).get<ILanguageGetResultService[]>();
};

const getFlags = (params: {}, signal?: AbortSignal) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.LANGUAGE_WITH.GET_FLAGS,
    data: params,
    signal: signal,
  }).get<string[]>();
};

const add = (params: ILanguageAddParamService, signal?: AbortSignal) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.LANGUAGE_WITH.ADD,
    data: params,
    signal: signal,
  }).post<ILanguageModel>();
};

const updateWithId = (
  params: ILanguageUpdateWithIdParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.LANGUAGE_WITH.UPDATE_WITH_ID(params._id),
    data: params,
    signal: signal,
  }).put();
};

const updateRankWithId = (
  params: ILanguageUpdateRankWithIdParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.LANGUAGE_WITH.UPDATE_RANK_WITH_ID(params._id),
    data: params,
    signal: signal,
  }).put();
};

export const LanguageService = {
  getWithId: getWithId,
  getMany: getMany,
  getFlags: getFlags,
  add: add,
  updateWithId: updateWithId,
  updateRankWithId: updateRankWithId,
};
