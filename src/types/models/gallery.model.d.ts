import {GalleryTypeId} from "constants/galleryTypeId";

export interface GalleryDocument {
    _id: string
    name: string
    oldName: string
    typeId: GalleryTypeId
    authorId: string
    createdAt: string
    updatedAt: string
    sizeMB: number
    sizeKB: number
}