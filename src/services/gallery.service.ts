import { ApiEndPoints } from '@constants/apiEndPoints';
import {
  IGalleryDeleteManyParamService,
  IGalleryAddParamService,
  IGalleryGetManyParamService,
  IGalleryGetResultService,
  IGalleryImageProperties,
} from 'types/services/gallery.service';
import { ApiRequest } from '@library/api/request';
import { PathUtil } from '@utils/path.util';
import { IApiRequestParam } from '@library/types/api';
import { IGalleryModel } from 'types/models/gallery.model';

const get = (params: IGalleryGetManyParamService, signal?: AbortSignal) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.GALLERY_WITH.GET_IMAGE,
    data: params,
    signal: signal,
  }).get<IGalleryGetResultService[]>();
};

const add = (
  params: IGalleryAddParamService,
  onUploadProgress: IApiRequestParam['onUploadProgress'],
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.GALLERY_WITH.ADD_IMAGE,
    data: params,
    contentType: false,
    processData: false,
    onUploadProgress: onUploadProgress,
    signal: signal,
  }).post<(IGalleryModel & IGalleryImageProperties)[]>();
};

const deleteMany = (
  params: IGalleryDeleteManyParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.GALLERY_WITH.DELETE_IMAGE,
    data: params,
    signal: signal,
  }).delete();
};

export const GalleryService = {
  get: get,
  add: add,
  deleteMany: deleteMany,
};
