import Api from "./api";
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
} from "types/services/setting";
import {SettingApiEndPoint} from "constants/apiEndPoints/setting.api.endPoint";

const get = (params: SettingGetParamDocument) => {
    return Api.get<SettingGetResultDocument>({
        url: [ApiEndPoints.SETTING, SettingApiEndPoint.GET],
        data: params,
    });
}

const updateGeneral = (params: SettingUpdateGeneralParamDocument) => {
    return Api.put({
        url: [ApiEndPoints.SETTING, SettingApiEndPoint.UPDATE_GENERAL],
        data: params,
    });
}

const updateSeo = (params: SettingUpdateSEOParamDocument) => {
    return Api.put({
        url: [ApiEndPoints.SETTING, SettingApiEndPoint.UPDATE_SEO],
        data: params,
    });
}

const updateContactForm = (params: SettingUpdateContactFormParamDocument) => {
    return Api.put({
        url: [ApiEndPoints.SETTING, SettingApiEndPoint.UPDATE_CONTACT_FORM],
        data: params,
    });
}

const updateStaticLanguage = (params: SettingUpdateStaticLanguageParamDocument) => {
    return Api.put({
        url: [ApiEndPoints.SETTING, SettingApiEndPoint.UPDATE_STATIC_LANGUAGE],
        data: params,
    });
}

const updateSocialMedia = (params: SettingUpdateSocialMediaParamDocument) => {
    return Api.put({
        url: [ApiEndPoints.SETTING, SettingApiEndPoint.UPDATE_SOCIAL_MEDIA],
        data: params,
    });
}

const updateECommerce = (params: SettingUpdateECommerceParamDocument) => {
    return Api.put({
        url: [ApiEndPoints.SETTING, SettingApiEndPoint.UPDATE_ECOMMERCE],
        data: params,
    });
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