import LanguageKeys from "../languages";
import {ComponentInputTypeId} from "constants/componentInputTypes";

export interface ComponentDocument {
    _id: string,
    authorId: string
    lastAuthorId: string
    elementId: string
    langKey: LanguageKeys,
    types: ComponentTypeDocument[]
    updatedAt?: string,
    createdAt?: string
}

export interface ComponentTypeDocument {
    _id: string,
    elementId: string
    typeId: ComponentInputTypeId,
    langKey: LanguageKeys,
    rank: number,
    contents: ComponentTypeContentDocument
}

export interface ComponentTypeContentDocument {
    _id?: string,
    langId:  string
    content?: string
    url?: string
    comment?: string
}