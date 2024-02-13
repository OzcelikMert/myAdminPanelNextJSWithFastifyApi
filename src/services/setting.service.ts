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
import {SettingApiEndPoint} from "constants/apiEndPoints/setting.api.endPoint";
import {PathUtil} from "utils/path.util";
import ApiRequest from "library/api/request";

const get = (params: ISettingGetParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoints: [ApiEndPoints.SETTING, SettingApiEndPoint.GET],
        data: params,
    }).get<ISettingGetResultService>();
}

const updateGeneral = (params: ISettingUpdateGeneralParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoints: [ApiEndPoints.SETTING, SettingApiEndPoint.UPDATE_GENERAL],
        data: params,
    }).put();
}

const updateSeo = (params: ISettingUpdateSEOParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoints: [ApiEndPoints.SETTING, SettingApiEndPoint.UPDATE_SEO],
        data: params,
    }).put();
}

const updateContactForm = (params: ISettingUpdateContactFormParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoints: [ApiEndPoints.SETTING, SettingApiEndPoint.UPDATE_CONTACT_FORM],
        data: params,
    }).put();
}

const updateStaticLanguage = (params: ISettingUpdateStaticLanguageParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoints: [ApiEndPoints.SETTING, SettingApiEndPoint.UPDATE_STATIC_LANGUAGE],
        data: params,
    }).put();
}

const updateSocialMedia = (params: ISettingUpdateSocialMediaParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoints: [ApiEndPoints.SETTING, SettingApiEndPoint.UPDATE_SOCIAL_MEDIA],
        data: params,
    }).put();
}

const updateECommerce = (params: ISettingUpdateECommerceParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoints: [ApiEndPoints.SETTING, SettingApiEndPoint.UPDATE_ECOMMERCE],
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