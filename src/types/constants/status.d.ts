import {LanguageKeys} from "../languages";
import {StatusId} from "constants/status";

export interface StatusDocument {
    id: StatusId,
    rank: number,
    langKey: LanguageKeys
}
