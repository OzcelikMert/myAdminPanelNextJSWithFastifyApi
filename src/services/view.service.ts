import { ApiEndPoints } from '@constants/apiEndPoints';
import {
  IViewGetStatisticsResultService,
  IViewGetNumberResultService,
  IViewAddParamService,
} from 'types/services/view.service';
import { ApiRequest } from '@library/api/request';
import { PathUtil } from '@utils/path.util';
import { IViewModel } from 'types/models/view.model';

const getNumber = (signal?: any) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.VIEW_WITH.GET_NUMBER,
    signal: signal,
  }).get<IViewGetNumberResultService>();
};

const getStatistics = (signal?: any) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.VIEW_WITH.GET_STATISTICS,
    signal: signal,
  }).get<IViewGetStatisticsResultService>();
};

const add = (params: IViewAddParamService, signal?: AbortSignal) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.VIEW_WITH.ADD,
    data: params,
    signal: signal,
  }).post<IViewModel>();
};

export const ViewService = {
  getNumber: getNumber,
  getStatistics: getStatistics,
  add: add,
};
