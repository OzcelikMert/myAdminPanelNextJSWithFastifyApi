export const LanguageApiEndPoint = {
    GET: "/get",
    GET_FLAGS: "/get/flags",
    GET_WITH_ID: (_id: string)  => `/get/${_id}`,
    ADD: "/add",
    UPDATE_RANK_WITH_ID: (_id: string)  => `/update/rank/${_id}`,
    UPDATE_WITH_ID: (_id: string)  => `/update/${_id}`
}