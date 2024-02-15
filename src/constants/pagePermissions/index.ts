import {PermissionPathDocument} from "types/constants/permissionPaths";
import galleryPermissionPath from "./gallery.page.permission";
import componentPermissionPath from "./component.page.permission";
import settingPermissionPath from "./setting.page.permission";
import postPermissionPath from "./post.page.permission";
import postTermPermissionPath from "./postTerm.page.permission";
import navigationPermissionPath from "./navigation.page.permission";
import eCommercePermissionPath from "./eCommerce.page.permission";
import languagePermissionPath from "constants/pagePermissions/language.page.permission";
import userPermissionPath from "constants/pagePermissions/user.page.permission";
import subscriberPermissionPath from "constants/pagePermissions/subscriber.page.permission";

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