import Api from "./api";
import {ServicePages} from "constants/index";
import {
    SitemapGetPostTermParamDocument,
    SitemapGetPostParamDocument,
    SitemapPostTermDocument,
    SitemapPostDocument,
    SitemapMapsDocument
} from "types/services/sitemap";

export default {
    getMaps(params: {}) {
        return Api.get<SitemapMapsDocument>({
            url: [ServicePages.sitemap, "maps"],
            data: params
        });
    },
    getPost(params: SitemapGetPostParamDocument){
        return Api.get<SitemapPostDocument[]>({
            url: [ServicePages.sitemap, "post"],
            data: params
        });
    },
    getPostTerm(params: SitemapGetPostTermParamDocument) {
        return Api.get<SitemapPostTermDocument[]>({
            url: [ServicePages.sitemap, "postTerm"],
            data: params
        });
    }
}