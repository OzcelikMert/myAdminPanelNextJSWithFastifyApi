import {PostTypeId, postTypes} from "constants/postTypes";
import {PostUtilGetPageTitleParamsDocument} from "types/utils/post.util";
import {postTermTypes} from "constants/postTermTypes";
import {EndPoints} from "constants/endPoints";
import {PathUtil} from "utils/path.util";

const getPagePath = (postTypeId: PostTypeId) => {
    let pagePath = "";

    if([PostTypeId.Page].includes(postTypeId)){
        pagePath = EndPoints.POST(postTypeId);
    }else if ([PostTypeId.Product].includes(postTypeId)){
        pagePath = PathUtil.setPath(EndPoints.ECOMMERCE, EndPoints.POST(postTypeId))
    }else{
        pagePath = PathUtil.setPath(EndPoints.THEME_CONTENT, EndPoints.POST(postTypeId));
    }

    return pagePath;
}

const getPageTitles = (params: PostUtilGetPageTitleParamsDocument) => {
    let titles: string[] = [
        params.t(postTypes.findSingle("id", params.postTypeId)?.langKey ?? "[noLangAdd]"),
    ];

    if(params.termTypeId){
        titles= [
            ...titles,
            params.t(postTermTypes.findSingle("id", params.termTypeId)?.langKey ?? "[noLangAdd]")
        ]
    }

    if(params.postTypeId == PostTypeId.Product){
        titles= [
            params.t("eCommerce"),
            ...titles
        ]
    }else if(![PostTypeId.Page, PostTypeId.Product].includes(params.postTypeId)){
        titles= [
            params.t("themeContents"),
            ...titles
        ]
    }

    return titles;
}

export const PostUtil = {
    getPagePath: getPagePath,
    getPageTitles: getPageTitles,
}