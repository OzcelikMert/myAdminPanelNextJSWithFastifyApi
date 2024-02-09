import {LanguageKeys} from "../languages";
import {PostTermTypeId} from "constants/postTermTypes";

export interface PostTermTypeDocument {
    id: PostTermTypeId,
    rank: number,
    langKey: LanguageKeys
}
