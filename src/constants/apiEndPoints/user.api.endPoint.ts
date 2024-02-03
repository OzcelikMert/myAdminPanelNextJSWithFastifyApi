export const UserApiEndPoint = {
    GET: "/get",
    GET_WITH_ID: (_id: string)  => `/get/${_id}`,
    GET_WITH_URL: (url: string)  => `/get/url/${url}`,
    ADD: "/add",
    UPDATE_PROFILE: "/update/profile",
    UPDATE_PASSWORD: "/update/password",
    UPDATE_WITH_ID: (_id: string)  => `/update/${_id}`,
    DELETE_WITH_ID: (_id: string)  => `/delete/${_id}`
}