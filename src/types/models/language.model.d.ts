import {StatusId} from "constants/status";

export interface LanguageDocument {
    _id: string
    title: string
    image: string
    shortKey: string
    locale: string
    statusId: StatusId
    rank: number
    createdAt?: string
    updatedAt?: string
}