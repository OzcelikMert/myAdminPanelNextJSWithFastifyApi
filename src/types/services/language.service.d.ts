import { ILanguageModel } from '../models/language.model';
import { StatusId } from '@constants/status';

export type ILanguageGetResultService = {} & ILanguageModel;

export interface ILanguageGetWithIdParamService {
  _id: string;
  shortKey?: string;
  locale?: string;
}

export interface ILanguageGetManyParamService {
  _id?: string[];
  statusId?: StatusId;
}

export type ILanguageAddParamService = {} & Omit<ILanguageModel, '_id'>;

export type ILanguageUpdateWithIdParamService = {
  _id: string;
} & ILanguageAddParamService;

export type ILanguageUpdateRankWithIdParamService = {
  _id: string;
  rank: number;
};
