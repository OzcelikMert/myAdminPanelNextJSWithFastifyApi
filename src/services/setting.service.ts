import Api from "./api";
import {ServicePages} from "constants/index";
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

const get = (params: SettingGetParamDocument) => {
    return Api.get<SettingGetResultDocument>({
        url: [ServicePages.setting],
        data: params,
    });
}

const updateGeneral = (params: SettingUpdateGeneralParamDocument) => {
    return Api.put({
        url: [ServicePages.setting, "general"],
        data: params,
    });
}

const updateSeo = (params: SettingUpdateSEOParamDocument) => {
    return Api.put({
        url: [ServicePages.setting, "seo"],
        data: params,
    });
}

const updateContactForm = (params: SettingUpdateContactFormParamDocument) => {
    return Api.put({
        url: [ServicePages.setting, "contactForm"],
        data: params,
    });
}

const updateStaticLanguage = (params: SettingUpdateStaticLanguageParamDocument) => {
    return Api.put({
        url: [ServicePages.setting, "staticLanguage"],
        data: params,
    });
}

const updateSocialMedia = (params: SettingUpdateSocialMediaParamDocument) => {
    return Api.put({
        url: [ServicePages.setting, "socialMedia"],
        data: params,
    });
}

const updateECommerce = (params: SettingUpdateECommerceParamDocument) => {
    return Api.put({
        url: [ServicePages.setting, "eCommerce"],
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