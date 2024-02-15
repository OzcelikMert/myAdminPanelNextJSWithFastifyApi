import {UserRoleId, userRoles} from "constants/userRoles";
import {PermissionId} from "constants/permissions";
import {ISessionAuthModel} from "types/models/sessionAuth.model";
import {PostTypeId} from "constants/postTypes";
import {PostEndPointPermission} from "constants/endPointPermissions/post.endPoint.permission";
import {IEndPointPermission} from "types/constants/endPoint.permissions";
import {ApiRequestParamMethodDocument} from "library/types/api";

const getPermissionKeyPrefix = (method: ApiRequestParamMethodDocument) => {
    let prefix = "";

    switch (method) {
        case "GET": prefix = "GET_"; break;
        case "POST": prefix = "ADD_"; break;
        case "PUT": prefix = "UPDATE_"; break;
        case "DELETE": prefix = "DELETE_"; break;
    }

    return prefix;
}

const getPostPermission = (typeId: PostTypeId, method: ApiRequestParamMethodDocument) : IEndPointPermission => {
    let permissionKeyPrefix = getPermissionKeyPrefix(method);
    const postTypeIdKey = Object.keys(PostTypeId).find(key => PostTypeId[key as keyof typeof PostTypeId] === typeId) ?? "";

    return (PostEndPointPermission as any)[`${permissionKeyPrefix}${postTypeIdKey.toUpperCase()}`] ?? {permissionId: [], userRoleId: UserRoleId.SuperAdmin};
}

const checkPermissionRoleRank = (targetRoleId: UserRoleId, minRoleId: UserRoleId) => {
    let userRole = userRoles.findSingle("id", targetRoleId);
    let minRole = userRoles.findSingle("id", UserRoleId.Editor);

    return (userRole && minRole) && (userRole.rank >= minRole.rank);
}

const checkPermissionId = (targetPermissionId: PermissionId[], minPermissionId: PermissionId[]) => {
    return (minPermissionId.every(permissionId => targetPermissionId.some(userPermissionId => permissionId == userPermissionId)));
}

const check = (sessionAuth: ISessionAuthModel, minPermission: IEndPointPermission) => {
    return (
        !checkPermissionRoleRank(sessionAuth.user.roleId, minPermission.userRoleId) ||
        !checkPermissionId(sessionAuth.user.permissions, minPermission.permissionId)
    );
};

export const PermissionUtil = {
    check: check,
    getPostPermission: getPostPermission,
    checkPermissionRoleRank: checkPermissionRoleRank,
    checkPermissionId: checkPermissionId
}