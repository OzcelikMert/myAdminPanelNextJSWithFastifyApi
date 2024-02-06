import {PostTypeId} from "constants/postTypes";

export const EndPoints = {
    LOGIN: "/login",
    LOCK: "/lock",
    DASHBOARD: "/dashboard",
    GALLERY: "/gallery",
    COMPONENT: "/component",
    NAVIGATION: "/navigation",
    POST: (typeId: PostTypeId) => `/post/${typeId}`,
    THEME_CONTENT: "/theme-content",
    ECOMMERCE: "/e-commerce",
    SETTINGS: "/settings",
    USER: "/user",
    LANGUAGE: "/language"
}