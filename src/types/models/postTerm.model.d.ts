import { PostTypeId } from '@constants/postTypes';
import { PostTermTypeId } from '@constants/postTermTypes';
import { StatusId } from '@constants/status';

export interface IPostTermModel {
  _id: string;
  postTypeId: PostTypeId;
  typeId: PostTermTypeId;
  parentId?: string;
  statusId: StatusId;
  authorId: string;
  lastAuthorId: string;
  rank: number;
  contents: IPostTermContentModel;
  updatedAt?: string;
  createdAt?: string;
}

export interface IPostTermContentModel {
  langId: string;
  image?: string;
  title?: string;
  shortContent?: string;
  url?: string;
  views?: number;
}
