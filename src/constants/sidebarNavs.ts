import {PermissionId} from "./permissions";
import {PostTypeId} from "./postTypes";
import {UserRoleId} from "./userRoles";
import PagePaths from "./pagePaths";
import {SideBarPath} from "types/constants/sidebarNavs";

const SidebarNav: SideBarPath[] = [
    {path: PagePaths.dashboard(), icon: `home`, title: "dashboard"},
    {
        path: PagePaths.gallery().self(),
        icon: `image-multiple`,
        title: "gallery",
        state: `gallery`,
        subPaths: [
            {
                path: PagePaths.gallery().upload(),
                icon: `upload`,
                title: "upload",
                permId: PermissionId.GalleryEdit,
            },
            {path: PagePaths.gallery().list(), title: "list"}
        ]
    },
    {
        path: PagePaths.navigation().self(),
        icon: `navigation-variant`,
        title: "navigations",
        state: `navigates`,
        permId: [PermissionId.NavigationAdd, PermissionId.NavigationEdit, PermissionId.NavigationDelete],
        subPaths: [
            {
                path: PagePaths.navigation().add(),
                title: "add",
                permId: PermissionId.NavigationAdd
            },
            {path: PagePaths.navigation().list(), title: "list"}
        ]
    },
    {
        path: PagePaths.post(PostTypeId.Page).self(),
        icon: `note-multiple`,
        title: "pages",
        state: `pages`,
        permId: [PermissionId.PageAdd, PermissionId.PageEdit, PermissionId.PageDelete],
        subPaths: [
            {
                path: PagePaths.post(PostTypeId.Page).add(),
                title: "add",
                permId: PermissionId.PageAdd
            },
            {path: PagePaths.post(PostTypeId.Page).list(), title: "list"}
        ]
    },
    {
        path: PagePaths.themeContent().self(),
        icon: `collage`,
        title: "themeContents",
        state: `themeContents`,
        subPaths: [
            {
                path: PagePaths.themeContent().post(PostTypeId.Blog).self(),
                title: "blogs",
                state: `blogs`,
                permId: [PermissionId.BlogAdd, PermissionId.BlogEdit, PermissionId.BlogDelete],
                subPaths: [
                    {
                        path: PagePaths.themeContent().post(PostTypeId.Blog).add(),
                        title: "add",
                        permId: PermissionId.BlogAdd
                    },
                    {path: PagePaths.themeContent().post(PostTypeId.Blog).list(), title: "list"}
                ]
            },
            {
                path: PagePaths.themeContent().post(PostTypeId.Portfolio).self(),
                title: "portfolios",
                state: `portfolios`,
                permId: [PermissionId.PortfolioAdd, PermissionId.PortfolioEdit, PermissionId.PortfolioDelete],
                subPaths: [
                    {
                        path: PagePaths.themeContent().post(PostTypeId.Portfolio).add(),
                        title: "add",
                        permId: PermissionId.PortfolioAdd
                    },
                    {path: PagePaths.themeContent().post(PostTypeId.Portfolio).list(), title: "list"}
                ]
            },
            {
                path: PagePaths.themeContent().post(PostTypeId.Slider).self(),
                title: "sliders",
                state: `sliders`,
                permId: [PermissionId.SliderAdd, PermissionId.SliderEdit, PermissionId.SliderDelete],
                subPaths: [
                    {
                        path: PagePaths.themeContent().post(PostTypeId.Slider).add(),
                        title: "add",
                        permId: PermissionId.SliderAdd
                    },
                    {path: PagePaths.themeContent().post(PostTypeId.Slider).list(), title: "list"}
                ]
            },
            {
                path: PagePaths.themeContent().post(PostTypeId.Reference).self(),
                title: "references",
                state: `references`,
                permId: [PermissionId.ReferenceAdd, PermissionId.ReferenceEdit, PermissionId.ReferenceDelete],
                subPaths: [
                    {
                        path: PagePaths.themeContent().post(PostTypeId.Reference).add(),
                        title: "add",
                        permId: PermissionId.ReferenceAdd
                    },
                    {path: PagePaths.themeContent().post(PostTypeId.Reference).list(), title: "list"}
                ]
            },
            {
                path: PagePaths.themeContent().post(PostTypeId.Service).self(),
                title: "services",
                state: `services`,
                permId: [PermissionId.ServiceAdd, PermissionId.ServiceEdit, PermissionId.ServiceDelete],
                subPaths: [
                    {
                        path: PagePaths.themeContent().post(PostTypeId.Service).add(),
                        title: "add",
                        permId: PermissionId.ServiceAdd
                    },
                    {path: PagePaths.themeContent().post(PostTypeId.Service).list(), title: "list"}
                ]
            },
            {
                path: PagePaths.themeContent().post(PostTypeId.Testimonial).self(),
                title: "testimonials",
                state: `testimonials`,
                permId: [PermissionId.TestimonialAdd, PermissionId.TestimonialEdit, PermissionId.TestimonialDelete],
                subPaths: [
                    {
                        path: PagePaths.themeContent().post(PostTypeId.Testimonial).add(),
                        title: "add",
                        permId: PermissionId.TestimonialAdd
                    },
                    {path: PagePaths.themeContent().post(PostTypeId.Testimonial).list(), title: "list"}
                ]
            },
            {
                path: PagePaths.themeContent().post(PostTypeId.BeforeAndAfter).self(),
                title: "beforeAndAfter",
                state: `beforeAndAfter`,
                permId: [PermissionId.BeforeAndAfterAdd, PermissionId.BeforeAndAfterEdit, PermissionId.BeforeAndAfterDelete],
                subPaths: [
                    {
                        path: PagePaths.themeContent().post(PostTypeId.BeforeAndAfter).add(),
                        title: "add",
                        permId: PermissionId.BeforeAndAfterAdd
                    },
                    {path: PagePaths.themeContent().post(PostTypeId.BeforeAndAfter).list(), title: "list"}
                ]
            },
        ]
    },
    {
        path: PagePaths.component().self(),
        icon: `shape`,
        title: "components",
        state: `components`,
        permId: [PermissionId.ComponentEdit],
        subPaths: [
            {
                path: PagePaths.component().add(),
                title: "add",
                roleId: UserRoleId.SuperAdmin,
            },
            {path: PagePaths.component().list(), title: "list"}
        ]
    },
    {
        path: PagePaths.eCommerce().self(),
        icon: `market`,
        title: "eCommerce",
        state: `eCommerce`,
        permId: [PermissionId.ECommerce],
        subPaths: [
            {
                path: PagePaths.eCommerce().product().self(),
                title: "product",
                state: `eCommerceProduct`,
                permId: [PermissionId.ProductAdd, PermissionId.ProductEdit, PermissionId.ProductDelete],
                subPaths: [
                    {
                        path: PagePaths.eCommerce().product().add(),
                        title: "add",
                        permId: PermissionId.ProductAdd,
                    },
                    {path: PagePaths.eCommerce().product().list(), title: "list"}
                ]
            },
            {
                path: PagePaths.eCommerce().settings(),
                title: "settings",
                roleId: UserRoleId.Admin
            },
        ]
    },
    {
        path: PagePaths.settings().self(),
        icon: `cog`,
        title: "settings",
        state: `settings`,
        subPaths: [
            {
                path: PagePaths.settings().user().self(),
                icon: `account-multiple`,
                title: "users",
                state: `users`,
                subPaths: [
                    {
                        path: PagePaths.settings().user().add(),
                        title: "add",
                        permId: PermissionId.UserAdd
                    },
                    {path: PagePaths.settings().user().list(), title: "list"}
                ]
            },
            {
                path: PagePaths.settings().seo(),
                icon: `magnify`,
                title: "seo",
                permId: PermissionId.SeoEdit
            },
            {
                path: PagePaths.settings().general(),
                title: "general",
                permId: PermissionId.SettingEdit
            },
            {
                path: PagePaths.settings().subscribers(),
                title: "subscribers",
                permId: PermissionId.SubscriberEdit
            },
            {
                path: PagePaths.settings().contactForms(),
                title: "contactForms",
                roleId: UserRoleId.Admin,
            },
            {
                path: PagePaths.settings().staticLanguages(),
                title: "staticLanguages",
                permId: PermissionId.StaticLanguage
            },
            {
                path: PagePaths.settings().socialMedia(),
                title: "socialMedia",
                permId: PermissionId.SettingEdit
            },
            {
                path: PagePaths.settings().language().self(),
                icon: `languages`,
                title: "languages",
                state: `languages`,
                roleId: UserRoleId.SuperAdmin,
                subPaths: [
                    {
                        path: PagePaths.settings().language().add(),
                        title: "add",
                        roleId: UserRoleId.SuperAdmin
                    },
                    {
                        path: PagePaths.settings().language().list(),
                        title: "list",
                        roleId: UserRoleId.SuperAdmin
                    }
                ]
            },
        ]
    },
];

export default SidebarNav;