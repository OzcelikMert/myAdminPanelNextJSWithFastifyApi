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
                minPermId: PermissionId.GalleryEdit,
            },
            {path: PagePaths.gallery().list(), title: "list"}
        ]
    },
    {
        path: PagePaths.navigation().self(),
        icon: `navigation-variant`,
        title: "navigations",
        state: `navigates`,
        minPermId: [PermissionId.NavigationAdd, PermissionId.NavigationEdit, PermissionId.NavigationDelete],
        subPaths: [
            {
                path: PagePaths.navigation().add(),
                title: "add",
                minPermId: PermissionId.NavigationAdd
            },
            {path: PagePaths.navigation().list(), title: "list"}
        ]
    },
    {
        path: PagePaths.post(PostTypeId.Page).self(),
        icon: `note-multiple`,
        title: "pages",
        state: `pages`,
        minPermId: [PermissionId.PageAdd, PermissionId.PageEdit, PermissionId.PageDelete],
        subPaths: [
            {
                path: PagePaths.post(PostTypeId.Page).add(),
                title: "add",
                minPermId: PermissionId.PageAdd
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
                minPermId: [PermissionId.BlogAdd, PermissionId.BlogEdit, PermissionId.BlogDelete],
                subPaths: [
                    {
                        path: PagePaths.themeContent().post(PostTypeId.Blog).add(),
                        title: "add",
                        minPermId: PermissionId.BlogAdd
                    },
                    {path: PagePaths.themeContent().post(PostTypeId.Blog).list(), title: "list"}
                ]
            },
            {
                path: PagePaths.themeContent().post(PostTypeId.Portfolio).self(),
                title: "portfolios",
                state: `portfolios`,
                minPermId: [PermissionId.PortfolioAdd, PermissionId.PortfolioEdit, PermissionId.PortfolioDelete],
                subPaths: [
                    {
                        path: PagePaths.themeContent().post(PostTypeId.Portfolio).add(),
                        title: "add",
                        minPermId: PermissionId.PortfolioAdd
                    },
                    {path: PagePaths.themeContent().post(PostTypeId.Portfolio).list(), title: "list"}
                ]
            },
            {
                path: PagePaths.themeContent().post(PostTypeId.Slider).self(),
                title: "sliders",
                state: `sliders`,
                minPermId: [PermissionId.SliderAdd, PermissionId.SliderEdit, PermissionId.SliderDelete],
                subPaths: [
                    {
                        path: PagePaths.themeContent().post(PostTypeId.Slider).add(),
                        title: "add",
                        minPermId: PermissionId.SliderAdd
                    },
                    {path: PagePaths.themeContent().post(PostTypeId.Slider).list(), title: "list"}
                ]
            },
            {
                path: PagePaths.themeContent().post(PostTypeId.Reference).self(),
                title: "references",
                state: `references`,
                minPermId: [PermissionId.ReferenceAdd, PermissionId.ReferenceEdit, PermissionId.ReferenceDelete],
                subPaths: [
                    {
                        path: PagePaths.themeContent().post(PostTypeId.Reference).add(),
                        title: "add",
                        minPermId: PermissionId.ReferenceAdd
                    },
                    {path: PagePaths.themeContent().post(PostTypeId.Reference).list(), title: "list"}
                ]
            },
            {
                path: PagePaths.themeContent().post(PostTypeId.Service).self(),
                title: "services",
                state: `services`,
                minPermId: [PermissionId.ServiceAdd, PermissionId.ServiceEdit, PermissionId.ServiceDelete],
                subPaths: [
                    {
                        path: PagePaths.themeContent().post(PostTypeId.Service).add(),
                        title: "add",
                        minPermId: PermissionId.ServiceAdd
                    },
                    {path: PagePaths.themeContent().post(PostTypeId.Service).list(), title: "list"}
                ]
            },
            {
                path: PagePaths.themeContent().post(PostTypeId.Testimonial).self(),
                title: "testimonials",
                state: `testimonials`,
                minPermId: [PermissionId.TestimonialAdd, PermissionId.TestimonialEdit, PermissionId.TestimonialDelete],
                subPaths: [
                    {
                        path: PagePaths.themeContent().post(PostTypeId.Testimonial).add(),
                        title: "add",
                        minPermId: PermissionId.TestimonialAdd
                    },
                    {path: PagePaths.themeContent().post(PostTypeId.Testimonial).list(), title: "list"}
                ]
            },
            {
                path: PagePaths.themeContent().post(PostTypeId.BeforeAndAfter).self(),
                title: "beforeAndAfter",
                state: `beforeAndAfter`,
                minPermId: [PermissionId.BeforeAndAfterAdd, PermissionId.BeforeAndAfterEdit, PermissionId.BeforeAndAfterDelete],
                subPaths: [
                    {
                        path: PagePaths.themeContent().post(PostTypeId.BeforeAndAfter).add(),
                        title: "add",
                        minPermId: PermissionId.BeforeAndAfterAdd
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
        minPermId: [PermissionId.ComponentEdit],
        subPaths: [
            {
                path: PagePaths.component().add(),
                title: "add",
                minRoleId: UserRoleId.SuperAdmin,
            },
            {path: PagePaths.component().list(), title: "list"}
        ]
    },
    {
        path: PagePaths.eCommerce().self(),
        icon: `market`,
        title: "eCommerce",
        state: `eCommerce`,
        minPermId: [PermissionId.ECommerce],
        subPaths: [
            {
                path: PagePaths.eCommerce().product().self(),
                title: "product",
                state: `eCommerceProduct`,
                minPermId: [PermissionId.ProductAdd, PermissionId.ProductEdit, PermissionId.ProductDelete],
                subPaths: [
                    {
                        path: PagePaths.eCommerce().product().add(),
                        title: "add",
                        minPermId: PermissionId.ProductAdd,
                    },
                    {path: PagePaths.eCommerce().product().list(), title: "list"}
                ]
            },
            {
                path: PagePaths.eCommerce().settings(),
                title: "settings",
                minRoleId: UserRoleId.Admin
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
                        minPermId: PermissionId.UserAdd
                    },
                    {path: PagePaths.settings().user().list(), title: "list"}
                ]
            },
            {
                path: PagePaths.settings().seo(),
                icon: `magnify`,
                title: "seo",
                minPermId: PermissionId.SeoEdit
            },
            {
                path: PagePaths.settings().general(),
                title: "general",
                minPermId: PermissionId.SettingEdit
            },
            {
                path: PagePaths.settings().subscribers(),
                title: "subscribers",
                minPermId: PermissionId.SubscriberEdit
            },
            {
                path: PagePaths.settings().contactForms(),
                title: "contactForms",
                minRoleId: UserRoleId.Admin,
            },
            {
                path: PagePaths.settings().staticLanguages(),
                title: "staticLanguages",
                minPermId: PermissionId.StaticLanguage
            },
            {
                path: PagePaths.settings().socialMedia(),
                title: "socialMedia",
                minPermId: PermissionId.SettingEdit
            },
            {
                path: PagePaths.settings().language().self(),
                icon: `languages`,
                title: "languages",
                state: `languages`,
                minRoleId: UserRoleId.SuperAdmin,
                subPaths: [
                    {
                        path: PagePaths.settings().language().add(),
                        title: "add",
                        minRoleId: UserRoleId.SuperAdmin
                    },
                    {
                        path: PagePaths.settings().language().list(),
                        title: "list",
                        minRoleId: UserRoleId.SuperAdmin
                    }
                ]
            },
        ]
    },
];

export default SidebarNav;