import {PermissionId} from "../permissions";
import {UserRoleId} from "../userRoles";
import {EndPointPermissionDocument} from "types/constants/endPoint.permissions";

const addSlider: EndPointPermissionDocument = {
    permissionId: [PermissionId.SliderAdd],
    minUserRoleId: UserRoleId.Author
}

const updateSlider: EndPointPermissionDocument = {
    permissionId: [PermissionId.SliderEdit],
    minUserRoleId: UserRoleId.Author
}

const sidebarNavSlider: EndPointPermissionDocument = {
    permissionId: [PermissionId.SliderAdd, PermissionId.SliderEdit, PermissionId.SliderDelete],
    minUserRoleId: UserRoleId.Author
}

const addPage: EndPointPermissionDocument = {
    permissionId: [PermissionId.PageAdd],
    minUserRoleId: UserRoleId.Author
}

const updatePage: EndPointPermissionDocument = {
    permissionId: [PermissionId.PageEdit],
    minUserRoleId: UserRoleId.Author
}

const sidebarNavPage: EndPointPermissionDocument = {
    permissionId: [PermissionId.PageAdd, PermissionId.PageEdit, PermissionId.PageDelete],
    minUserRoleId: UserRoleId.Author
}

const addBlog: EndPointPermissionDocument = {
    permissionId: [PermissionId.BlogAdd],
    minUserRoleId: UserRoleId.Author
}

const updateBlog: EndPointPermissionDocument = {
    permissionId: [PermissionId.BlogEdit],
    minUserRoleId: UserRoleId.Author
}

const sidebarNavBlog: EndPointPermissionDocument = {
    permissionId: [PermissionId.BlogAdd, PermissionId.BlogEdit, PermissionId.BlogDelete],
    minUserRoleId: UserRoleId.Author
}

const addReference: EndPointPermissionDocument = {
    permissionId: [PermissionId.ReferenceAdd],
    minUserRoleId: UserRoleId.Author
}

const updateReference: EndPointPermissionDocument = {
    permissionId: [PermissionId.ReferenceEdit],
    minUserRoleId: UserRoleId.Author
}

const sidebarNavReference: EndPointPermissionDocument = {
    permissionId: [PermissionId.ReferenceAdd, PermissionId.ReferenceEdit, PermissionId.ReferenceDelete],
    minUserRoleId: UserRoleId.Author
}

const addPortfolio: EndPointPermissionDocument = {
    permissionId: [PermissionId.PortfolioAdd],
    minUserRoleId: UserRoleId.Author
}

const updatePortfolio: EndPointPermissionDocument = {
    permissionId: [PermissionId.PortfolioEdit],
    minUserRoleId: UserRoleId.Author
}

const sidebarNavPortfolio: EndPointPermissionDocument = {
    permissionId: [PermissionId.PortfolioAdd, PermissionId.PortfolioEdit, PermissionId.PortfolioDelete],
    minUserRoleId: UserRoleId.Author
}

const addTestimonial: EndPointPermissionDocument = {
    permissionId: [PermissionId.TestimonialAdd],
    minUserRoleId: UserRoleId.Author
}

const updateTestimonial: EndPointPermissionDocument = {
    permissionId: [PermissionId.TestimonialEdit],
    minUserRoleId: UserRoleId.Author
}

const sidebarNavTestimonial: EndPointPermissionDocument = {
    permissionId: [PermissionId.TestimonialAdd, PermissionId.TestimonialEdit, PermissionId.TestimonialDelete],
    minUserRoleId: UserRoleId.Author
}

const addService: EndPointPermissionDocument = {
    permissionId: [PermissionId.ServiceAdd],
    minUserRoleId: UserRoleId.Author
}

const updateService: EndPointPermissionDocument = {
    permissionId: [PermissionId.ServiceEdit],
    minUserRoleId: UserRoleId.Author
}

const sidebarNavService: EndPointPermissionDocument = {
    permissionId: [PermissionId.ServiceAdd, PermissionId.ServiceEdit, PermissionId.ServiceDelete],
    minUserRoleId: UserRoleId.Author
}

const addProduct: EndPointPermissionDocument = {
    permissionId: [PermissionId.ProductAdd],
    minUserRoleId: UserRoleId.Author
}

const updateProduct: EndPointPermissionDocument = {
    permissionId: [PermissionId.ProductEdit],
    minUserRoleId: UserRoleId.Author
}

const sidebarNavProduct: EndPointPermissionDocument = {
    permissionId: [PermissionId.ProductAdd, PermissionId.ProductEdit, PermissionId.ProductDelete],
    minUserRoleId: UserRoleId.Author
}

const addBeforeAndAfter: EndPointPermissionDocument = {
    permissionId: [PermissionId.BeforeAndAfterAdd],
    minUserRoleId: UserRoleId.Author
}

const updateBeforeAndAfter: EndPointPermissionDocument = {
    permissionId: [PermissionId.BeforeAndAfterEdit],
    minUserRoleId: UserRoleId.Author
}

const sidebarNavBeforeAndAfter: EndPointPermissionDocument = {
    permissionId: [PermissionId.BeforeAndAfterAdd, PermissionId.BeforeAndAfterEdit, PermissionId.BeforeAndAfterDelete],
    minUserRoleId: UserRoleId.Author
}

export const PostEndPointPermission = {
    ADD_SLIDER: addSlider,
    UPDATE_SLIDER: updateSlider,
    SIDEBAR_NAV_SLIDER: sidebarNavSlider,
    ADD_PAGE: addPage,
    UPDATE_PAGE: updatePage,
    SIDEBAR_NAV_PAGE: sidebarNavPage,
    ADD_BLOG: addBlog,
    UPDATE_BLOG: updateBlog,
    SIDEBAR_NAV_BLOG: sidebarNavBlog,
    ADD_REFERENCE: addReference,
    UPDATE_REFERENCE: updateReference,
    SIDEBAR_NAV_REFERENCE: sidebarNavReference,
    ADD_PORTFOLIO: addPortfolio,
    UPDATE_PORTFOLIO: updatePortfolio,
    SIDEBAR_NAV_PORTFOLIO: sidebarNavPortfolio,
    ADD_TESTIMONIAL: addTestimonial,
    UPDATE_TESTIMONIAL: updateTestimonial,
    SIDEBAR_NAV_TESTIMONIAL: sidebarNavTestimonial,
    ADD_SERVICE: addService,
    UPDATE_SERVICE: updateService,
    SIDEBAR_NAV_SERVICE: sidebarNavService,
    ADD_PRODUCT: addProduct,
    UPDATE_PRODUCT: updateProduct,
    SIDEBAR_NAV_PRODUCT: sidebarNavProduct,
    ADD_BEFORE_AND_AFTER: addBeforeAndAfter,
    UPDATE_BEFORE_AND_AFTER: updateBeforeAndAfter,
    SIDEBAR_NAV_BEFORE_AND_AFTER: sidebarNavBeforeAndAfter
}