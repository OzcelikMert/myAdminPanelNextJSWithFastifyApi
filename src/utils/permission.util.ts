import ThemeKeys from "types/themes";
import {UserRoleId, UserRoles} from "constants/userRoles";
import {PermissionId} from "constants/permissions";
import {SessionAuthDocument} from "types/models/sessionAuth.model";

const check = (sessionAuth: SessionAuthDocument, minRoleId?: UserRoleId, minPermissionId?: PermissionId | PermissionId[]) => {
    let status = true;

    if(status && minRoleId){
        let sessionUserRole = UserRoles.findSingle("id", sessionAuth.user.roleId);
        let role = UserRoles.findSingle("id", minRoleId);

        status = (sessionUserRole?.rank ?? 0) >= (role?.rank?? 0);
    }

    if(status && minPermissionId){
        status = false;

        if(Array.isArray(minPermissionId)){
            for(const permId of minPermissionId) {
                if(!status){
                    status = sessionAuth.user.permissions.includes(permId);
                }
            }
        }else {
            status = sessionAuth.user.permissions.includes(minPermissionId);
        }
    }

    return status || sessionAuth.user.roleId == UserRoleId.SuperAdmin;
}

export default {
    check: check
}