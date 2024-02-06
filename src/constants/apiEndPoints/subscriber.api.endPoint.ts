export const SubscriberApiEndPoint = {
    GET: "/get",
    GET_WITH_ID: (_id: string)  => `/get/${_id}`,
    GET_WITH_EMAIL: (email: string)  => `/get/email/${email}`,
    ADD: "/add",
    DELETE: "/delete",
    DELETE_WITH_ID: (_id: string)  => `/delete/${_id}`,
    DELETE_WITH_EMAIL: (email: string)  => `/delete/email/${email}`
}