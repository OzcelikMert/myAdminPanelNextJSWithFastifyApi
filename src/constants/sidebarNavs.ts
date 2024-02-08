import {PermissionId} from "./permissions";
import {PostTypeId} from "./postTypes";
import {UserRoleId} from "./userRoles";
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

const SidebarNav: SideBarPath[] = [
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
                minPermId: PermissionId.GalleryEdit,
            },
            {path: GalleryEndPoint.LIST, title: "list"}
        ]
    },
    {
        path: EndPoints.NAVIGATION,
        icon: `navigation-variant`,
        title: "navigations",
        state: `navigates`,
        minPermId: [PermissionId.NavigationAdd, PermissionId.NavigationEdit, PermissionId.NavigationDelete],
        subPaths: [
            {
                path: NavigationEndPoint.ADD,
                title: "add",
                minPermId: PermissionId.NavigationAdd
            },
            {path: NavigationEndPoint.LIST, title: "list"}
        ]
    },
    {
        path: EndPoints.POST(PostTypeId.Page),
        icon: `note-multiple`,
        title: "pages",
        state: `pages`,
        minPermId: [PermissionId.PageAdd, PermissionId.PageEdit, PermissionId.PageDelete],
        subPaths: [
            {
                path: PostEndPoint.ADD,
                title: "add",
                minPermId: PermissionId.PageAdd
            },
            {path: PostEndPoint.LIST, title: "list"}
        ]
    },
    {
        path: EndPoints.THEME_CONTENT,
        icon: `collage`,
        title: "themeContents",
        state: `themeContents`,
        subPaths: [
            {
                path: EndPoints.POST(PostTypeId.Blog),
                title: "blogs",
                state: `blogs`,
                minPermId: [PermissionId.BlogAdd, PermissionId.BlogEdit, PermissionId.BlogDelete],
                subPaths: [
                    {
                        path: PostEndPoint.ADD,
                        title: "add",
                        minPermId: PermissionId.BlogAdd
                    },
                    {path: PostEndPoint.LIST, title: "list"}
                ]
            },
            {
                path: EndPoints.POST(PostTypeId.Portfolio),
                title: "portfolios",
                state: `portfolios`,
                minPermId: [PermissionId.PortfolioAdd, PermissionId.PortfolioEdit, PermissionId.PortfolioDelete],
                subPaths: [
                    {
                        path: PostEndPoint.ADD,
                        title: "add",
                        minPermId: PermissionId.PortfolioAdd
                    },
                    {path: PostEndPoint.LIST, title: "list"}
                ]
            },
            {
                path: EndPoints.POST(PostTypeId.Slider),
                title: "sliders",
                state: `sliders`,
                minPermId: [PermissionId.SliderAdd, PermissionId.SliderEdit, PermissionId.SliderDelete],
                subPaths: [
                    {
                        path: PostEndPoint.ADD,
                        title: "add",
                        minPermId: PermissionId.SliderAdd
                    },
                    {path: PostEndPoint.LIST, title: "list"}
                ]
            },
            {
                path: EndPoints.POST(PostTypeId.Reference),
                title: "references",
                state: `references`,
                minPermId: [PermissionId.ReferenceAdd, PermissionId.ReferenceEdit, PermissionId.ReferenceDelete],
                subPaths: [
                    {
                        path: PostEndPoint.ADD,
                        title: "add",
                        minPermId: PermissionId.ReferenceAdd
                    },
                    {path: PostEndPoint.LIST, title: "list"}
                ]
            },
            {
                path: EndPoints.POST(PostTypeId.Service),
                title: "services",
                state: `services`,
                minPermId: [PermissionId.ServiceAdd, PermissionId.ServiceEdit, PermissionId.ServiceDelete],
                subPaths: [
                    {
                        path: PostEndPoint.ADD,
                        title: "add",
                        minPermId: PermissionId.ServiceAdd
                    },
                    {path: PostEndPoint.LIST, title: "list"}
                ]
            },
            {
                path: EndPoints.POST(PostTypeId.Testimonial),
                title: "testimonials",
                state: `testimonials`,
                minPermId: [PermissionId.TestimonialAdd, PermissionId.TestimonialEdit, PermissionId.TestimonialDelete],
                subPaths: [
                    {
                        path: PostEndPoint.ADD,
                        title: "add",
                        minPermId: PermissionId.TestimonialAdd
                    },
                    {path: PostEndPoint.LIST, title: "list"}
                ]
            },
            {
                path: EndPoints.POST(PostTypeId.BeforeAndAfter),
                title: "beforeAndAfter",
                state: `beforeAndAfter`,
                minPermId: [PermissionId.BeforeAndAfterAdd, PermissionId.BeforeAndAfterEdit, PermissionId.BeforeAndAfterDelete],
                subPaths: [
                    {
                        path: PostEndPoint.ADD,
                        title: "add",
                        minPermId: PermissionId.BeforeAndAfterAdd
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
        minPermId: [PermissionId.ComponentEdit],
        subPaths: [
            {
                path: ComponentEndPoint.ADD,
                title: "add",
                minRoleId: UserRoleId.SuperAdmin,
            },
            {path: ComponentEndPoint.LIST, title: "list"}
        ]
    },
    {
        path: EndPoints.ECOMMERCE,
        icon: `market`,
        title: "eCommerce",
        state: `eCommerce`,
        minPermId: [PermissionId.ECommerce],
        subPaths: [
            {
                path: EndPoints.POST(PostTypeId.Product),
                title: "product",
                state: `eCommerceProduct`,
                minPermId: [PermissionId.ProductAdd, PermissionId.ProductEdit, PermissionId.ProductDelete],
                subPaths: [
                    {
                        path: PostEndPoint.ADD,
                        title: "add",
                        minPermId: PermissionId.ProductAdd,
                    },
                    {path: PostEndPoint.LIST, title: "list"}
                ]
            },
            {
                path: ECommerceEndPoint.SETTINGS,
                title: "settings",
                minRoleId: UserRoleId.Admin
            },
        ]
    },
    {
        path: EndPoints.USER,
        icon: `account-multiple`,
        title: "users",
        state: `users`,
        subPaths: [
            {
                path: UserEndPoint.ADD,
                title: "add",
                minPermId: PermissionId.UserAdd
            },
            {path: UserEndPoint.LIST, title: "list"}
        ]
    },
    {
        path: EndPoints.SUBSCRIBER,
        title: "subscribers",
        minPermId: PermissionId.SubscriberEdit
    },
    {
        path: EndPoints.LANGUAGE,
        icon: `languages`,
        title: "languages",
        state: `languages`,
        minRoleId: UserRoleId.SuperAdmin,
        subPaths: [
            {
                path: LanguageEndPoint.ADD,
                title: "add",
                minRoleId: UserRoleId.SuperAdmin
            },
            {
                path: LanguageEndPoint.LIST,
                title: "list",
                minRoleId: UserRoleId.SuperAdmin
            }
        ]
    },
    {
        path: EndPoints.SETTINGS,
        icon: `cog`,
        title: "settings",
        state: `settings`,
        subPaths: [
            {
                path: SettingsEndPoint.SEO,
                icon: `magnify`,
                title: "seo",
                minPermId: PermissionId.SeoEdit
            },
            {
                path: SettingsEndPoint.GENERAL,
                title: "general",
                minPermId: PermissionId.SettingEdit
            },
            {
                path: SettingsEndPoint.CONTACT_FORMS,
                title: "contactForms",
                minRoleId: UserRoleId.Admin,
            },
            {
                path: SettingsEndPoint.STATIC_LANGUAGES,
                title: "staticLanguages",
                minPermId: PermissionId.StaticLanguage
            },
            {
                path: SettingsEndPoint.SOCIAL_MEDIA,
                title: "socialMedia",
                minPermId: PermissionId.SettingEdit
            },
        ]
    },
];

export default SidebarNav;