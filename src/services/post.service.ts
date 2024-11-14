import { ApiEndPoints } from '@constants/apiEndPoints';
import {
  IPostAddParamService,
  IPostDeleteManyParamService,
  IPostGetCountParamService,
  IPostGetManyParamService,
  IPostGetManyResultService,
  IPostGetWithIdParamService,
  IPostGetResultService,
  IPostUpdateStatusManyParamService,
  IPostUpdateWithIdParamService,
  IPostUpdateRankWithIdParamService,
  IPostAddProductParamService,
  IPostUpdateProductWithIdParamService,
  IPostDeleteProductManyParamService,
} from 'types/services/post.service';
import { ApiRequest } from '@library/api/request';
import { PathUtil } from '@utils/path.util';
import { IPostModel } from 'types/models/post.model';

const getWithId = (
  params: IPostGetWithIdParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.POST_WITH.GET_WITH_ID(params._id),
    data: params,
    signal: signal,
  }).get<IPostGetResultService>();
};

const getMany = (params: IPostGetManyParamService, signal?: AbortSignal) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.POST_WITH.GET,
    data: params,
    signal: signal,
  }).get<IPostGetManyResultService[]>();
};

const getCount = (params: IPostGetCountParamService, signal?: AbortSignal) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.POST_WITH.GET_COUNT,
    data: params,
    signal: signal,
  }).get<number>();
};

const add = (params: IPostAddParamService, signal?: AbortSignal) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.POST_WITH.ADD,
    data: params,
    signal: signal,
  }).post<IPostModel>();
};

const addProduct = (
  params: IPostAddProductParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.POST_WITH.ADD_PRODUCT,
    data: params,
    signal: signal,
  }).post<IPostModel>();
};

const updateWithId = (
  params: IPostUpdateWithIdParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.POST_WITH.UPDATE_WITH_ID(params._id),
    data: params,
    signal: signal,
  }).put();
};

const updateProductWithId = (
  params: IPostUpdateProductWithIdParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.POST_WITH.UPDATE_PRODUCT_WITH_ID(params._id),
    data: params,
    signal: signal,
  }).put();
};

const updateRankWithId = (
  params: IPostUpdateRankWithIdParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.POST_WITH.UPDATE_RANK_WITH_ID(params._id),
    data: params,
    signal: signal,
  }).put();
};

const updateStatusMany = (
  params: IPostUpdateStatusManyParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.POST_WITH.UPDATE_STATUS,
    data: params,
    signal: signal,
  }).put();
};

const deleteMany = (
  params: IPostDeleteManyParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.POST_WITH.DELETE,
    data: params,
    signal: signal,
  }).delete();
};

const deleteProductMany = (
  params: IPostDeleteProductManyParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.POST_WITH.DELETE_PRODUCT,
    data: params,
    signal: signal,
  }).delete();
};

export const PostService = {
  getWithId: getWithId,
  getMany: getMany,
  getCount: getCount,
  add: add,
  addProduct: addProduct,
  updateWithId: updateWithId,
  updateProductWithId: updateProductWithId,
  updateRankWithId: updateRankWithId,
  updateStatusMany: updateStatusMany,
  deleteMany: deleteMany,
  deleteProductMany: deleteProductMany,
};
