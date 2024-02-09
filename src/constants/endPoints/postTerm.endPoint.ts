export const PostTermEndPoint = {
    ADD: "/add",
    EDIT: (_id?: string)  => `/edit/${_id ?? ":_id"}`,
    LIST: "/list"
}