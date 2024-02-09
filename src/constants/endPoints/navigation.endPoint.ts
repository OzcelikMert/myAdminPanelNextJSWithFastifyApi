export const NavigationEndPoint = {
    ADD: "/add",
    EDIT: (_id?: string)  => `/edit/${_id ?? ":_id"}`,
    LIST: "/list"
}