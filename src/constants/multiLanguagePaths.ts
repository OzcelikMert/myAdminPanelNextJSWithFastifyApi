import {EndPoints} from "constants/endPoints";
import {PathUtil} from "utils/path.util";
import {PostEndPoint} from "constants/endPoints/post.endPoint";
import {PostTermEndPoint} from "constants/endPoints/postTerm.endPoint";
import {NavigationEndPoint} from "constants/endPoints/navigation.endPoint";
import {ComponentEndPoint} from "constants/endPoints/component.endPoint";
import {SettingsEndPoint} from "constants/endPoints/settings.endPoint";

export const multiLanguagePaths = [
    PathUtil.setPath(EndPoints.POST(), PostEndPoint.LIST),
    PathUtil.setPath(EndPoints.POST(), PostEndPoint.EDIT()),
    PathUtil.setPath(EndPoints.POST(), PostEndPoint.TERM(), PostTermEndPoint.LIST),
    PathUtil.setPath(EndPoints.POST(), PostEndPoint.TERM(), PostTermEndPoint.EDIT()),
    PathUtil.setPath(EndPoints.ECOMMERCE, EndPoints.POST(), PostEndPoint.LIST),
    PathUtil.setPath(EndPoints.ECOMMERCE, EndPoints.POST(), PostEndPoint.EDIT()),
    PathUtil.setPath(EndPoints.ECOMMERCE, EndPoints.POST(), PostEndPoint.TERM(), PostTermEndPoint.LIST),
    PathUtil.setPath(EndPoints.ECOMMERCE, EndPoints.POST(), PostEndPoint.TERM(), PostTermEndPoint.EDIT()),
    PathUtil.setPath(EndPoints.THEME_CONTENT, EndPoints.POST(), PostEndPoint.LIST),
    PathUtil.setPath(EndPoints.THEME_CONTENT, EndPoints.POST(), PostEndPoint.EDIT()),
    PathUtil.setPath(EndPoints.THEME_CONTENT, EndPoints.POST(), PostEndPoint.TERM(), PostTermEndPoint.LIST),
    PathUtil.setPath(EndPoints.THEME_CONTENT, EndPoints.POST(), PostEndPoint.TERM(), PostTermEndPoint.EDIT()),
    PathUtil.setPath(EndPoints.NAVIGATION, NavigationEndPoint.LIST),
    PathUtil.setPath(EndPoints.NAVIGATION, NavigationEndPoint.EDIT()),
    PathUtil.setPath(EndPoints.COMPONENT, ComponentEndPoint.LIST),
    PathUtil.setPath(EndPoints.COMPONENT, ComponentEndPoint.EDIT()),
    PathUtil.setPath(EndPoints.SETTINGS, SettingsEndPoint.STATIC_LANGUAGES),
    PathUtil.setPath(EndPoints.SETTINGS, SettingsEndPoint.SEO),
]