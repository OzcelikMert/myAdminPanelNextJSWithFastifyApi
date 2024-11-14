import { PermissionId } from '../permissions';
import { UserRoleId } from '../userRoles';
import { IEndPointPermission } from 'types/constants/endPoint.permissions';

const addSlider: IEndPointPermission = {
  permissionId: [PermissionId.SliderAdd],
  userRoleId: UserRoleId.Author,
};

const updateSlider: IEndPointPermission = {
  permissionId: [PermissionId.SliderEdit],
  userRoleId: UserRoleId.Author,
};

const removeSlider: IEndPointPermission = {
  permissionId: [PermissionId.SliderDelete],
  userRoleId: UserRoleId.Author,
};

const getSlider: IEndPointPermission = {
  permissionId: [
    PermissionId.SliderAdd,
    PermissionId.SliderEdit,
    PermissionId.SliderDelete,
  ],
  userRoleId: UserRoleId.Author,
};

const addPage: IEndPointPermission = {
  permissionId: [],
  userRoleId: UserRoleId.SuperAdmin,
};

const updatePage: IEndPointPermission = {
  permissionId: [PermissionId.PageEdit],
  userRoleId: UserRoleId.Editor,
};

const removePage: IEndPointPermission = {
  permissionId: [],
  userRoleId: UserRoleId.SuperAdmin,
};

const getPage: IEndPointPermission = {
  permissionId: [PermissionId.PageEdit],
  userRoleId: UserRoleId.Editor,
};

const addBlog: IEndPointPermission = {
  permissionId: [PermissionId.BlogAdd],
  userRoleId: UserRoleId.Author,
};

const updateBlog: IEndPointPermission = {
  permissionId: [PermissionId.BlogEdit],
  userRoleId: UserRoleId.Author,
};

const removeBlog: IEndPointPermission = {
  permissionId: [PermissionId.BlogDelete],
  userRoleId: UserRoleId.Author,
};

const getBlog: IEndPointPermission = {
  permissionId: [
    PermissionId.BlogAdd,
    PermissionId.BlogEdit,
    PermissionId.BlogDelete,
  ],
  userRoleId: UserRoleId.Author,
};

const addReference: IEndPointPermission = {
  permissionId: [PermissionId.ReferenceAdd],
  userRoleId: UserRoleId.Author,
};

const updateReference: IEndPointPermission = {
  permissionId: [PermissionId.ReferenceEdit],
  userRoleId: UserRoleId.Author,
};

const removeReference: IEndPointPermission = {
  permissionId: [PermissionId.ReferenceDelete],
  userRoleId: UserRoleId.Author,
};

const getReference: IEndPointPermission = {
  permissionId: [
    PermissionId.ReferenceAdd,
    PermissionId.ReferenceEdit,
    PermissionId.ReferenceDelete,
  ],
  userRoleId: UserRoleId.Author,
};

const addPortfolio: IEndPointPermission = {
  permissionId: [PermissionId.PortfolioAdd],
  userRoleId: UserRoleId.Author,
};

const updatePortfolio: IEndPointPermission = {
  permissionId: [PermissionId.PortfolioEdit],
  userRoleId: UserRoleId.Author,
};

const removePortfolio: IEndPointPermission = {
  permissionId: [PermissionId.PortfolioDelete],
  userRoleId: UserRoleId.Author,
};

const getPortfolio: IEndPointPermission = {
  permissionId: [
    PermissionId.PortfolioAdd,
    PermissionId.PortfolioEdit,
    PermissionId.PortfolioDelete,
  ],
  userRoleId: UserRoleId.Author,
};

const addTestimonial: IEndPointPermission = {
  permissionId: [PermissionId.TestimonialAdd],
  userRoleId: UserRoleId.Author,
};

const updateTestimonial: IEndPointPermission = {
  permissionId: [PermissionId.TestimonialEdit],
  userRoleId: UserRoleId.Author,
};

const removeTestimonial: IEndPointPermission = {
  permissionId: [PermissionId.TestimonialDelete],
  userRoleId: UserRoleId.Author,
};

const getTestimonial: IEndPointPermission = {
  permissionId: [
    PermissionId.TestimonialAdd,
    PermissionId.TestimonialEdit,
    PermissionId.TestimonialDelete,
  ],
  userRoleId: UserRoleId.Author,
};

const addService: IEndPointPermission = {
  permissionId: [PermissionId.ServiceAdd],
  userRoleId: UserRoleId.Author,
};

const updateService: IEndPointPermission = {
  permissionId: [PermissionId.ServiceEdit],
  userRoleId: UserRoleId.Author,
};

const removeService: IEndPointPermission = {
  permissionId: [PermissionId.ServiceDelete],
  userRoleId: UserRoleId.Author,
};

const getService: IEndPointPermission = {
  permissionId: [
    PermissionId.ServiceAdd,
    PermissionId.ServiceEdit,
    PermissionId.ServiceDelete,
  ],
  userRoleId: UserRoleId.Author,
};

const addProduct: IEndPointPermission = {
  permissionId: [PermissionId.ProductAdd],
  userRoleId: UserRoleId.Author,
};

const updateProduct: IEndPointPermission = {
  permissionId: [PermissionId.ProductEdit],
  userRoleId: UserRoleId.Author,
};

const removeProduct: IEndPointPermission = {
  permissionId: [PermissionId.ProductDelete],
  userRoleId: UserRoleId.Author,
};

const getProduct: IEndPointPermission = {
  permissionId: [
    PermissionId.ProductAdd,
    PermissionId.ProductEdit,
    PermissionId.ProductDelete,
  ],
  userRoleId: UserRoleId.Author,
};

const addBeforeAndAfter: IEndPointPermission = {
  permissionId: [PermissionId.BeforeAndAfterAdd],
  userRoleId: UserRoleId.Author,
};

const updateBeforeAndAfter: IEndPointPermission = {
  permissionId: [PermissionId.BeforeAndAfterEdit],
  userRoleId: UserRoleId.Author,
};

const removeBeforeAndAfter: IEndPointPermission = {
  permissionId: [PermissionId.BeforeAndAfterDelete],
  userRoleId: UserRoleId.Author,
};

const getBeforeAndAfter: IEndPointPermission = {
  permissionId: [
    PermissionId.BeforeAndAfterAdd,
    PermissionId.BeforeAndAfterEdit,
    PermissionId.BeforeAndAfterDelete,
  ],
  userRoleId: UserRoleId.Author,
};

export const PostEndPointPermission = {
  ADD_SLIDER: addSlider,
  UPDATE_SLIDER: updateSlider,
  DELETE_SLIDER: removeSlider,
  GET_SLIDER: getSlider,
  ADD_PAGE: addPage,
  UPDATE_PAGE: updatePage,
  DELETE_PAGE: removePage,
  GET_PAGE: getPage,
  ADD_BLOG: addBlog,
  UPDATE_BLOG: updateBlog,
  DELETE_BLOG: removeBlog,
  GET_BLOG: getBlog,
  ADD_REFERENCE: addReference,
  UPDATE_REFERENCE: updateReference,
  DELETE_REFERENCE: removeReference,
  GET_REFERENCE: getReference,
  ADD_PORTFOLIO: addPortfolio,
  UPDATE_PORTFOLIO: updatePortfolio,
  DELETE_PORTFOLIO: removePortfolio,
  GET_PORTFOLIO: getPortfolio,
  ADD_TESTIMONIAL: addTestimonial,
  UPDATE_TESTIMONIAL: updateTestimonial,
  DELETE_TESTIMONIAL: removeTestimonial,
  GET_TESTIMONIAL: getTestimonial,
  ADD_SERVICE: addService,
  UPDATE_SERVICE: updateService,
  DELETE_SERVICE: removeService,
  GET_SERVICE: getService,
  ADD_PRODUCT: addProduct,
  UPDATE_PRODUCT: updateProduct,
  DELETE_PRODUCT: removeProduct,
  GET_PRODUCT: getProduct,
  ADD_BEFORE_AND_AFTER: addBeforeAndAfter,
  UPDATE_BEFORE_AND_AFTER: updateBeforeAndAfter,
  DELETE_BEFORE_AND_AFTER: removeBeforeAndAfter,
  GET_BEFORE_AND_AFTER: getBeforeAndAfter,
};
