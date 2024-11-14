import { StatusId } from '@constants/status';

export interface INavigationModel {
  _id: string;
  statusId: StatusId;
  parentId?: string;
  authorId: string;
  lastAuthorId: string;
  rank: number;
  isPrimary: boolean;
  isSecondary: boolean;
  contents: INavigationContentModel;
  createdAt?: string;
  updatedAt?: string;
}

export interface INavigationContentModel {
  _id?: string;
  langId: string;
  title?: string;
  url?: string;
}
