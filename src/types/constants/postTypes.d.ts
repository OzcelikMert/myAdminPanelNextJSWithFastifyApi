import {ILanguageKeys} from "../languages";
import {PostTypeId} from "constants/postTypes";

export interface IPostType {
    id: PostTypeId,
    rank: number,
    langKey: ILanguageKeys
}
