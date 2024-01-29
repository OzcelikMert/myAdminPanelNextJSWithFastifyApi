import LanguageKeys from "../languages";
import {PermissionGroupId} from "constants/index";

interface PermissionGroupDocument {
    id: PermissionGroupId,
    rank: number,
    langKey: LanguageKeys
}

export {PermissionGroupDocument}