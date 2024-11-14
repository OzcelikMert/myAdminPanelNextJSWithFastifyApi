import { IPostTermType } from 'types/constants/postTermTypes';

export enum PostTermTypeId {
  Category = 1,
  Tag,
  Attributes,
  Variations,
}

export const postTermTypes: Array<IPostTermType> = [
  { id: PostTermTypeId.Category, rank: 1, langKey: 'category' },
  { id: PostTermTypeId.Tag, rank: 2, langKey: 'tag' },
  { id: PostTermTypeId.Attributes, rank: 1, langKey: 'attribute' },
  { id: PostTermTypeId.Variations, rank: 2, langKey: 'variation' },
];
