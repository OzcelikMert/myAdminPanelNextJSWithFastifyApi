import { ElementTypeId } from '@constants/elementTypes';
import { ComponentTypeId } from '@constants/componentTypes';

export interface IComponentModel {
  _id: string;
  authorId: string;
  lastAuthorId: string;
  title: string;
  typeId: ComponentTypeId;
  key: string;
  elements: IComponentElementModel[];
  updatedAt?: string;
  createdAt?: string;
}

export interface IComponentElementModel {
  _id: string;
  key: string;
  typeId: ElementTypeId;
  title: string;
  rank: number;
  contents: IComponentElementContentModel;
  updatedAt?: string;
  createdAt?: string;
}

export interface IComponentElementContentModel {
  _id?: string;
  langId: string;
  content?: string;
  url?: string;
}
