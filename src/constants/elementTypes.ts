import { IElementType } from 'types/constants/elementTypes';

export enum ElementTypeId {
  Text = 1,
  TextArea,
  Image,
  Button,
  RichText,
}

export const elementTypes: Array<IElementType> = [
  { id: ElementTypeId.Text, langKey: 'text' },
  { id: ElementTypeId.TextArea, langKey: 'textArea' },
  { id: ElementTypeId.Image, langKey: 'image' },
  { id: ElementTypeId.Button, langKey: 'button' },
  { id: ElementTypeId.RichText, langKey: 'richText' },
];
