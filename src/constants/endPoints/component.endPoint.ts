export const ComponentEndPoint = {
    ADD: "/add",
    EDIT: (_id: string)  => `/edit/${_id}`,
    LIST: "/list"
}