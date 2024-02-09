import {ThemeGroupTypeDocument} from "types/constants/themeGroupTypes";

export enum ComponentInputTypeId {
    Text = 1,
    TextArea,
    Image,
    Button,
    Number
}

export const ComponentInputTypes: Array<ThemeGroupTypeDocument> = [
    {id: ComponentInputTypeId.Text, langKey: "text"},
    {id: ComponentInputTypeId.TextArea, langKey: "textArea"},
    {id: ComponentInputTypeId.Image, langKey: "image"},
    {id: ComponentInputTypeId.Button, langKey: "button"},
    {id: ComponentInputTypeId.Number, langKey: "icon"},
]