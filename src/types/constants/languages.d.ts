import {LanguageId} from "constants/index";

interface LanguageDocument {
    id: LanguageId,
    code: string,
    title: string,
    rank: number,
    image: string
}

export {LanguageDocument}
