import {GalleryTypeId} from "constants/galleryTypeId";

export type IGalleryAddParamService = {} & FormData

export interface IGalleryGetManyParamService {
    name?: string[]
    _id?: string[]
    typeId?: GalleryTypeId
}

export interface IGalleryDeleteManyParamService {
    _id: string[]
}

