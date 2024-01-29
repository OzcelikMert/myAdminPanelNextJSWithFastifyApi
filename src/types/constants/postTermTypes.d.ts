import {PostTermTypeId} from "constants/index";
import LanguageKeys from "../languages";

interface PostTermTypeDocument {
    id: PostTermTypeId,
    rank: number,
    langKey: LanguageKeys
}

export {
    PostTermTypeDocument
}
