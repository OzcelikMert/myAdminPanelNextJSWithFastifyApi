import { IEndPointPermission } from 'types/constants/endPoint.permissions';
import { UserRoleId } from '@constants/userRoles';
import { PostEndPointPermission } from '@constants/endPointPermissions/post.endPoint.permission';

const get: IEndPointPermission = {
  permissionId: [
    ...PostEndPointPermission.GET_BLOG.permissionId,
    ...PostEndPointPermission.GET_PORTFOLIO.permissionId,
    ...PostEndPointPermission.GET_SLIDER.permissionId,
    ...PostEndPointPermission.GET_REFERENCE.permissionId,
    ...PostEndPointPermission.GET_SERVICE.permissionId,
    ...PostEndPointPermission.GET_TESTIMONIAL.permissionId,
    ...PostEndPointPermission.GET_BEFORE_AND_AFTER.permissionId,
  ],
  userRoleId: UserRoleId.Author,
};

export const ThemeContentEndPointPermission = {
  GET: get,
};
