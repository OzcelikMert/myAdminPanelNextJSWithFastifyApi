import {LanguageKeys} from "../languages";
import {PostTypeId} from "constants/postTypes";

export interface PostTypeDocument {
    id: PostTypeId,
    rank: number,
    langKey: LanguageKeys
}
