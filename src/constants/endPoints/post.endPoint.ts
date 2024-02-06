import {PostTermTypeId} from "constants/postTermTypes";

export const PostEndPoint = {
    ADD: "/add",
    EDIT: (_id: string)  => `/edit/${_id}`,
    LIST: "/list",
    TERM: (typeId: PostTermTypeId) => `/term/${typeId}`,
}

export const PostTermEndPoint = {
    ADD: "/add",
    EDIT: (_id: string)  => `/edit/${_id}`,
    LIST: "/list"
}