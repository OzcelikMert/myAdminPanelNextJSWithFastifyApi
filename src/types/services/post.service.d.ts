import { IUserPopulateService } from './user.service';
import { IPostTermPopulateService } from './postTerm.service';
import {
  IPostContentModel,
  IPostModel,
  IPostECommerceModel,
  IPostECommerceVariationModel,
} from '../models/post.model';
import { PostTypeId } from '@constants/postTypes';
import { PageTypeId } from '@constants/pageTypes';
import { StatusId } from '@constants/status';
import { PostSortTypeId } from '@constants/postSortTypes';

export interface IPostAlternateService {
  langId: string;
  title?: string;
  url?: string;
}

export type IPostGetResultService = {
  authorId: IUserPopulateService;
  lastAuthorId: IUserPopulateService;
  authors?: IUserPopulateService[];
  views?: number;
  categories?: IPostTermPopulateService[];
  tags?: IPostTermPopulateService[];
  contents?: IPostContentModel;
  alternates?: IPostAlternateService[];
  eCommerce?: Omit<
    IPostECommerceModel<IPostTermPopulateService, IPostTermPopulateService[]>,
    'variations'
  > & {
    variations?: IPostECommerceVariationModel<IPostTermPopulateService>[];
  };
} & Omit<
  IPostModel,
  | 'contents'
  | 'categories'
  | 'tags'
  | 'eCommerce'
  | 'authorId'
  | 'lastAuthorId'
  | 'authors'
>;

export type IPostGetManyResultService = {
  eCommerce?: Omit<IPostECommerceModel, 'variations'> & {
    variations?: (Omit<IPostECommerceVariationModel, 'contents'> & {
      alternates?: IPostAlternateService[];
    })[];
  };
} & Omit<IPostGetResultService, 'eCommerce'>;

export interface IPostGetWithIdParamService {
  typeId: PostTypeId;
  _id: string;
  pageTypeId?: PageTypeId;
  langId?: string;
  statusId?: StatusId;
}

export interface IPostGetManyParamService {
  _id?: string[];
  sortTypeId?: PostSortTypeId;
  typeId?: PostTypeId[];
  pageTypeId?: PageTypeId[];
  langId?: string;
  statusId?: StatusId;
  count?: number;
  page?: number;
  ignorePostId?: string[];
  title?: string;
  authorId?: string;
  categories?: string[];
  tags?: string[];
}

export interface IPostGetCountParamService {
  typeId: PostTypeId;
  statusId?: StatusId;
  title?: string;
  categories?: string[];
}

export type IPostAddParamService = {} & Omit<
  IPostModel,
  '_id' | 'views' | 'authorId' | 'lastAuthorId'
>;

export type IPostAddProductParamService = {} & Omit<
  IPostModel,
  | '_id'
  | 'views'
  | 'authorId'
  | 'lastAuthorId'
  | 'pageTypeId'
  | 'isNoIndex'
  | 'beforeAndAfter'
  | 'components'
>;

export type IPostUpdateWithIdParamService = {
  _id: string;
} & IPostAddParamService;

export type IPostUpdateProductWithIdParamService = {
  _id: string;
} & IPostAddProductParamService;

export type IPostUpdateRankWithIdParamService = {
  _id: string;
  typeId: PostTypeId;
  rank: number;
};

export type IPostUpdateViewWithIdParamService = {
  _id: string;
  typeId: PostTypeId;
  langId: string;
};

export type IPostUpdateStatusManyParamService = {
  _id: string[];
  typeId: PostTypeId;
  statusId: StatusId;
};

export interface IPostDeleteManyParamService {
  _id: string[];
  typeId: PostTypeId;
}

export interface IPostDeleteProductManyParamService {
  _id: string[];
}
