import { IComponentType } from 'types/constants/componentTypes';

export enum ComponentTypeId {
  Public = 1,
  Private,
}

export const componentTypes: Array<IComponentType> = [
  { id: ComponentTypeId.Public, langKey: 'public' },
  { id: ComponentTypeId.Private, langKey: 'private' },
];
