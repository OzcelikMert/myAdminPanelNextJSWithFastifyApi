import { GalleryTypeId } from '@constants/galleryTypeId';
import { IUserPopulateService } from 'types/services/user.service';
import { IGalleryModel } from 'types/models/gallery.model';

export type IGalleryImageProperties = {
  sizeKB: number;
  sizeMB: number;
};

export type IGalleryGetResultService = {
  authorId: IUserPopulateService;
} & Omit<IGalleryModel, 'authorId'> &
  IGalleryImageProperties;

export type IGalleryAddParamService = {} & FormData;

export interface IGalleryGetManyParamService {
  name?: string[];
  _id?: string[];
  typeId?: GalleryTypeId;
}

export interface IGalleryDeleteManyParamService {
  _id: string[];
}
