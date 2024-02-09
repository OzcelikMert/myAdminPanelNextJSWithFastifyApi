import {LanguageKeys} from "../languages";
import {PermissionGroupId} from "constants/permissionGroups";

export interface PermissionGroupDocument {
    id: PermissionGroupId,
    rank: number,
    langKey: LanguageKeys
}