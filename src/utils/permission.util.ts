import {UserRoleId, userRoles} from "constants/userRoles";
import {PermissionId} from "constants/permissions";
import {SessionAuthDocument} from "types/models/sessionAuth.model";
import {PostTypeId} from "constants/postTypes";

const check = (sessionAuth: SessionAuthDocument, minRoleId?: UserRoleId, minPermissionId?: PermissionId | PermissionId[]) => {
    let status = true;

    if(status && minRoleId){
        let sessionUserRole = userRoles.findSingle("id", sessionAuth.user.roleId);
        let role = userRoles.findSingle("id", minRoleId);

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

const checkPermissionPath = (path: string, userRoleId: UserRoleId, userPermissions: number[]) => {
    for(const permissionPath of PermissionPaths) {
        if(path.startsWith(permissionPath.path)){
            if(
                userRoleId != UserRoleId.SuperAdmin &&
                permissionPath.permissionId &&
                !userPermissions.includes(permissionPath.permissionId)
            ){
                return false;
            }

            if(permissionPath.userRoleId){
                let permPathUserRole = userRoles.findSingle("id", permissionPath.userRoleId);
                let userRole = userRoles.findSingle("id", userRoleId);
                if(
                    (typeof permPathUserRole === "undefined" || typeof userRole === "undefined") ||
                    (userRole.rank < permPathUserRole.rank)
                ){
                    return false;
                }
            }
        }
    }
    return true;
}

const checkPermission = (userRoleId: number, userPermissions: number[], permissionId: number | number[]) => {
    if(typeof userPermissions === "undefined") return false;
    if(Array.isArray(permissionId)) {
        for (const permId of permissionId) {
            if(!checkPermission(userRoleId, userPermissions, permId)){
                return false;
            }
        }
    }else {
        return userRoleId == UserRoleId.SuperAdmin || userPermissions.includes(permissionId);
    }
}

const getPermissionIdForPostType = (typeId: number, query: "Edit" | "Delete" | "Add"): PermissionId => {
    let permissionId = 0;
    Object.keys(PostTypeId).forEach((postType) => {
        let postTypeId: any = PostTypeId[postType as any];
        if (typeId == postTypeId) {
            try {
                permissionId = Number(PermissionId[`${postType.toCapitalizeCase()}${query.toCapitalizeCase()}` as any] ?? 0);
            } catch (e) {}
        }
    })
    return permissionId;
}

export const PermissionUtil = {
    check: check,
    checkPermissionPath: checkPermissionPath,
    checkPermission: checkPermission,
    getPermissionIdForPostType: getPermissionIdForPostType
}