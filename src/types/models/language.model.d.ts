import { StatusId } from '@constants/status';

export interface ILanguageModel {
  _id: string;
  title: string;
  image: string;
  shortKey: string;
  locale: string;
  statusId: StatusId;
  rank: number;
  isDefault: boolean;
  createdAt?: string;
  updatedAt?: string;
}
