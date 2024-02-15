import {UserRoleId} from "constants/userRoles";

export interface ISessionAuthUserModel{
    userId: string
    roleId: UserRoleId,
    email: string,
    name: string
    image: string
    ip: string,
    token?: string,
    permissions: number[]
    createAt?: string,
    updatedAt?: string
    refreshedAt?: string
}

export interface ISessionAuthModel {
    _id?: string
    user: ISessionAuthUserModel
}