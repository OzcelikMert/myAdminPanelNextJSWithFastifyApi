export const PostTermEndPoint = {
    ADD: "/add",
    EDIT: (_id: string)  => `/edit/${_id}`,
    LIST: "/list"
}