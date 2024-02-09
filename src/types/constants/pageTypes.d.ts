import {PageTypeId} from "constants/pageTypes";
import {LanguageKeys} from "../languages";

export interface PageTypeDocument {
    id: PageTypeId,
    rank: number,
    langKey: LanguageKeys
}
