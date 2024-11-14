import { VariableLibrary } from '@library/variable';
import { PathUtil } from '@utils/path.util';

const getUploadedImageSrc = (imageName?: string): string => {
  return imageName && !VariableLibrary.isEmpty(imageName)
    ? imageName.isUrl()
      ? imageName
      : PathUtil.getImageURL() + imageName
    : '/images/empty.png';
};

const getUploadedFlagSrc = (imageName?: string): string => {
  return imageName && !VariableLibrary.isEmpty(imageName)
    ? imageName.isUrl()
      ? imageName
      : PathUtil.getFlagURL() + imageName
    : '/images/empty.png';
};

export const ImageSourceUtil = {
  getUploadedImageSrc: getUploadedImageSrc,
  getUploadedFlagSrc: getUploadedFlagSrc,
};
