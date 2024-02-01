import V from "library/variable";
import {emptyImage} from "components/theme/chooseImage";
import pathUtil from "utils/path.util";

const getUploadedImageSrc = (imageName?: string): any => {
    return imageName && !V.isEmpty(imageName)
        ? (imageName.isUrl())
            ? imageName
            : pathUtil.uploads.images + imageName
        : emptyImage
}

const getUploadedFlagSrc = (imageName?: string): any => {
    return imageName && !V.isEmpty(imageName)
        ? (imageName.isUrl())
            ? imageName
            : pathUtil.uploads.flags + imageName
        : emptyImage
}

export default {
    getUploadedImageSrc: getUploadedImageSrc,
    getUploadedFlagSrc: getUploadedFlagSrc
}