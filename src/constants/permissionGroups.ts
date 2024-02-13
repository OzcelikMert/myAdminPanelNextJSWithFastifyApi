import {IPermissionGroup} from "types/constants/permissionGroups";

export enum PermissionGroupId {
    Blog = 1,
    Portfolio,
    Slider,
    Reference,
    Gallery,
    User,
    Page,
    Navigation,
    Settings,
    Service,
    Testimonial,
    Subscriber,
    Component,
    StaticLanguage,
    Product,
    ECommerce,
    BeforeAndAfter
}

export const permissionGroups: Array<IPermissionGroup> = [
    {id: PermissionGroupId.Blog, rank: 1, langKey: "blogs"},
    {id: PermissionGroupId.Portfolio, rank: 2, langKey: "portfolios"},
    {id: PermissionGroupId.Slider, rank: 3, langKey: "sliders"},
    {id: PermissionGroupId.Reference, rank: 4, langKey: "references"},
    {id: PermissionGroupId.Gallery, rank: 5, langKey: "gallery"},
    {id: PermissionGroupId.User, rank: 6, langKey: "users"},
    {id: PermissionGroupId.Page, rank: 7, langKey: "pages"},
    {id: PermissionGroupId.Navigation, rank: 8, langKey: "navigations"},
    {id: PermissionGroupId.Settings, rank: 9, langKey: "settings"},
    {id: PermissionGroupId.Service, rank: 10, langKey: "services"},
    {id: PermissionGroupId.Testimonial, rank: 11, langKey: "testimonials"},
    {id: PermissionGroupId.Subscriber, rank: 12, langKey: "subscribers"},
    {id: PermissionGroupId.Component, rank: 13, langKey: "components"},
    {id: PermissionGroupId.StaticLanguage, rank: 14, langKey: "staticLanguages"},
    {id: PermissionGroupId.ECommerce, rank: 15, langKey: "eCommerce"},
    {id: PermissionGroupId.Product, rank: 16, langKey: "product"},
    {id: PermissionGroupId.BeforeAndAfter, rank: 16, langKey: "beforeAndAfter"},
]