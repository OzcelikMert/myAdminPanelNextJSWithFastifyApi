import {IComponentType} from "types/constants/componentTypes";

export enum ComponentTypeId {
    Tool = 1,
    Theme
}

export const componentTypes: Array<IComponentType> = [
    {id: ComponentTypeId.Tool, langKey: "tool"},
    {id: ComponentTypeId.Theme, langKey: "theme"}
]