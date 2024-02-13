import {IUserModel} from "../models/user.model";
import {StatusId} from "constants/status";
import {UserRoleId} from "constants/userRoles";

export interface IUserPopulateService {
    _id: string
    name: string,
    url: string,
    image: string
}

export type IUserGetResultService = {
    isOnline?: boolean
} & IUserModel

export interface IUserGetOneParamService {
    _id: string
    statusId?: StatusId
}

export interface IUserGetManyParamService {
    _id?: string[]
    statusId?: StatusId
    email?: string,
    count?: number,
    page?: number
    roleId?: UserRoleId
}

export type IUserAddParamService = {
    password: string
} & Omit<IUserModel, "_id"|"password">

export type IUserUpdateOneParamService = {
    _id: string
    password?: string
} & Omit<IUserAddParamService, "password">

export interface IUserUpdateProfileParamService {
    image?: string,
    name?: string,
    comment?: string,
    phone?: string,
    facebook?: string,
    instagram?: string,
    twitter?: string
}

export interface IUserUpdatePasswordParamService {
    password: string
    newPassword: string,
}

export type IUserDeleteOneParamService = {
    _id: string
}