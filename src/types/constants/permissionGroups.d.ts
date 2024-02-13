import {ILanguageKeys} from "../languages";
import {PermissionGroupId} from "constants/permissionGroups";

export interface IPermissionGroup {
    id: PermissionGroupId,
    rank: number,
    langKey: ILanguageKeys
}