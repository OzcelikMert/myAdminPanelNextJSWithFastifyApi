import {EndPoints} from "constants/endPoints";
import pathLib from "lib/path.lib";
import {PostEndPoint} from "constants/endPoints/post.endPoint";
import {PostTermEndPoint} from "constants/endPoints/postTerm.endPoint";
import {NavigationEndPoint} from "constants/endPoints/navigation.endPoint";
import {ComponentEndPoint} from "constants/endPoints/component.endPoint";
import {SettingsEndPoint} from "constants/endPoints/settings.endPoint";

export const MultiLanguagePaths = [
    pathLib.setPath(EndPoints.POST(), PostEndPoint.LIST),
    pathLib.setPath(EndPoints.POST(), PostEndPoint.EDIT()),
    pathLib.setPath(EndPoints.POST(), PostEndPoint.TERM(), PostTermEndPoint.LIST),
    pathLib.setPath(EndPoints.POST(), PostEndPoint.TERM(), PostTermEndPoint.EDIT()),
    pathLib.setPath(EndPoints.ECOMMERCE, EndPoints.POST(), PostEndPoint.LIST),
    pathLib.setPath(EndPoints.ECOMMERCE, EndPoints.POST(), PostEndPoint.EDIT()),
    pathLib.setPath(EndPoints.ECOMMERCE, EndPoints.POST(), PostEndPoint.TERM(), PostTermEndPoint.LIST),
    pathLib.setPath(EndPoints.ECOMMERCE, EndPoints.POST(), PostEndPoint.TERM(), PostTermEndPoint.EDIT()),
    pathLib.setPath(EndPoints.THEME_CONTENT, EndPoints.POST(), PostEndPoint.LIST),
    pathLib.setPath(EndPoints.THEME_CONTENT, EndPoints.POST(), PostEndPoint.EDIT()),
    pathLib.setPath(EndPoints.THEME_CONTENT, EndPoints.POST(), PostEndPoint.TERM(), PostTermEndPoint.LIST),
    pathLib.setPath(EndPoints.THEME_CONTENT, EndPoints.POST(), PostEndPoint.TERM(), PostTermEndPoint.EDIT()),
    pathLib.setPath(EndPoints.NAVIGATION, NavigationEndPoint.LIST),
    pathLib.setPath(EndPoints.NAVIGATION, NavigationEndPoint.EDIT()),
    pathLib.setPath(EndPoints.COMPONENT, ComponentEndPoint.LIST),
    pathLib.setPath(EndPoints.COMPONENT, ComponentEndPoint.EDIT()),
    pathLib.setPath(EndPoints.SETTINGS, SettingsEndPoint.STATIC_LANGUAGES),
    pathLib.setPath(EndPoints.SETTINGS, SettingsEndPoint.SEO),
]