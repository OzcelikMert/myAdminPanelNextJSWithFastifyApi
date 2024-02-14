import {ApiEndPoints} from "constants/apiEndPoints";
import {
    ISettingGetParamService,
    ISettingUpdateGeneralParamService,
    ISettingUpdateECommerceParamService,
    ISettingUpdateContactFormParamService,
    ISettingUpdateSEOParamService,
    ISettingUpdateSocialMediaParamService,
    ISettingUpdateStaticLanguageParamService,
    ISettingGetResultService
} from "types/services/setting.service";
import {PathUtil} from "utils/path.util";
import ApiRequest from "library/api/request";

const get = (params: ISettingGetParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.SETTING_WITH.GET,
        data: params,
    }).get<ISettingGetResultService>();
}

const updateGeneral = (params: ISettingUpdateGeneralParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.SETTING_WITH.UPDATE_GENERAL,
        data: params,
    }).put();
}

const updateSeo = (params: ISettingUpdateSEOParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.SETTING_WITH.UPDATE_SEO,
        data: params,
    }).put();
}

const updateContactForm = (params: ISettingUpdateContactFormParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.SETTING_WITH.UPDATE_CONTACT_FORM,
        data: params,
    }).put();
}

const updateStaticLanguage = (params: ISettingUpdateStaticLanguageParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.SETTING_WITH.UPDATE_STATIC_LANGUAGE,
        data: params,
    }).put();
}

const updateSocialMedia = (params: ISettingUpdateSocialMediaParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.SETTING_WITH.UPDATE_SOCIAL_MEDIA,
        data: params,
    }).put();
}

const updateECommerce = (params: ISettingUpdateECommerceParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.SETTING_WITH.UPDATE_ECOMMERCE,
        data: params,
    }).put();
}

export default {
    get: get,
    updateGeneral: updateGeneral,
    updateSeo: updateSeo,
    updateContactForm: updateContactForm,
    updateStaticLanguage: updateStaticLanguage,
    updateSocialMedia: updateSocialMedia,
    updateECommerce: updateECommerce
}