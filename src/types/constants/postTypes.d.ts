import {PostTypeId} from "constants/index";
import LanguageKeys from "../languages";

interface PostTypeDocument {
    id: PostTypeId,
    rank: number,
    langKey: LanguageKeys
}

export {
    PostTypeDocument
}
