import { GalleryTypeId } from '@constants/galleryTypeId';

export interface IGalleryModel {
  _id: string;
  name: string;
  oldName: string;
  typeId: GalleryTypeId;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}
