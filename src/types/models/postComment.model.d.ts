import { StatusId } from '@constants/status';
import { PostTypeId } from '@constants/postTypes';

export interface IPostCommentModel {
  _id?: string;
  parentId?: string;
  authorId: string;
  lastAuthorId: string;
  postId: string;
  postTypeId: PostTypeId;
  message: string;
  likes: string[];
  statusId: StatusId;
}
