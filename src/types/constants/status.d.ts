import {StatusId} from "constants/index";
import LanguageKeys from "../languages";

interface StatusDocument {
    id: StatusId,
    rank: number,
    langKey: LanguageKeys
}

export {
    StatusDocument
}
