import {PageTypeId} from "constants/pageTypes";
import {ILanguageKeys} from "../languages";

export interface IPageType {
    id: PageTypeId,
    rank: number,
    langKey: ILanguageKeys
}
