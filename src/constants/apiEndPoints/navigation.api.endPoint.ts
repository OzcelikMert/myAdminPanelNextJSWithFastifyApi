export const NavigationApiEndPoint = {
    GET: "/get",
    GET_WITH_ID: (_id: string)  => `/get/${_id}`,
    ADD: "/add",
    UPDATE_RANK_WITH_ID: (_id: string)  => `/update/rank/${_id}`,
    UPDATE_STATUS: "/update/status",
    UPDATE_WITH_ID: (_id: string)  => `/update/${_id}`,
    DELETE: "/delete"
}