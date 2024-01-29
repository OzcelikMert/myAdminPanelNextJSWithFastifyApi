import {PostTermTypeId, PostTypeId} from "constants/index";

type SearchParamDocument = {
    postTypeId: PostTypeId,
    termTypeId: PostTermTypeId,
    _id: string
}


export default SearchParamDocument