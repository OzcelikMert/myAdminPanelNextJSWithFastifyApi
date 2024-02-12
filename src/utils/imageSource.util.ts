import V from "library/variable";
import {emptyImage} from "components/theme/chooseImage";
import {PathUtil} from "utils/path.util";

const getUploadedImageSrc = (imageName?: string): any => {
    return imageName && !V.isEmpty(imageName)
        ? (imageName.isUrl())
            ? imageName
            : PathUtil.getImageURL() + imageName
        : emptyImage
}

const getUploadedFlagSrc = (imageName?: string): any => {
    return imageName && !V.isEmpty(imageName)
        ? (imageName.isUrl())
            ? imageName
            : PathUtil.getFlagURL() + imageName
        : emptyImage
}

export const ImageSourceUtil = {
    getUploadedImageSrc: getUploadedImageSrc,
    getUploadedFlagSrc: getUploadedFlagSrc
}