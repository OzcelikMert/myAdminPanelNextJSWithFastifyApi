import {ILanguageKeys} from "../languages";
import {StaticContentTypeId} from "constants/staticContentTypes";

export interface IStaticContentType {
    id: StaticContentTypeId,
    langKey: ILanguageKeys
}
