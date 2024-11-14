import { IAttributeType } from 'types/constants/attributeTypes';

export enum AttributeTypeId {
  Text = 1,
  Image,
}

export const attributeTypes: Array<IAttributeType> = [
  { id: AttributeTypeId.Text, rank: 1, langKey: 'text' },
  { id: AttributeTypeId.Image, rank: 2, langKey: 'image' },
];
