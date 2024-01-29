import {AttributeTypeDocument} from "types/constants/attributeTypes";

export enum AttributeTypeId {
    Text = 1,
    Image,
}

export const AttributeTypes: Array<AttributeTypeDocument> = [
    {id: AttributeTypeId.Text, rank: 1, langKey: "text"},
    {id: AttributeTypeId.Image, rank: 2, langKey: "image"},
]