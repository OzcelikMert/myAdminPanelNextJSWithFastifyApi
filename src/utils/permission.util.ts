import {UserRoleId, userRoles} from "constants/userRoles";
import {PermissionId} from "constants/permissions";
import {ISessionAuthModel} from "types/models/sessionAuth.model";
import {PostTypeId} from "constants/postTypes";
import {PostEndPointPermission} from "constants/endPointPermissions/post.endPoint.permission";
import {EndPoints} from "constants/endPoints";
import {IEndPointPermission} from "types/constants/endPoint.permissions";

const getPermissionKeyPrefix = (method: string) => {
    let prefix = "";

    switch (method) {
        case "GET": prefix = "GET_"; break;
        case "POST": prefix = "ADD_"; break;
        case "PUT": prefix = "UPDATE_"; break;
        case "DELETE": prefix = "DELETE_"; break;
    }

    return prefix;
}

const getPostPermission = (typeId: PostTypeId) : IEndPointPermission => {
    let reqData = req as any;
    let path = req.originalUrl.replace(`/api`, "");
    let method = req.method.toUpperCase();
    let permissionKeyPrefix = getPermissionKeyPrefix(method);
    const postTypeIdKey = Object.keys(PostTypeId).find(key => PostTypeId[key as keyof typeof PostTypeId] === typeId) ?? "";

    return (PostEndPointPermission as any)[`${permissionKeyPrefix}${postTypeIdKey.toUpperCase()}`] ?? {permissionId: [], minUserRoleId: 0};
}

const checkPermissionRoleRank = (minRoleId: UserRoleId, targetRoleId: UserRoleId) => {
    let userRole = userRoles.findSingle("id", targetRoleId);
    let minRole = userRoles.findSingle("id", UserRoleId.Editor);

    return (userRole && minRole) && (userRole.rank >= minRole.rank);
}

const checkPermissionId = (minPermissionId: PermissionId[], targetPermissionId: PermissionId[]) => {
    return (minPermissionId.every(permissionId => targetPermissionId.some(userPermissionId => permissionId == userPermissionId)));
}

export const PermissionUtil = {
    getPostPermission: getPostPermission,
    checkPermissionRoleRank: checkPermissionRoleRank,
    checkPermissionId: checkPermissionId
}