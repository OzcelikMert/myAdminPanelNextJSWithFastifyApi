import {IStaticContentType} from "types/constants/staticContentTypes";

export enum StaticContentTypeId {
    Text = 1,
    TextArea,
    Image,
    Button,
    RichText
}

export const staticContentTypes: Array<IStaticContentType> = [
    {id: StaticContentTypeId.Text, langKey: "text"},
    {id: StaticContentTypeId.TextArea, langKey: "textArea"},
    {id: StaticContentTypeId.Image, langKey: "image"},
    {id: StaticContentTypeId.Button, langKey: "button"},
    {id: StaticContentTypeId.RichText, langKey: "richText"},
]