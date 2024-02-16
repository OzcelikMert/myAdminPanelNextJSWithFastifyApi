import {UserRoleId} from "constants/userRoles";
import {StatusId} from "constants/status";
import {PermissionId} from "constants/permissions";

export interface IUserModel {
    _id: string
    roleId: UserRoleId,
    statusId: StatusId,
    name: string,
    email: string,
    image: string,
    url?: string,
    comment?: string,
    phone?: string,
    password?: string,
    permissions: PermissionId[],
    banDateEnd?: string,
    banComment?: string,
    facebook?: string,
    instagram?: string,
    twitter?: string
    createdAt?: string
    updatedAt?: string
}