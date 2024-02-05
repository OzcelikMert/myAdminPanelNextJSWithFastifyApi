import {ApiEndPoints} from "constants/index";
import {
    SettingGetParamDocument,
    SettingUpdateGeneralParamDocument,
    SettingUpdateECommerceParamDocument,
    SettingUpdateContactFormParamDocument,
    SettingUpdateSEOParamDocument,
    SettingUpdateSocialMediaParamDocument,
    SettingUpdateStaticLanguageParamDocument,
    SettingGetResultDocument
} from "types/services/setting.service";
import {SettingApiEndPoint} from "constants/apiEndPoints/setting.api.endPoint";
import pathUtil from "utils/path.util";
import ApiRequest from "library/api/request";

const get = (params: SettingGetParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.SETTING, SettingApiEndPoint.GET],
        data: params,
    }).get<SettingGetResultDocument>();
}

const updateGeneral = (params: SettingUpdateGeneralParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.SETTING, SettingApiEndPoint.UPDATE_GENERAL],
        data: params,
    }).put();
}

const updateSeo = (params: SettingUpdateSEOParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.SETTING, SettingApiEndPoint.UPDATE_SEO],
        data: params,
    }).put();
}

const updateContactForm = (params: SettingUpdateContactFormParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.SETTING, SettingApiEndPoint.UPDATE_CONTACT_FORM],
        data: params,
    }).put();
}

const updateStaticLanguage = (params: SettingUpdateStaticLanguageParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.SETTING, SettingApiEndPoint.UPDATE_STATIC_LANGUAGE],
        data: params,
    }).put();
}

const updateSocialMedia = (params: SettingUpdateSocialMediaParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
        endPoints: [ApiEndPoints.SETTING, SettingApiEndPoint.UPDATE_SOCIAL_MEDIA],
        data: params,
    }).put();
}

const updateECommerce = (params: SettingUpdateECommerceParamDocument) => {
    return new ApiRequest({
        apiUrl: pathUtil.api,
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