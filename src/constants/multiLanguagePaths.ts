import {EndPoints} from "constants/endPoints";
import {PathUtil} from "utils/path.util";

export const multiLanguagePaths = [
    EndPoints.POST_WITH().EDIT(),
    EndPoints.POST_WITH().TERM_WITH().EDIT(),
    EndPoints.ECOMMERCE_WITH.PRODUCT_WITH.EDIT(),
    EndPoints.ECOMMERCE_WITH.PRODUCT_WITH.TERM_WITH().EDIT(),
    PathUtil.createPath(EndPoints.THEME_CONTENT, EndPoints.POST_WITH().EDIT()),
    PathUtil.createPath(EndPoints.THEME_CONTENT, EndPoints.POST_WITH().TERM_WITH().EDIT()),
    EndPoints.NAVIGATION_WITH.EDIT(),
    EndPoints.SETTINGS_WITH.STATIC_CONTENTS,
    EndPoints.SETTINGS_WITH.SEO,
    EndPoints.COMPONENT_WITH.EDIT()
]