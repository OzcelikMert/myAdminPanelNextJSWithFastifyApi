import { ApiEndPoints } from '@constants/apiEndPoints';
import {
  ISettingGetParamService,
  ISettingUpdateGeneralParamService,
  ISettingUpdateECommerceParamService,
  ISettingUpdateContactFormParamService,
  ISettingUpdateSEOParamService,
  ISettingUpdateSocialMediaParamService,
  ISettingGetResultService,
  ISettingUpdatePathParamService,
} from 'types/services/setting.service';
import { PathUtil } from '@utils/path.util';
import { ApiRequest } from '@library/api/request';

const get = (params: ISettingGetParamService, signal?: AbortSignal) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.SETTING_WITH.GET,
    data: params,
    signal: signal,
  }).get<ISettingGetResultService>();
};

const updateGeneral = (
  params: ISettingUpdateGeneralParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.SETTING_WITH.UPDATE_GENERAL,
    data: params,
    signal: signal,
  }).put();
};

const updateSeo = (
  params: ISettingUpdateSEOParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.SETTING_WITH.UPDATE_SEO,
    data: params,
    signal: signal,
  }).put();
};

const updateContactForm = (
  params: ISettingUpdateContactFormParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.SETTING_WITH.UPDATE_CONTACT_FORM,
    data: params,
    signal: signal,
  }).put();
};

const updateSocialMedia = (
  params: ISettingUpdateSocialMediaParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.SETTING_WITH.UPDATE_SOCIAL_MEDIA,
    data: params,
    signal: signal,
  }).put();
};

const updateECommerce = (
  params: ISettingUpdateECommerceParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.SETTING_WITH.UPDATE_ECOMMERCE,
    data: params,
    signal: signal,
  }).put();
};

const updatePath = (
  params: ISettingUpdatePathParamService,
  signal?: AbortSignal
) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.SETTING_WITH.UPDATE_PATH,
    data: params,
    signal: signal,
  }).put();
};

export const SettingService = {
  get: get,
  updateGeneral: updateGeneral,
  updateSeo: updateSeo,
  updateContactForm: updateContactForm,
  updateSocialMedia: updateSocialMedia,
  updateECommerce: updateECommerce,
  updatePath: updatePath,
};
