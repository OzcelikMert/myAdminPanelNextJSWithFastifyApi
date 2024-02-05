import {PostTypeId} from "constants/postTypes";
import {PostTermTypeId} from "constants/postTermTypes";
import {StatusId} from "constants/status";

export interface PostTermDocument {
    _id: string
    postTypeId: PostTypeId,
    typeId: PostTermTypeId,
    mainId?: string
    statusId: StatusId,
    authorId: string
    lastAuthorId: string
    rank: number,
    contents: PostTermContentDocument
    updatedAt?: string
    createdAt?: string
}

export interface PostTermContentDocument {
    langId: string
    image?: string
    title?: string
    shortContent?: string
    url?: string
}