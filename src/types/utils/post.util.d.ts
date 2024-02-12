import {PagePropCommonDocument} from "types/pageProps";
import {PostTypeId} from "constants/postTypes";
import {PostTermTypeId} from "constants/postTermTypes";

export interface PostUtilGetPageTitleParamsDocument {
    t: PagePropCommonDocument["t"]
    postTypeId: PostTypeId
    termTypeId?: PostTermTypeId
}