import PagePaths from "../pagePaths";
import {PermissionId} from "../permissions";
import {PermissionPathDocument} from "types/constants/permissionPaths";
import {PostTypeId} from "../postTypes";

export default [
    {
        path: PagePaths.post(PostTypeId.Page).add(),
        permissionId: PermissionId.PageAdd
    },
    {
        path: PagePaths.post(PostTypeId.Page).edit(undefined),
        permissionId: PermissionId.PageEdit
    },
    {
        path: PagePaths.themeContent().post(PostTypeId.Slider).add(),
        permissionId: PermissionId.SliderAdd
    },
    {
        path: PagePaths.themeContent().post(PostTypeId.Slider).edit(undefined),
        permissionId: PermissionId.SliderEdit
    },
    {
        path: PagePaths.themeContent().post(PostTypeId.Service).add(),
        permissionId: PermissionId.ServiceAdd
    },
    {
        path: PagePaths.themeContent().post(PostTypeId.Service).edit(undefined),
        permissionId: PermissionId.ServiceEdit
    },
    {
        path: PagePaths.themeContent().post(PostTypeId.Blog).add(),
        permissionId: PermissionId.BlogAdd
    },
    {
        path: PagePaths.themeContent().post(PostTypeId.Blog).edit(undefined),
        permissionId: PermissionId.BlogEdit
    },
    {
        path: PagePaths.themeContent().post(PostTypeId.Portfolio).add(),
        permissionId: PermissionId.PortfolioAdd
    },
    {
        path: PagePaths.themeContent().post(PostTypeId.Portfolio).edit(undefined),
        permissionId: PermissionId.PortfolioEdit
    },
    {
        path: PagePaths.themeContent().post(PostTypeId.Reference).add(),
        permissionId: PermissionId.ReferenceAdd
    },
    {
        path: PagePaths.themeContent().post(PostTypeId.Reference).edit(undefined),
        permissionId: PermissionId.ReferenceEdit
    },
    {
        path: PagePaths.themeContent().post(PostTypeId.Testimonial).add(),
        permissionId: PermissionId.TestimonialAdd
    },
    {
        path: PagePaths.themeContent().post(PostTypeId.Testimonial).edit(undefined),
        permissionId: PermissionId.TestimonialEdit
    },
    {
        path: PagePaths.eCommerce().product().add(),
        permissionId: PermissionId.ProductAdd
    },
    {
        path: PagePaths.eCommerce().product().edit(undefined),
        permissionId: PermissionId.ProductEdit
    },
    {
        path: PagePaths.themeContent().post(PostTypeId.BeforeAndAfter).add(),
        permissionId: PermissionId.BeforeAndAfterAdd
    },
    {
        path: PagePaths.themeContent().post(PostTypeId.BeforeAndAfter).edit(undefined),
        permissionId: PermissionId.BeforeAndAfterEdit
    },
] as PermissionPathDocument[]