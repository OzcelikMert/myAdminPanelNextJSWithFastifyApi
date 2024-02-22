import {UserRoleId, userRoles} from "constants/userRoles";
import {PermissionId} from "constants/permissions";
import {ISessionAuthModel} from "types/models/sessionAuth.model";
import {PostTypeId} from "constants/postTypes";
import {PostEndPointPermission} from "constants/endPointPermissions/post.endPoint.permission";
import {IEndPointPermission} from "types/constants/endPoint.permissions";
import {IPagePropCommon} from "types/pageProps";
import {EndPoints} from "constants/endPoints";
import ComponentToast from "components/elements/toast";

export enum PostPermissionMethod {
    GET,
    ADD,
    UPDATE,
    DELETE
}

const getPermissionKeyPrefix = (method: PostPermissionMethod) => {
    let prefix = "";

    switch (method) {
        case PostPermissionMethod.GET: prefix = "GET_"; break;
        case PostPermissionMethod.ADD: prefix = "ADD_"; break;
        case PostPermissionMethod.UPDATE: prefix = "UPDATE_"; break;
        case PostPermissionMethod.DELETE: prefix = "DELETE_"; break;
    }

    return prefix;
}

const getPostTypeIdKey = (typeId: PostTypeId) => {
    let postTypeIdKey = "";

    switch (typeId) {
        case PostTypeId.BeforeAndAfter: postTypeIdKey = "BEFORE_AND_AFTER"; break;
        default: postTypeIdKey = Object.keys(PostTypeId).find(key => PostTypeId[key as keyof typeof PostTypeId] === typeId) ?? ""; break;
    }

    return postTypeIdKey;
}

const getPostPermission = (typeId: PostTypeId, method: PostPermissionMethod) : IEndPointPermission => {
    let permissionKeyPrefix = getPermissionKeyPrefix(method);
    const postTypeIdKey = getPostTypeIdKey(typeId);

    return (PostEndPointPermission as any)[`${permissionKeyPrefix}${postTypeIdKey.toUpperCase()}`] ?? {permissionId: [], userRoleId: UserRoleId.SuperAdmin};
}

const checkPermissionRoleRank = (targetRoleId: UserRoleId, minRoleId: UserRoleId) => {
    let userRole = userRoles.findSingle("id", targetRoleId);
    let minRole = userRoles.findSingle("id", minRoleId);

    return targetRoleId == UserRoleId.SuperAdmin || (userRole && minRole) && (userRole.rank >= minRole.rank);
}

const checkPermissionId = (targetRoleId: UserRoleId, targetPermissionId: PermissionId[], minPermissionId: PermissionId[]) => {
    return targetRoleId == UserRoleId.SuperAdmin || (minPermissionId.some(permissionId => targetPermissionId.some(userPermissionId => permissionId == userPermissionId)));
}

const check = (sessionAuth: ISessionAuthModel, minPermission: IEndPointPermission) => {
    return (
        sessionAuth.user.roleId == UserRoleId.SuperAdmin ||
        checkPermissionRoleRank(sessionAuth.user.roleId, minPermission.userRoleId) &&
        checkPermissionId(sessionAuth.user.roleId, sessionAuth.user.permissions, minPermission.permissionId)
    );
};

const checkAndRedirect = (props: IPagePropCommon, minPermission: IEndPointPermission, redirectPath = EndPoints.DASHBOARD): boolean => {
    let status = true;

    if(props.getStateApp.sessionAuth){
        if(!check(props.getStateApp.sessionAuth, minPermission)){
            status = false;
            new ComponentToast({
                type: "error",
                title: props.t("error"),
                content: props.t("noPerm"),
                position: "top-right"
            });
            props.router.push(redirectPath);
        }
    }else {
        status = false;
        new ComponentToast({
            type: "error",
            title: props.t("error"),
            content: props.t("sessionRequired"),
            position: "top-right"
        });
        props.router.push(EndPoints.LOGIN);
    }

    return status;
}

export const PermissionUtil = {
    check: check,
    checkAndRedirect: checkAndRedirect,
    getPostPermission: getPostPermission,
    checkPermissionRoleRank: checkPermissionRoleRank,
    checkPermissionId: checkPermissionId
}