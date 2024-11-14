import { PostTypeId } from '@constants/postTypes';
import { PostTermTypeId } from '@constants/postTermTypes';

export type ISearchParam = {
  postTypeId: PostTypeId;
  termTypeId: PostTermTypeId;
  _id: string;
};
