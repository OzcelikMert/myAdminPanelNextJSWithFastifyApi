import {PermissionId} from "../permissions";
import {UserRoleId} from "../userRoles";
import {IPagePermission} from "types/constants/permissionPaths";
import {EndPoints} from "constants/endPoints";
import {ComponentEndPointPermission} from "constants/endPointPermissions/component.endPoint.permission";

export default [
    {
        path: EndPoints.COMPONENT_WITH.LIST,
        minPermission: ComponentEndPointPermission.GET
    },
    {
        path: EndPoints.COMPONENT_WITH.ADD,
        minPermission: ComponentEndPointPermission.ADD
    }
] as IPagePermission[]