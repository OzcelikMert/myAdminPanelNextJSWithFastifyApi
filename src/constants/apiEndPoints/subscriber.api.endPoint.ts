export const SubscriberApiEndPoint = {
    GET: "/get",
    GET_WITH_ID: (_id: string)  => `/get/${_id}`,
    ADD: "/add",
    DELETE: "/delete",
    DELETE_WITH_ID: (_id: string)  => `/delete/${_id}`
}