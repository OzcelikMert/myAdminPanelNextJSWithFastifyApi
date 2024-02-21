import {ILanguageKeys} from "../languages";
import {UserRoleId, UserRoleRank} from "constants/userRoles";

export interface IUserRole {
    id: UserRoleId,
    rank: number,
    langKey: ILanguageKeys
}