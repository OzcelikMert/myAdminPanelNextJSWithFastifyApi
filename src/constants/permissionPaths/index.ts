import {PermissionPathDocument} from "types/constants/permissionPaths";
import galleryPermissionPath from "./gallery.permissionPath";
import componentPermissionPath from "./component.permissionPath";
import settingPermissionPath from "./setting.permissionPath";
import postPermissionPath from "./post.permissionPath";
import postTermPermissionPath from "./postTerm.permissionPath";
import navigationPermissionPath from "./navigation.permissionPath";
import eCommercePermissionPath from "./eCommerce.permissionPath";
import languagePermissionPath from "constants/permissionPaths/language.permissionPath";
import userPermissionPath from "constants/permissionPaths/user.permissionPath";
import subscriberPermissionPath from "constants/permissionPaths/subscriber.permissionPath";

const PermissionPaths: PermissionPathDocument[] = [
    ...galleryPermissionPath,
    ...componentPermissionPath,
    ...settingPermissionPath,
    ...postPermissionPath,
    ...postTermPermissionPath,
    ...navigationPermissionPath,
    ...eCommercePermissionPath,
    ...languagePermissionPath,
    ...userPermissionPath,
    ...subscriberPermissionPath
];

export default PermissionPaths;