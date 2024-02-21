import {UserRoleId} from "../userRoles";
import {PermissionId} from "../permissions";
import {IEndPointPermission} from "types/constants/endPoint.permissions";

const add: IEndPointPermission = {
    permissionId: [],
    userRoleId: UserRoleId.SuperAdmin
}

const update: IEndPointPermission = {
    permissionId: [PermissionId.ComponentEdit],
    userRoleId: UserRoleId.Editor
}

const get: IEndPointPermission = {
    permissionId: [PermissionId.ComponentEdit],
    userRoleId: UserRoleId.Editor
}

const remove: IEndPointPermission = {
    permissionId: [],
    userRoleId: UserRoleId.SuperAdmin
}

export const ComponentEndPointPermission = {
    GET: get,
    ADD: add,
    UPDATE: update,
    DELETE: remove
}