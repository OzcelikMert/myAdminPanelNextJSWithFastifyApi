import {UserRoleId} from "constants/userRoles";
import {StatusId} from "constants/status";

export interface UserDocument {
    _id: string
    roleId: UserRoleId,
    statusId: StatusId,
    name: string,
    email: string,
    image?: string,
    url?: string,
    comment?: string,
    phone?: string,
    password?: string,
    permissions: number[],
    banDateEnd?: string,
    banComment?: string,
    facebook?: string,
    instagram?: string,
    twitter?: string
    createdAt?: string
    updatedAt?: string
}