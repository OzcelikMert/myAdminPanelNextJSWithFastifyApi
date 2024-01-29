import {PagePropCommonDocument} from "types/pageProps";
import {PostTypeId} from "constants/postTypes";
import {PostTermTypeId} from "constants/postTermTypes";

export interface PostLibGetPageTitleParamsDocument {
    t: PagePropCommonDocument["t"]
    postTypeId: PostTypeId
    termTypeId?: PostTermTypeId
}