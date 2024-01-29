export interface ProfileUpdateParamDocument {
    image?: string,
    name?: string,
    comment?: string,
    phone?: string,
    facebook?: string,
    instagram?: string,
    twitter?: string
}

export interface ProfileChangePasswordParamDocument {
    password: string
    newPassword: string,
}