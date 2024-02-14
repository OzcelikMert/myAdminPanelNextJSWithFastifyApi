import {PostTypeId} from "./postTypes";
import {ISidebarPath} from "types/constants/sidebarNavs";
import {EndPoints} from "constants/endPoints";
import {NavigationEndPointPermission} from "constants/endPointPermissions/navigation.endPoint.permission";
import {PostEndPointPermission} from "constants/endPointPermissions/post.endPoint.permission";
import {ThemeContentEndPointPermission} from "constants/endPointPermissions/themeContent.endPoint.permission";
import {ComponentEndPointPermission} from "constants/endPointPermissions/component.endPoint.permission";
import {ECommerceEndPointPermission} from "constants/endPointPermissions/eCommerce.endPoint.permission";
import {UserEndPointPermission} from "constants/endPointPermissions/user.endPoint.permission";
import {SubscriberEndPointPermission} from "constants/endPointPermissions/subscriber.endPoint.permission";
import {LanguageEndPointPermission} from "constants/endPointPermissions/language.endPoint.permission";
import {SettingsEndPointPermission} from "constants/endPointPermissions/settings.endPoint.permission";

export const sidebarNavs: ISidebarPath[] = [
    {path: EndPoints.DASHBOARD, icon: `home`, title: "dashboard"},
    {
        path: EndPoints.GALLERY,
        icon: `image-multiple`,
        title: "gallery",
        state: `gallery`,
        subPaths: [
            {
                path: EndPoints.GALLERY_WITH.UPLOAD,
                icon: `upload`,
                title: "upload",
            },
            {path: EndPoints.GALLERY_WITH.LIST, title: "list"}
        ]
    },
    {
        path: EndPoints.NAVIGATION,
        icon: `navigation-variant`,
        title: "navigations",
        state: `navigates`,
        permission: NavigationEndPointPermission.SIDEBAR_NAV,
        subPaths: [
            {
                path: EndPoints.NAVIGATION_WITH.ADD,
                title: "add",
                permission: NavigationEndPointPermission.ADD
            },
            {path: EndPoints.NAVIGATION_WITH.LIST, title: "list"}
        ]
    },
    {
        path: EndPoints.POST(PostTypeId.Page),
        icon: `note-multiple`,
        title: "pages",
        state: `pages`,
        permission: PostEndPointPermission.SIDEBAR_NAV_PAGE,
        subPaths: [
            {
                path:  EndPoints.POST_WITH(PostTypeId.Page).ADD,
                title: "add",
                permission: PostEndPointPermission.ADD_PAGE
            },
            {path: EndPoints.POST_WITH(PostTypeId.Page).LIST, title: "list"}
        ]
    },
    {
        path: EndPoints.THEME_CONTENT,
        icon: `collage`,
        title: "themeContents",
        state: `themeContents`,
        permission: ThemeContentEndPointPermission.SIDEBAR_NAV,
        subPaths: [
            {
                path: EndPoints.THEME_CONTENT_WITH.BLOG,
                title: "blogs",
                state: `blogs`,
                permission: PostEndPointPermission.SIDEBAR_NAV_BLOG,
                subPaths: [
                    {
                        path: EndPoints.THEME_CONTENT_WITH.BLOG_WITH.ADD,
                        title: "add",
                        permission: PostEndPointPermission.ADD_BLOG
                    },
                    {path: EndPoints.THEME_CONTENT_WITH.BLOG_WITH.LIST, title: "list"}
                ]
            },
            {
                path: EndPoints.THEME_CONTENT_WITH.PORTFOLIO,
                title: "portfolios",
                state: `portfolios`,
                permission: PostEndPointPermission.SIDEBAR_NAV_PORTFOLIO,
                subPaths: [
                    {
                        path: EndPoints.THEME_CONTENT_WITH.PORTFOLIO_WITH.ADD,
                        title: "add",
                        permission: PostEndPointPermission.ADD_PORTFOLIO
                    },
                    {path: EndPoints.THEME_CONTENT_WITH.PORTFOLIO_WITH.LIST, title: "list"}
                ]
            },
            {
                path: EndPoints.THEME_CONTENT_WITH.SLIDER,
                title: "sliders",
                state: `sliders`,
                permission: PostEndPointPermission.SIDEBAR_NAV_SLIDER,
                subPaths: [
                    {
                        path: EndPoints.THEME_CONTENT_WITH.SLIDER_WITH.ADD,
                        title: "add",
                        permission: PostEndPointPermission.ADD_SLIDER
                    },
                    {path: EndPoints.THEME_CONTENT_WITH.SLIDER_WITH.LIST, title: "list"}
                ]
            },
            {
                path: EndPoints.THEME_CONTENT_WITH.REFERENCE,
                title: "references",
                state: `references`,
                permission: PostEndPointPermission.SIDEBAR_NAV_REFERENCE,
                subPaths: [
                    {
                        path: EndPoints.THEME_CONTENT_WITH.REFERENCE_WITH.ADD,
                        title: "add",
                        permission: PostEndPointPermission.ADD_REFERENCE
                    },
                    {path: EndPoints.THEME_CONTENT_WITH.REFERENCE_WITH.LIST, title: "list"}
                ]
            },
            {
                path: EndPoints.THEME_CONTENT_WITH.SERVICE,
                title: "services",
                state: `services`,
                permission: PostEndPointPermission.SIDEBAR_NAV_SERVICE,
                subPaths: [
                    {
                        path:  EndPoints.THEME_CONTENT_WITH.SERVICE_WITH.ADD,
                        title: "add",
                        permission: PostEndPointPermission.ADD_SERVICE
                    },
                    {path: EndPoints.THEME_CONTENT_WITH.SERVICE_WITH.LIST, title: "list"}
                ]
            },
            {
                path: EndPoints.THEME_CONTENT_WITH.TESTIMONIAL,
                title: "testimonials",
                state: `testimonials`,
                permission: PostEndPointPermission.SIDEBAR_NAV_TESTIMONIAL,
                subPaths: [
                    {
                        path: EndPoints.THEME_CONTENT_WITH.TESTIMONIAL_WITH.ADD,
                        title: "add",
                        permission: PostEndPointPermission.ADD_TESTIMONIAL
                    },
                    {path: EndPoints.THEME_CONTENT_WITH.TESTIMONIAL_WITH.LIST, title: "list"}
                ]
            },
            {
                path: EndPoints.THEME_CONTENT_WITH.BEFORE_AND_AFTER,
                title: "beforeAndAfter",
                state: `beforeAndAfter`,
                permission: PostEndPointPermission.SIDEBAR_NAV_BEFORE_AND_AFTER,
                subPaths: [
                    {
                        path: EndPoints.THEME_CONTENT_WITH.BEFORE_AND_AFTER_WITH.ADD,
                        title: "add",
                        permission: PostEndPointPermission.ADD_BEFORE_AND_AFTER
                    },
                    {path: EndPoints.THEME_CONTENT_WITH.BEFORE_AND_AFTER_WITH.LIST, title: "list"}
                ]
            },
        ]
    },
    {
        path: EndPoints.COMPONENT,
        icon: `shape`,
        title: "components",
        state: `components`,
        permission: ComponentEndPointPermission.SIDEBAR_NAV,
        subPaths: [
            {
                path: EndPoints.COMPONENT_WITH.ADD,
                title: "add",
                permission: ComponentEndPointPermission.ADD,
            },
            {path: EndPoints.COMPONENT_WITH.LIST, title: "list"}
        ]
    },
    {
        path: EndPoints.ECOMMERCE,
        icon: `market`,
        title: "eCommerce",
        state: `eCommerce`,
        permission: ECommerceEndPointPermission.SIDEBAR_NAV,
        subPaths: [
            {
                path: EndPoints.ECOMMERCE_WITH.PRODUCT,
                title: "product",
                state: `eCommerceProduct`,
                permission: PostEndPointPermission.SIDEBAR_NAV_PRODUCT,
                subPaths: [
                    {
                        path: EndPoints.ECOMMERCE_WITH.PRODUCT_WITH.ADD,
                        title: "add",
                        permission: PostEndPointPermission.ADD_PRODUCT,
                    },
                    {path: EndPoints.ECOMMERCE_WITH.PRODUCT_WITH.LIST, title: "list"}
                ]
            },
            {
                path: EndPoints.ECOMMERCE_WITH.SETTINGS,
                title: "settings",
                permission: ECommerceEndPointPermission.SETTINGS
            },
        ]
    },
    {
        path: EndPoints.USER,
        icon: `account-multiple`,
        title: "users",
        state: `users`,
        permission: UserEndPointPermission.SIDEBAR_NAV,
        subPaths: [
            {
                path: EndPoints.USER_WITH.ADD,
                title: "add",
                permission: UserEndPointPermission.ADD
            },
            {path: EndPoints.USER_WITH.LIST, title: "list"}
        ]
    },
    {
        path: EndPoints.SUBSCRIBER,
        title: "subscribers",
        permission: SubscriberEndPointPermission.SIDEBAR_NAV
    },
    {
        path: EndPoints.LANGUAGE,
        icon: `languages`,
        title: "languages",
        state: `languages`,
        permission: LanguageEndPointPermission.SIDEBAR_NAV,
        subPaths: [
            {
                path: EndPoints.LANGUAGE_WITH.ADD,
                title: "add",
                permission: LanguageEndPointPermission.SIDEBAR_NAV
            },
            {
                path: EndPoints.LANGUAGE_WITH.LIST,
                title: "list",
                permission: LanguageEndPointPermission.SIDEBAR_NAV
            }
        ]
    },
    {
        path: EndPoints.SETTINGS,
        icon: `cog`,
        title: "settings",
        state: `settings`,
        permission: SettingsEndPointPermission.SIDEBAR_NAV,
        subPaths: [
            {
                path: EndPoints.SETTINGS_WITH.GENERAL,
                title: "general",
                permission: SettingsEndPointPermission.UPDATE_GENERAL
            },
            {
                path: EndPoints.SETTINGS_WITH.SEO,
                icon: `magnify`,
                title: "seo",
                permission: SettingsEndPointPermission.UPDATE_SEO
            },
            {
                path: EndPoints.SETTINGS_WITH.CONTACT_FORMS,
                title: "contactForms",
                permission: SettingsEndPointPermission.UPDATE_CONTACT_FORM,
            },
            {
                path: EndPoints.SETTINGS_WITH.STATIC_LANGUAGES,
                title: "staticLanguages",
                permission: SettingsEndPointPermission.UPDATE_STATIC_LANGUAGE
            },
            {
                path: EndPoints.SETTINGS_WITH.SOCIAL_MEDIA,
                title: "socialMedia",
                permission: SettingsEndPointPermission.UPDATE_SOCIAL_MEDIA
            },
        ]
    },
];