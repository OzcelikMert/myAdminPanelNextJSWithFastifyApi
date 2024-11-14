import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import Link from 'next/link';
import { Trans } from 'react-i18next';
import { IPagePropCommon } from 'types/pageProps';
import { AuthService } from '@services/auth.service';
import { LocalStorageUtil } from '@utils/localStorage.util';
import DarkModeToggle from 'react-dark-mode-toggle';
import { ThemeUtil } from '@utils/theme.util';
import Image from 'next/image';
import { IThemeKeys } from 'types/constants/themeKeys';
import { EndPoints } from '@constants/endPoints';
import { ImageSourceUtil } from '@utils/imageSource.util';
import { RouteUtil } from '@utils/route.util';

type IPageState = {
  isDarkTheme: boolean;
};

type IPageProps = {
  isFullPageLayout: boolean;
} & IPagePropCommon;

export default class ComponentToolNavbar extends Component<
  IPageProps,
  IPageState
> {
  constructor(props: IPageProps) {
    super(props);
    this.state = {
      isDarkTheme: LocalStorageUtil.getTheme() == 'dark',
    };
  }

  toggleOffCanvas() {
    (
      document.querySelector('.sidebar-offcanvas') as HTMLCanvasElement
    ).classList.toggle('active');
  }

  onChangeTheme() {
    this.setState(
      {
        isDarkTheme: !this.state.isDarkTheme,
      },
      () => {
        const theme: IThemeKeys = this.state.isDarkTheme ? 'dark' : 'default';
        LocalStorageUtil.setTheme(theme);
        ThemeUtil.changeTheme(theme);
      }
    );
  }

  async profileEvents(
    event: 'profile' | 'lock' | 'signOut' | 'changePassword'
  ) {
    switch (event) {
      case 'profile':
        await RouteUtil.change({
          props: this.props,
          path: EndPoints.SETTINGS_WITH.PROFILE,
        });
        break;
      case 'changePassword':
        await RouteUtil.change({
          props: this.props,
          path: EndPoints.SETTINGS_WITH.CHANGE_PASSWORD,
        });
        break;
      case 'lock':
        const resultLock = await AuthService.logOut();
        if (resultLock.status) {
          this.props.setStateApp({
            isLock: true,
          });
        }
        break;
      case 'signOut':
        const resultSignOut = await AuthService.logOut();
        if (resultSignOut.status) {
          await RouteUtil.change({ props: this.props, path: EndPoints.LOGIN });
          this.props.setStateApp({
            sessionAuth: undefined,
          });
        }
        break;
    }
  }

  Notifications = () => (
    <Dropdown align={'end'}>
      <Dropdown.Toggle className="nav-link count-indicator">
        <i className="mdi mdi-bell-outline"></i>
        <span className="count-symbol bg-danger"></span>
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu navbar-dropdown preview-list">
        <h6 className="p-3 mb-0">
          <Trans>Notifications</Trans>
        </h6>
        <div className="dropdown-divider"></div>
        <Dropdown.Item
          className="dropdown-item preview-item"
          onClick={(evt) => evt.preventDefault()}
        >
          <div className="preview-thumbnail">
            <div className="preview-icon bg-success">
              <i className="mdi mdi-calendar"></i>
            </div>
          </div>
          <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
            <h6 className="preview-subject font-weight-normal mb-1">
              <Trans>Event today</Trans>
            </h6>
            <p className="text-gray ellipsis mb-0">
              <Trans>Just a reminder that you have an event today</Trans>
            </p>
          </div>
        </Dropdown.Item>
        <div className="dropdown-divider"></div>
        <Dropdown.Item
          className="dropdown-item preview-item"
          onClick={(evt) => evt.preventDefault()}
        >
          <div className="preview-thumbnail">
            <div className="preview-icon bg-warning">
              <i className="mdi mdi-settings"></i>
            </div>
          </div>
          <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
            <h6 className="preview-subject font-weight-normal mb-1">
              <Trans>Settings</Trans>
            </h6>
            <p className="text-gray ellipsis mb-0">
              <Trans>Update dashboard</Trans>
            </p>
          </div>
        </Dropdown.Item>
        <div className="dropdown-divider"></div>
        <Dropdown.Item
          className="dropdown-item preview-item"
          onClick={(evt) => evt.preventDefault()}
        >
          <div className="preview-thumbnail">
            <div className="preview-icon bg-info">
              <i className="mdi mdi-link-variant"></i>
            </div>
          </div>
          <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
            <h6 className="preview-subject font-weight-normal mb-1">
              <Trans>Launch Admin</Trans>
            </h6>
            <p className="text-gray ellipsis mb-0">
              <Trans>New admin wow</Trans>!
            </p>
          </div>
        </Dropdown.Item>
        <div className="dropdown-divider"></div>
        <h6 className="p-3 mb-0 text-center cursor-pointer">
          <Trans>See all notifications</Trans>
        </h6>
      </Dropdown.Menu>
    </Dropdown>
  );

  Messages = () => (
    <Dropdown align={'end'}>
      <Dropdown.Toggle className="nav-link count-indicator">
        <i className="mdi mdi-email-outline"></i>
        {
          //<span className="count-symbol bg-warning"></span>
        }
      </Dropdown.Toggle>

      <Dropdown.Menu className="preview-list navbar-dropdown">
        <h6 className="p-3 mb-0">{this.props.t('messages')}</h6>
        <div className="dropdown-divider"></div>
        {/* <Dropdown.Item className="dropdown-item preview-item"
                                   onClick={evt => evt.preventDefault()}>
                        <div className="preview-thumbnail">
                            <img src={require("../../../../assets/images/faces/face4.jpg")} alt="user"
                                 className="profile-pic"/>
                        </div>
                        <div
                            className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                            <h6 className="preview-subject ellipsis mb-1 font-weight-normal"><Trans>Mark
                                send you a message</Trans></h6>
                            <p className="text-gray mb-0">
                                1 <Trans>Minutes ago</Trans>
                            </p>
                        </div>
                    </Dropdown.Item>
                    <div className="dropdown-divider"></div> */}
      </Dropdown.Menu>
    </Dropdown>
  );

  Profile = () => (
    <Dropdown align={'end'}>
      <Dropdown.Toggle className="nav-link">
        <div className="nav-profile-img">
          <Image
            src={ImageSourceUtil.getUploadedImageSrc(
              this.props.getStateApp.sessionAuth?.user.image
            )}
            alt={this.props.getStateApp.sessionAuth?.user.name ?? ''}
            width={30}
            height={30}
            className="img-fluid"
          />
          <span className="availability-status online"></span>
        </div>
        <div className="nav-profile-text">
          <p className="mb-1">
            {this.props.getStateApp.sessionAuth?.user.name}
          </p>
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu className="navbar-dropdown">
        <Dropdown.Item onClick={(evt) => this.profileEvents('profile')}>
          <i className="mdi mdi-account-circle me-2 text-primary"></i>
          {this.props.t('profile')}
        </Dropdown.Item>
        <Dropdown.Item onClick={(evt) => this.profileEvents('changePassword')}>
          <i className="mdi mdi-key me-2 text-primary"></i>
          {this.props.t('changePassword').toCapitalizeCase()}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => this.profileEvents('lock')}>
          <i className="mdi mdi-lock me-2 text-primary"></i>
          {this.props.t('lock')}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => this.profileEvents('signOut')}>
          <i className="mdi mdi-logout me-2 text-primary"></i>
          {this.props.t('signOut')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  render() {
    return this.props.isFullPageLayout ? null : (
      <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <Link className="navbar-brand brand-logo" href={EndPoints.DASHBOARD}>
            <Image
              src="/images/ozcelikLogo.png"
              alt="logo"
              width={100}
              height={75}
              className="img-fluid"
            />
          </Link>
          <Link
            className="navbar-brand brand-logo-mini"
            href={EndPoints.DASHBOARD}
          >
            <Image
              src="/images/ozcelikLogoMini.png"
              alt="logo"
              width={50}
              height={50}
              className="img-fluid"
            />
          </Link>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-stretch">
          <ul className="navbar-nav navbar-nav-right">
            <DarkModeToggle
              onChange={() => this.onChangeTheme()}
              checked={this.state.isDarkTheme}
              size={55}
            />
            <li className="nav-item nav-profile">
              <this.Profile />
            </li>
          </ul>
          <button
            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            onClick={() => this.toggleOffCanvas()}
          >
            <span className="mdi mdi-menu"></span>
          </button>
        </div>
      </nav>
    );
  }
}
