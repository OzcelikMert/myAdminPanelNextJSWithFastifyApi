import {PostTypeId, PostTypes} from "constants/postTypes";
import PagePaths from "constants/pagePaths";
import {PostLibGetPageTitleParamsDocument} from "types/lib/post.lib";
import {PostTermTypes} from "constants/postTermTypes";

const getPagePath = (postTypeId: PostTypeId) => {
    postTypeId = Number(postTypeId);
    let pagePath = PagePaths.themeContent().post(postTypeId);

    if([PostTypeId.Page].includes(postTypeId)){
        pagePath = PagePaths.post(postTypeId);
    }

    if([PostTypeId.Product].includes(postTypeId)){
        pagePath = PagePaths.eCommerce().product();
    }

    return pagePath;
}

const getPageTitles = (params: PostLibGetPageTitleParamsDocument) => {
    let titles: string[] = [
        params.t(PostTypes.findSingle("id", params.postTypeId)?.langKey ?? "[noLangAdd]"),
    ];

    if(params.termTypeId){
        titles= [
            ...titles,
            params.t(PostTermTypes.findSingle("id", params.termTypeId)?.langKey ?? "[noLangAdd]")
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

export default {
    getPagePath: getPagePath,
    getPageTitles: getPageTitles,
}