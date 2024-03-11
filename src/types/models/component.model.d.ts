import {ElementTypeId} from "constants/elementTypes";

export interface IComponentModel {
    _id: string,
    authorId: string
    lastAuthorId: string
    title: string,
    elementId: string
    elements: IComponentElementModel[]
    updatedAt?: string,
    createdAt?: string
}

export interface IComponentElementModel {
    _id: string,
    elementId: string
    typeId: ElementTypeId,
    title: string,
    rank: number,
    contents: IComponentElementContentModel,
    updatedAt?: string,
    createdAt?: string
}

export interface IComponentElementContentModel {
    _id?: string,
    langId: string
    content?: string
    url?: string
}