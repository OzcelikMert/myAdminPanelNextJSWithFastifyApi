import {PermissionId} from "../permissions";
import {UserRoleId} from "../userRoles";
import {IEndPointPermission} from "types/constants/endPoint.permissions";

const addSlider: IEndPointPermission = {
    permissionId: [PermissionId.SliderAdd],
    minUserRoleId: UserRoleId.Author
}

const updateSlider: IEndPointPermission = {
    permissionId: [PermissionId.SliderEdit],
    minUserRoleId: UserRoleId.Author
}

const removeSlider: IEndPointPermission = {
    permissionId: [PermissionId.SliderDelete],
    minUserRoleId: UserRoleId.Author
}

const sidebarNavSlider: IEndPointPermission = {
    permissionId: [PermissionId.SliderAdd, PermissionId.SliderEdit, PermissionId.SliderDelete],
    minUserRoleId: UserRoleId.Author
}

const addPage: IEndPointPermission = {
    permissionId: [PermissionId.PageAdd],
    minUserRoleId: UserRoleId.Author
}

const updatePage: IEndPointPermission = {
    permissionId: [PermissionId.PageEdit],
    minUserRoleId: UserRoleId.Author
}

const removePage: IEndPointPermission = {
    permissionId: [PermissionId.PageDelete],
    minUserRoleId: UserRoleId.Author
}

const sidebarNavPage: IEndPointPermission = {
    permissionId: [PermissionId.PageAdd, PermissionId.PageEdit, PermissionId.PageDelete],
    minUserRoleId: UserRoleId.Author
}

const addBlog: IEndPointPermission = {
    permissionId: [PermissionId.BlogAdd],
    minUserRoleId: UserRoleId.Author
}

const updateBlog: IEndPointPermission = {
    permissionId: [PermissionId.BlogEdit],
    minUserRoleId: UserRoleId.Author
}

const removeBlog: IEndPointPermission = {
    permissionId: [PermissionId.BlogDelete],
    minUserRoleId: UserRoleId.Author
}

const sidebarNavBlog: IEndPointPermission = {
    permissionId: [PermissionId.BlogAdd, PermissionId.BlogEdit, PermissionId.BlogDelete],
    minUserRoleId: UserRoleId.Author
}

const addReference: IEndPointPermission = {
    permissionId: [PermissionId.ReferenceAdd],
    minUserRoleId: UserRoleId.Author
}

const updateReference: IEndPointPermission = {
    permissionId: [PermissionId.ReferenceEdit],
    minUserRoleId: UserRoleId.Author
}

const removeReference: IEndPointPermission = {
    permissionId: [PermissionId.ReferenceDelete],
    minUserRoleId: UserRoleId.Author
}

const sidebarNavReference: IEndPointPermission = {
    permissionId: [PermissionId.ReferenceAdd, PermissionId.ReferenceEdit, PermissionId.ReferenceDelete],
    minUserRoleId: UserRoleId.Author
}

const addPortfolio: IEndPointPermission = {
    permissionId: [PermissionId.PortfolioAdd],
    minUserRoleId: UserRoleId.Author
}

const updatePortfolio: IEndPointPermission = {
    permissionId: [PermissionId.PortfolioEdit],
    minUserRoleId: UserRoleId.Author
}

const removePortfolio: IEndPointPermission = {
    permissionId: [PermissionId.PortfolioDelete],
    minUserRoleId: UserRoleId.Author
}

const sidebarNavPortfolio: IEndPointPermission = {
    permissionId: [PermissionId.PortfolioAdd, PermissionId.PortfolioEdit, PermissionId.PortfolioDelete],
    minUserRoleId: UserRoleId.Author
}

const addTestimonial: IEndPointPermission = {
    permissionId: [PermissionId.TestimonialAdd],
    minUserRoleId: UserRoleId.Author
}

const updateTestimonial: IEndPointPermission = {
    permissionId: [PermissionId.TestimonialEdit],
    minUserRoleId: UserRoleId.Author
}

const removeTestimonial: IEndPointPermission = {
    permissionId: [PermissionId.TestimonialDelete],
    minUserRoleId: UserRoleId.Author
}

const sidebarNavTestimonial: IEndPointPermission = {
    permissionId: [PermissionId.TestimonialAdd, PermissionId.TestimonialEdit, PermissionId.TestimonialDelete],
    minUserRoleId: UserRoleId.Author
}

const addService: IEndPointPermission = {
    permissionId: [PermissionId.ServiceAdd],
    minUserRoleId: UserRoleId.Author
}

const updateService: IEndPointPermission = {
    permissionId: [PermissionId.ServiceEdit],
    minUserRoleId: UserRoleId.Author
}

const removeService: IEndPointPermission = {
    permissionId: [PermissionId.ServiceDelete],
    minUserRoleId: UserRoleId.Author
}

const sidebarNavService: IEndPointPermission = {
    permissionId: [PermissionId.ServiceAdd, PermissionId.ServiceEdit, PermissionId.ServiceDelete],
    minUserRoleId: UserRoleId.Author
}

const addProduct: IEndPointPermission = {
    permissionId: [PermissionId.ProductAdd],
    minUserRoleId: UserRoleId.Author
}

const updateProduct: IEndPointPermission = {
    permissionId: [PermissionId.ProductEdit],
    minUserRoleId: UserRoleId.Author
}

const removeProduct: IEndPointPermission = {
    permissionId: [PermissionId.ProductDelete],
    minUserRoleId: UserRoleId.Author
}

const sidebarNavProduct: IEndPointPermission = {
    permissionId: [PermissionId.ProductAdd, PermissionId.ProductEdit, PermissionId.ProductDelete],
    minUserRoleId: UserRoleId.Author
}

const addBeforeAndAfter: IEndPointPermission = {
    permissionId: [PermissionId.BeforeAndAfterAdd],
    minUserRoleId: UserRoleId.Author
}

const updateBeforeAndAfter: IEndPointPermission = {
    permissionId: [PermissionId.BeforeAndAfterEdit],
    minUserRoleId: UserRoleId.Author
}

const removeBeforeAndAfter: IEndPointPermission = {
    permissionId: [PermissionId.BeforeAndAfterDelete],
    minUserRoleId: UserRoleId.Author
}

const sidebarNavBeforeAndAfter: IEndPointPermission = {
    permissionId: [PermissionId.BeforeAndAfterAdd, PermissionId.BeforeAndAfterEdit, PermissionId.BeforeAndAfterDelete],
    minUserRoleId: UserRoleId.Author
}

export const PostEndPointPermission = {
    ADD_SLIDER: addSlider,
    UPDATE_SLIDER: updateSlider,
    DELETE_SLIDER: removeSlider,
    SIDEBAR_NAV_SLIDER: sidebarNavSlider,
    ADD_PAGE: addPage,
    UPDATE_PAGE: updatePage,
    DELETE_PAGE: removePage,
    SIDEBAR_NAV_PAGE: sidebarNavPage,
    ADD_BLOG: addBlog,
    UPDATE_BLOG: updateBlog,
    DELETE_BLOG: removeBlog,
    SIDEBAR_NAV_BLOG: sidebarNavBlog,
    ADD_REFERENCE: addReference,
    UPDATE_REFERENCE: updateReference,
    DELETE_REFERENCE: removeReference,
    SIDEBAR_NAV_REFERENCE: sidebarNavReference,
    ADD_PORTFOLIO: addPortfolio,
    UPDATE_PORTFOLIO: updatePortfolio,
    DELETE_PORTFOLIO: removePortfolio,
    SIDEBAR_NAV_PORTFOLIO: sidebarNavPortfolio,
    ADD_TESTIMONIAL: addTestimonial,
    UPDATE_TESTIMONIAL: updateTestimonial,
    DELETE_TESTIMONIAL: removeTestimonial,
    SIDEBAR_NAV_TESTIMONIAL: sidebarNavTestimonial,
    ADD_SERVICE: addService,
    UPDATE_SERVICE: updateService,
    DELETE_SERVICE: removeService,
    SIDEBAR_NAV_SERVICE: sidebarNavService,
    ADD_PRODUCT: addProduct,
    UPDATE_PRODUCT: updateProduct,
    DELETE_PRODUCT: removeProduct,
    SIDEBAR_NAV_PRODUCT: sidebarNavProduct,
    ADD_BEFORE_AND_AFTER: addBeforeAndAfter,
    UPDATE_BEFORE_AND_AFTER: updateBeforeAndAfter,
    DELETE_BEFORE_AND_AFTER: removeBeforeAndAfter,
    SIDEBAR_NAV_BEFORE_AND_AFTER: sidebarNavBeforeAndAfter
}