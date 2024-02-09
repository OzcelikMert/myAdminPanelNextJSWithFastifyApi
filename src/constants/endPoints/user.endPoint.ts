export const UserEndPoint = {
    ADD: "/add",
    EDIT: (_id?: string)  => `/edit/${_id ?? ":_id"}`,
    LIST: "/list"
}