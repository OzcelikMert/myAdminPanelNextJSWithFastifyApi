import {LanguageKeys} from "../languages";
import {AttributeTypeId} from "constants/attributeTypes";

export interface AttributeTypeDocument {
    id: AttributeTypeId,
    rank: number,
    langKey: LanguageKeys
}