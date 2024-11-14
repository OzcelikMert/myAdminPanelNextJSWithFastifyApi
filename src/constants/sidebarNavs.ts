import { PostTypeId } from './postTypes';
import { ISidebarPath } from 'types/constants/sidebarNavs';
import { EndPoints } from '@constants/endPoints';
import { NavigationEndPointPermission } from '@constants/endPointPermissions/navigation.endPoint.permission';
import { PostEndPointPermission } from '@constants/endPointPermissions/post.endPoint.permission';
import { ThemeContentEndPointPermission } from '@constants/endPointPermissions/themeContent.endPoint.permission';
import { ECommerceEndPointPermission } from '@constants/endPointPermissions/eCommerce.endPoint.permission';
import { UserEndPointPermission } from '@constants/endPointPermissions/user.endPoint.permission';
import { SubscriberEndPointPermission } from '@constants/endPointPermissions/subscriber.endPoint.permission';
import { LanguageEndPointPermission } from '@constants/endPointPermissions/language.endPoint.permission';
import { SettingsEndPointPermission } from '@constants/endPointPermissions/settings.endPoint.permission';
import { ComponentEndPointPermission } from '@constants/endPointPermissions/component.endPoint.permission';

export const sidebarNavs: ISidebarPath[] = [
  { path: EndPoints.DASHBOARD, icon: `home`, title: 'dashboard' },
  {
    path: EndPoints.GALLERY,
    icon: `image-multiple`,
    title: 'gallery',
    state: `gallery`,
    subPaths: [
      {
        path: EndPoints.GALLERY_WITH.UPLOAD,
        icon: `upload`,
        title: 'upload',
      },
      { path: EndPoints.GALLERY_WITH.LIST, title: 'list' },
    ],
  },
  {
    path: EndPoints.POST(PostTypeId.Page),
    icon: `note-multiple`,
    title: 'pages',
    state: `pages`,
    permission: PostEndPointPermission.GET_PAGE,
    subPaths: [
      {
        path: EndPoints.POST_WITH(PostTypeId.Page).ADD,
        title: 'add',
        permission: PostEndPointPermission.ADD_PAGE,
      },
      { path: EndPoints.POST_WITH(PostTypeId.Page).LIST, title: 'list' },
    ],
  },
  {
    path: EndPoints.NAVIGATION,
    icon: `navigation-variant`,
    title: 'navigations',
    state: `navigates`,
    permission: NavigationEndPointPermission.GET,
    subPaths: [
      {
        path: EndPoints.NAVIGATION_WITH.ADD,
        title: 'add',
        permission: NavigationEndPointPermission.ADD,
      },
      { path: EndPoints.NAVIGATION_WITH.LIST, title: 'list' },
    ],
  },
  {
    path: EndPoints.COMPONENT,
    icon: `shape`,
    title: 'components',
    state: `components`,
    permission: ComponentEndPointPermission.GET,
    subPaths: [
      {
        path: EndPoints.COMPONENT_WITH.ADD,
        title: 'add',
        permission: ComponentEndPointPermission.ADD,
      },
      { path: EndPoints.COMPONENT_WITH.LIST, title: 'list' },
    ],
  },
  {
    path: EndPoints.THEME_CONTENT,
    icon: `collage`,
    title: 'themeContents',
    state: `themeContents`,
    permission: ThemeContentEndPointPermission.GET,
    subPaths: [
      {
        path: EndPoints.THEME_CONTENT_WITH.BLOG,
        title: 'blogs',
        state: `blogs`,
        permission: PostEndPointPermission.GET_BLOG,
        subPaths: [
          {
            path: EndPoints.THEME_CONTENT_WITH.BLOG_WITH.ADD,
            title: 'add',
            permission: PostEndPointPermission.ADD_BLOG,
          },
          { path: EndPoints.THEME_CONTENT_WITH.BLOG_WITH.LIST, title: 'list' },
        ],
      },
      {
        path: EndPoints.THEME_CONTENT_WITH.PORTFOLIO,
        title: 'portfolios',
        state: `portfolios`,
        permission: PostEndPointPermission.GET_PORTFOLIO,
        subPaths: [
          {
            path: EndPoints.THEME_CONTENT_WITH.PORTFOLIO_WITH.ADD,
            title: 'add',
            permission: PostEndPointPermission.ADD_PORTFOLIO,
          },
          {
            path: EndPoints.THEME_CONTENT_WITH.PORTFOLIO_WITH.LIST,
            title: 'list',
          },
        ],
      },
      {
        path: EndPoints.THEME_CONTENT_WITH.SLIDER,
        title: 'sliders',
        state: `sliders`,
        permission: PostEndPointPermission.GET_SLIDER,
        subPaths: [
          {
            path: EndPoints.THEME_CONTENT_WITH.SLIDER_WITH.ADD,
            title: 'add',
            permission: PostEndPointPermission.ADD_SLIDER,
          },
          {
            path: EndPoints.THEME_CONTENT_WITH.SLIDER_WITH.LIST,
            title: 'list',
          },
        ],
      },
      {
        path: EndPoints.THEME_CONTENT_WITH.REFERENCE,
        title: 'references',
        state: `references`,
        permission: PostEndPointPermission.GET_REFERENCE,
        subPaths: [
          {
            path: EndPoints.THEME_CONTENT_WITH.REFERENCE_WITH.ADD,
            title: 'add',
            permission: PostEndPointPermission.ADD_REFERENCE,
          },
          {
            path: EndPoints.THEME_CONTENT_WITH.REFERENCE_WITH.LIST,
            title: 'list',
          },
        ],
      },
      {
        path: EndPoints.THEME_CONTENT_WITH.SERVICE,
        title: 'services',
        state: `services`,
        permission: PostEndPointPermission.GET_SERVICE,
        subPaths: [
          {
            path: EndPoints.THEME_CONTENT_WITH.SERVICE_WITH.ADD,
            title: 'add',
            permission: PostEndPointPermission.ADD_SERVICE,
          },
          {
            path: EndPoints.THEME_CONTENT_WITH.SERVICE_WITH.LIST,
            title: 'list',
          },
        ],
      },
      {
        path: EndPoints.THEME_CONTENT_WITH.TESTIMONIAL,
        title: 'testimonials',
        state: `testimonials`,
        permission: PostEndPointPermission.GET_TESTIMONIAL,
        subPaths: [
          {
            path: EndPoints.THEME_CONTENT_WITH.TESTIMONIAL_WITH.ADD,
            title: 'add',
            permission: PostEndPointPermission.ADD_TESTIMONIAL,
          },
          {
            path: EndPoints.THEME_CONTENT_WITH.TESTIMONIAL_WITH.LIST,
            title: 'list',
          },
        ],
      },
      {
        path: EndPoints.THEME_CONTENT_WITH.BEFORE_AND_AFTER,
        title: 'beforeAndAfter',
        state: `beforeAndAfter`,
        permission: PostEndPointPermission.GET_BEFORE_AND_AFTER,
        subPaths: [
          {
            path: EndPoints.THEME_CONTENT_WITH.BEFORE_AND_AFTER_WITH.ADD,
            title: 'add',
            permission: PostEndPointPermission.ADD_BEFORE_AND_AFTER,
          },
          {
            path: EndPoints.THEME_CONTENT_WITH.BEFORE_AND_AFTER_WITH.LIST,
            title: 'list',
          },
        ],
      },
    ],
  },
  {
    path: EndPoints.ECOMMERCE,
    icon: `shopping`,
    title: 'eCommerce',
    state: `eCommerce`,
    permission: ECommerceEndPointPermission.GET,
    subPaths: [
      {
        path: EndPoints.ECOMMERCE_WITH.PRODUCT,
        title: 'product',
        state: `eCommerceProduct`,
        permission: PostEndPointPermission.GET_PRODUCT,
        subPaths: [
          {
            path: EndPoints.ECOMMERCE_WITH.PRODUCT_WITH.ADD,
            title: 'add',
            permission: PostEndPointPermission.ADD_PRODUCT,
          },
          { path: EndPoints.ECOMMERCE_WITH.PRODUCT_WITH.LIST, title: 'list' },
        ],
      },
      {
        path: EndPoints.ECOMMERCE_WITH.SETTINGS,
        title: 'settings',
        permission: ECommerceEndPointPermission.SETTINGS,
      },
    ],
  },
  {
    path: EndPoints.USER,
    icon: `account-multiple`,
    title: 'users',
    state: `users`,
    permission: UserEndPointPermission.GET,
    subPaths: [
      {
        path: EndPoints.USER_WITH.ADD,
        title: 'add',
        permission: UserEndPointPermission.ADD,
      },
      { path: EndPoints.USER_WITH.LIST, title: 'list' },
    ],
  },
  {
    path: EndPoints.SUBSCRIBER,
    title: 'subscribers',
    icon: 'account-group',
    permission: SubscriberEndPointPermission.GET,
  },
  {
    path: EndPoints.LANGUAGE,
    icon: `translate`,
    title: 'languages',
    state: `languages`,
    permission: LanguageEndPointPermission.GET,
    subPaths: [
      {
        path: EndPoints.LANGUAGE_WITH.ADD,
        title: 'add',
        permission: LanguageEndPointPermission.GET,
      },
      {
        path: EndPoints.LANGUAGE_WITH.LIST,
        title: 'list',
        permission: LanguageEndPointPermission.GET,
      },
    ],
  },
  {
    path: EndPoints.SETTINGS,
    icon: `cog`,
    title: 'settings',
    state: `settings`,
    permission: SettingsEndPointPermission.GET,
    subPaths: [
      {
        path: EndPoints.SETTINGS_WITH.GENERAL,
        title: 'general',
        permission: SettingsEndPointPermission.UPDATE_GENERAL,
      },
      {
        path: EndPoints.SETTINGS_WITH.SEO,
        icon: `tag-search`,
        title: 'seo',
        permission: SettingsEndPointPermission.UPDATE_SEO,
      },
      {
        path: EndPoints.SETTINGS_WITH.PATHS,
        icon: `sign-direction`,
        title: 'paths',
        permission: SettingsEndPointPermission.UPDATE_PATH,
      },
      {
        path: EndPoints.SETTINGS_WITH.CONTACT_FORMS,
        title: 'contactForms',
        permission: SettingsEndPointPermission.UPDATE_CONTACT_FORM,
      },
      {
        path: EndPoints.SETTINGS_WITH.SOCIAL_MEDIA,
        title: 'socialMedia',
        permission: SettingsEndPointPermission.UPDATE_SOCIAL_MEDIA,
      },
    ],
  },
];
