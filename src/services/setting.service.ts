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

export default {
    get(params: SettingGetParamDocument) {
        return Api.get<SettingGetResultDocument>({
            url: [ServicePages.setting],
            data: params,
        });
    },
    updateGeneral(params: SettingUpdateGeneralParamDocument) {
        return Api.put({
            url: [ServicePages.setting, "general"],
            data: params,
        });
    },
    updateSeo(params: SettingUpdateSEOParamDocument) {
        return Api.put({
            url: [ServicePages.setting, "seo"],
            data: params,
        });
    },
    updateContactForm(params: SettingUpdateContactFormParamDocument) {
        return Api.put({
            url: [ServicePages.setting, "contactForm"],
            data: params,
        });
    },
    updateStaticLanguage(params: SettingUpdateStaticLanguageParamDocument) {
        return Api.put({
            url: [ServicePages.setting, "staticLanguage"],
            data: params,
        });
    },
    updateSocialMedia(params: SettingUpdateSocialMediaParamDocument) {
        return Api.put({
            url: [ServicePages.setting, "socialMedia"],
            data: params,
        });
    },
    updateECommerce(params: SettingUpdateECommerceParamDocument) {
        return Api.put({
            url: [ServicePages.setting, "eCommerce"],
            data: params,
        });
    }
}