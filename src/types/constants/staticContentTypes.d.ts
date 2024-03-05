import {ILanguageKeys} from "./languageKeys";
import {StaticContentTypeId} from "constants/staticContentTypes";

export interface IStaticContentType {
    id: StaticContentTypeId,
    langKey: ILanguageKeys
}
