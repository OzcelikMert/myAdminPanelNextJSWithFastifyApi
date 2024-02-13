import {ILanguageKeys} from "../languages";
import {ComponentInputTypeId} from "constants/componentInputTypes";

export interface IComponentModel {
    _id: string,
    authorId: string
    lastAuthorId: string
    elementId: string
    langKey: ILanguageKeys,
    types: IComponentTypeModel[]
    updatedAt?: string,
    createdAt?: string
}

export interface IComponentTypeModel {
    _id: string,
    elementId: string
    typeId: ComponentInputTypeId,
    langKey: ILanguageKeys,
    rank: number,
    contents: IComponentTypeContentModel
}

export interface IComponentTypeContentModel {
    _id?: string,
    langId:  string
    content?: string
    url?: string
    comment?: string
}