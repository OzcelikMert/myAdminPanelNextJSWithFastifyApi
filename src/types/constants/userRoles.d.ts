import {ILanguageKeys} from "./languageKeys";
import {UserRoleId, UserRoleRank} from "@constants/userRoles";

export interface IUserRole {
    id: UserRoleId,
    rank: number,
    langKey: ILanguageKeys
}