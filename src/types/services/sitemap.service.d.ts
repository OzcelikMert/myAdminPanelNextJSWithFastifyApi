import {PostTermTypeId} from "constants/postTermTypes";
import {PostTypeId} from "constants/postTypes";
import {PageTypeId} from "constants/pageTypes";

export interface SitemapMapPostTermCountDocument {
    typeId: PostTermTypeId
    postTypeId: PostTypeId
    total: number
}

export interface SitemapMapPostCountDocument {
    typeId: PostTypeId
    total: number
}

export interface SitemapMapsDocument {
    post: SitemapMapPostCountDocument[]
    postTerm: SitemapMapPostTermCountDocument[]
}

export interface SitemapPostTermDocument {
    updatedAt: string
    createdAt: string
    typeId: PostTermTypeId
    postTypeId: PostTypeId
    contents: SitemapContentDocument[]
}

export interface SitemapPostDocument {
    updatedAt: string
    createdAt: string
    typeId: PostTypeId
    pageTypeId?: PageTypeId
    contents: SitemapContentDocument[]
}

export interface SitemapContentDocument {
    langId: string
    title: string
    url: string
}

export interface SitemapGetPostTermParamDocument {
    typeId: PostTermTypeId
    postTypeId: PostTypeId
    page?: number
}

export interface SitemapGetPostParamDocument {
    typeId: PostTypeId
    page?: number
}