import {LanguageDocument} from "types/constants/languages";

export enum LanguageId {
    Turkish = 1,
    English
}

export const Languages: Array<LanguageDocument> = [
    { id: LanguageId.English, code: "en", title: "English", rank: 1, image: "gb.webp" },
    { id: LanguageId.Turkish, code: "tr", title: "Türkçe", rank: 2, image: "tr.webp" },
]