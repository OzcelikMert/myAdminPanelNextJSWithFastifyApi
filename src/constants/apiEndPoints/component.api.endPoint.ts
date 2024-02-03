export const ComponentApiEndPoint = {
    GET: "/get",
    GET_WITH_ID: (_id: string)  => `/get/${_id}`,
    ADD: "/add",
    UPDATE_WITH_ID: (_id: string)  => `/update/${_id}`,
    DELETE: "/delete"
}