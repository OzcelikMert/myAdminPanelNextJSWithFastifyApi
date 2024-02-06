import {GalleryTypeId} from "constants/galleryTypeId";

export type GalleryAddParamDocument = {} & FormData

export interface GalleryGetManyParamDocument {
    name?: string[]
    _id?: string[]
    typeId?: GalleryTypeId
}

export interface GalleryDeleteManyParamDocument {
    _id: string[]
}

