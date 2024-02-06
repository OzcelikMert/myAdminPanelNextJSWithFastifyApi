export const ECommerceEndPoint = {
    PRODUCT: "/product",
    SETTINGS: "/settings",
}

export const ECommerceProductEndPoint = {
    ADD: "/add",
    EDIT: (_id: string)  => `/edit/${_id}`,
    LIST: "/list",
    TERM: "/term"
}

export const ECommerceProductTermEndPoint = {
    ADD: "/add",
    EDIT: (_id: string)  => `/edit/${_id}`,
    LIST: "/list"
}