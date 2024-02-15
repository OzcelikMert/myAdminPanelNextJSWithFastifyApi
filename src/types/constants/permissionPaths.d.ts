import {IEndPointPermission} from "types/constants/endPoint.permissions";

interface IPagePermission {
    path: string,
    minPermission: IEndPointPermission
}


