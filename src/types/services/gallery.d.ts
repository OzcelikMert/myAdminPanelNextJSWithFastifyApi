export default interface GalleryDocument {
    name: string
    sizeMB: number
    sizeKB: number
    createdAt: string
}

export type GalleryAddParamDocument = {} & FormData

export interface GalleryDeleteParamDocument {
    images?: string[]
    videos?: string[]
}

