import {PostTypeId} from "./postTypes";
import {SideBarPath} from "types/constants/sidebarNavs";
import {EndPoints} from "constants/endPoints";
import {GalleryEndPoint} from "constants/endPoints/gallery.endPoint";
import {NavigationEndPoint} from "constants/endPoints/navigation.endPoint";
import {PostEndPoint} from "constants/endPoints/post.endPoint";
import {ComponentEndPoint} from "constants/endPoints/component.endPoint";
import {ECommerceEndPoint} from "constants/endPoints/eCommerce.endPoint";
import {UserEndPoint} from "constants/endPoints/user.endPoint";
import {SettingsEndPoint} from "constants/endPoints/settings.endPoint";
import {LanguageEndPoint} from "constants/endPoints/language.endPoint";
import {NavigationEndPointPermission} from "constants/endPointPermissions/navigation.endPoint.permission";
import {PostEndPointPermission} from "constants/endPointPermissions/post.endPoint.permission";
import {ThemeContentEndPointPermission} from "constants/endPointPermissions/themeContent.endPoint.permission";
import {ComponentEndPointPermission} from "constants/endPointPermissions/component.endPoint.permission";
import {ECommerceEndPointPermission} from "constants/endPointPermissions/eCommerce.endPoint.permission";
import {UserEndPointPermission} from "constants/endPointPermissions/user.endPoint.permission";
import {SubscriberEndPointPermission} from "constants/endPointPermissions/subscriber.endPoint.permission";
import {LanguageEndPointPermission} from "constants/endPointPermissions/language.endPoint.permission";
import {SettingsEndPointPermission} from "constants/endPointPermissions/settings.endPoint.permission";

export const sidebarNav: SideBarPath[] = [
    {path: EndPoints.DASHBOARD, icon: `home`, title: "dashboard"},
    {
        path: EndPoints.GALLERY,
        icon: `image-multiple`,
        title: "gallery",
        state: `gallery`,
        subPaths: [
            {
                path: GalleryEndPoint.UPLOAD,
                icon: `upload`,
                title: "upload",
            },
            {path: GalleryEndPoint.LIST, title: "list"}
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
                path: NavigationEndPoint.ADD,
                title: "add",
                permission: NavigationEndPointPermission.ADD
            },
            {path: NavigationEndPoint.LIST, title: "list"}
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
                path: PostEndPoint.ADD,
                title: "add",
                permission: PostEndPointPermission.ADD_PAGE
            },
            {path: PostEndPoint.LIST, title: "list"}
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
                path: EndPoints.POST(PostTypeId.Blog),
                title: "blogs",
                state: `blogs`,
                permission: PostEndPointPermission.SIDEBAR_NAV_BLOG,
                subPaths: [
                    {
                        path: PostEndPoint.ADD,
                        title: "add",
                        permission: PostEndPointPermission.ADD_BLOG
                    },
                    {path: PostEndPoint.LIST, title: "list"}
                ]
            },
            {
                path: EndPoints.POST(PostTypeId.Portfolio),
                title: "portfolios",
                state: `portfolios`,
                permission: PostEndPointPermission.SIDEBAR_NAV_PORTFOLIO,
                subPaths: [
                    {
                        path: PostEndPoint.ADD,
                        title: "add",
                        permission: PostEndPointPermission.ADD_PORTFOLIO
                    },
                    {path: PostEndPoint.LIST, title: "list"}
                ]
            },
            {
                path: EndPoints.POST(PostTypeId.Slider),
                title: "sliders",
                state: `sliders`,
                permission: PostEndPointPermission.SIDEBAR_NAV_SLIDER,
                subPaths: [
                    {
                        path: PostEndPoint.ADD,
                        title: "add",
                        permission: PostEndPointPermission.ADD_SLIDER
                    },
                    {path: PostEndPoint.LIST, title: "list"}
                ]
            },
            {
                path: EndPoints.POST(PostTypeId.Reference),
                title: "references",
                state: `references`,
                permission: PostEndPointPermission.SIDEBAR_NAV_REFERENCE,
                subPaths: [
                    {
                        path: PostEndPoint.ADD,
                        title: "add",
                        permission: PostEndPointPermission.ADD_REFERENCE
                    },
                    {path: PostEndPoint.LIST, title: "list"}
                ]
            },
            {
                path: EndPoints.POST(PostTypeId.Service),
                title: "services",
                state: `services`,
                permission: PostEndPointPermission.SIDEBAR_NAV_SERVICE,
                subPaths: [
                    {
                        path: PostEndPoint.ADD,
                        title: "add",
                        permission: PostEndPointPermission.ADD_SERVICE
                    },
                    {path: PostEndPoint.LIST, title: "list"}
                ]
            },
            {
                path: EndPoints.POST(PostTypeId.Testimonial),
                title: "testimonials",
                state: `testimonials`,
                permission: PostEndPointPermission.SIDEBAR_NAV_TESTIMONIAL,
                subPaths: [
                    {
                        path: PostEndPoint.ADD,
                        title: "add",
                        permission: PostEndPointPermission.ADD_TESTIMONIAL
                    },
                    {path: PostEndPoint.LIST, title: "list"}
                ]
            },
            {
                path: EndPoints.POST(PostTypeId.BeforeAndAfter),
                title: "beforeAndAfter",
                state: `beforeAndAfter`,
                permission: PostEndPointPermission.SIDEBAR_NAV_BEFORE_AND_AFTER,
                subPaths: [
                    {
                        path: PostEndPoint.ADD,
                        title: "add",
                        permission: PostEndPointPermission.ADD_BEFORE_AND_AFTER
                    },
                    {path: PostEndPoint.LIST, title: "list"}
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
                path: ComponentEndPoint.ADD,
                title: "add",
                permission: ComponentEndPointPermission.ADD,
            },
            {path: ComponentEndPoint.LIST, title: "list"}
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
                path: EndPoints.POST(PostTypeId.Product),
                title: "product",
                state: `eCommerceProduct`,
                permission: PostEndPointPermission.SIDEBAR_NAV_PRODUCT,
                subPaths: [
                    {
                        path: PostEndPoint.ADD,
                        title: "add",
                        permission: PostEndPointPermission.ADD_PRODUCT,
                    },
                    {path: PostEndPoint.LIST, title: "list"}
                ]
            },
            {
                path: ECommerceEndPoint.SETTINGS,
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
                path: UserEndPoint.ADD,
                title: "add",
                permission: UserEndPointPermission.ADD
            },
            {path: UserEndPoint.LIST, title: "list"}
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
                path: LanguageEndPoint.ADD,
                title: "add",
                permission: LanguageEndPointPermission.SIDEBAR_NAV
            },
            {
                path: LanguageEndPoint.LIST,
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
                path: SettingsEndPoint.GENERAL,
                title: "general",
                permission: SettingsEndPointPermission.UPDATE_GENERAL
            },
            {
                path: SettingsEndPoint.SEO,
                icon: `magnify`,
                title: "seo",
                permission: SettingsEndPointPermission.UPDATE_SEO
            },
            {
                path: SettingsEndPoint.CONTACT_FORMS,
                title: "contactForms",
                permission: SettingsEndPointPermission.UPDATE_CONTACT_FORM,
            },
            {
                path: SettingsEndPoint.STATIC_LANGUAGES,
                title: "staticLanguages",
                permission: SettingsEndPointPermission.UPDATE_STATIC_LANGUAGE
            },
            {
                path: SettingsEndPoint.SOCIAL_MEDIA,
                title: "socialMedia",
                permission: SettingsEndPointPermission.UPDATE_SOCIAL_MEDIA
            },
        ]
    },
];