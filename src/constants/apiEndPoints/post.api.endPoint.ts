export const PostApiEndPoint = {
    GET: "/get",
    GET_COUNT: "/get/count",
    GET_WITH_ID: (_id: string)  => `/get/${_id}`,
    GET_WITH_URL: (url: string)  => `/get/url/${url}`,
    ADD: "/add",
    UPDATE_VIEW_WITH_ID: (_id: string)  => `/update/view/${_id}`,
    UPDATE_RANK_WITH_ID: (_id: string)  => `/update/rank/${_id}`,
    UPDATE_STATUS: "/update/status",
    UPDATE_WITH_ID: (_id: string)  => `/update/${_id}`,
    DELETE: "/delete"
}