import {LanguageId} from "constants/languages";

export interface LanguageDocument {
    id: LanguageId,
    code: string,
    title: string,
    rank: number,
    image: string
}
