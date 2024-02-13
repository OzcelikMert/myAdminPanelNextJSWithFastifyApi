import {IPagePropCommon} from "types/pageProps";
import {StatusId, status} from "constants/status";
import {UserRoleId, userRoles} from "constants/userRoles";

const getStatusForSelect = (statusId: StatusId[], t: IPagePropCommon["t"]) => {
    return status.findMulti("id", statusId).map(item => ({
        value: item.id,
        label: t(item.langKey)
    }));
}

const getUserRolesForSelect = (roleId: UserRoleId[], t: IPagePropCommon["t"]) => {
    return userRoles.findMulti("id", roleId).map(item => ({
        value: item.id,
        label: t(item.langKey)
    }));
}

export const SelectUtil = {
    getStatusForSelect: getStatusForSelect,
    getUserRolesForSelect: getUserRolesForSelect
}