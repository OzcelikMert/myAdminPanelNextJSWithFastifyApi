import { PostTypeId } from '@constants/postTypes';
import { GalleryEndPoint } from '@constants/endPoints/gallery.endPoint';
import { NavigationEndPoint } from '@constants/endPoints/navigation.endPoint';
import { PostEndPoint } from '@constants/endPoints/post.endPoint';
import { ThemeContentEndPoint } from '@constants/endPoints/themeContent.endPoint';
import { ECommerceEndPoint } from '@constants/endPoints/eCommerce.endPoint';
import { SettingsEndPoint } from '@constants/endPoints/settings.endPoint';
import { UserEndPoint } from '@constants/endPoints/user.endPoint';
import { LanguageEndPoint } from '@constants/endPoints/language.endPoint';
import { ComponentEndPoint } from '@constants/endPoints/component.endPoint';

export class EndPoints {
  static get LOGIN() {
    return '/login';
  }
  static get DASHBOARD() {
    return '/dashboard';
  }
  static get SUBSCRIBER() {
    return '/subscriber';
  }

  static get GALLERY() {
    return '/gallery';
  }
  static get GALLERY_WITH() {
    return new GalleryEndPoint();
  }

  static get NAVIGATION() {
    return '/navigation';
  }
  static get NAVIGATION_WITH() {
    return new NavigationEndPoint();
  }

  static POST(typeId?: PostTypeId) {
    return `/post/${typeId ?? ':postTypeId'}`;
  }
  static POST_WITH(typeId?: PostTypeId) {
    return new PostEndPoint(this.POST(typeId));
  }

  static get THEME_CONTENT() {
    return '/theme-content';
  }
  static get THEME_CONTENT_WITH() {
    return new ThemeContentEndPoint();
  }

  static get ECOMMERCE() {
    return '/e-commerce';
  }
  static get ECOMMERCE_WITH() {
    return new ECommerceEndPoint();
  }

  static get SETTINGS() {
    return '/settings';
  }
  static get SETTINGS_WITH() {
    return new SettingsEndPoint();
  }

  static get USER() {
    return '/user';
  }
  static get USER_WITH() {
    return new UserEndPoint();
  }

  static get LANGUAGE() {
    return '/language';
  }
  static get LANGUAGE_WITH() {
    return new LanguageEndPoint();
  }

  static get COMPONENT() {
    return '/component';
  }
  static get COMPONENT_WITH() {
    return new ComponentEndPoint();
  }
}
