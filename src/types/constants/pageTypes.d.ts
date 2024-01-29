import {PageTypeId} from "constants/index";
import LanguageKeys from "../languages";

interface PageTypeDocument {
    id: PageTypeId,
    rank: number,
    langKey: LanguageKeys
}

export {
    PageTypeDocument
}
