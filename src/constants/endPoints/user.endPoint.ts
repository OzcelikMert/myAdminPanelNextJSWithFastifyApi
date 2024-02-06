export const UserEndPoint = {
    ADD: "/add",
    EDIT: (_id: string)  => `/edit/${_id}`,
    LIST: "/list"
}