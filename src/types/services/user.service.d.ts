import {UserDocument} from "../models/user";

export interface UserPopulateDocument {
    _id: string
    name: string,
    url: string,
    image: string
}

export type UserGetResultDocument = {
    isOnline?: boolean
} & UserDocument

export interface UserGetOneParamDocument {
    _id: string
    email?: string
    password?: string
    statusId?: number
    url?: string
    roleId?: number
    ignoreUserId?: string[]
}

export interface UserGetManyParamDocument {
    _id?: string[]
    statusId?: number
    email?: string,
    count?: number,
    page?: number
    roleId?: number
    ignoreUserId?: string[]
}

export type UserAddParamDocument = {
    password: string
} & Omit<UserDocument, "_id"|"password">

export type UserUpdateOneParamDocument = {
    _id: string
    password?: string
} & Omit<UserAddParamDocument, "password">

export interface UserUpdateProfileParamDocument {
    image?: string,
    name?: string,
    comment?: string,
    phone?: string,
    facebook?: string,
    instagram?: string,
    twitter?: string
}

export interface UserUpdatePasswordParamDocument {
    password: string
    newPassword: string,
}

export type UserDeleteOneParamDocument = {
    _id: string
}