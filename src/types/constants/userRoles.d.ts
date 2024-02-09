import {LanguageKeys} from "../languages";
import {UserRoleId} from "constants/userRoles";

export interface UserRoleDocument {
    id: UserRoleId,
    rank: number,
    langKey: LanguageKeys
}