import React, { Component } from 'react';
import { Collapse } from 'react-bootstrap';
import { IPagePropCommon } from 'types/pageProps';
import { ISidebarPath } from 'types/constants/sidebarNavs';
import clone from 'clone';
import { sidebarNavs } from '@constants/sidebarNavs';
import { PermissionUtil } from '@utils/permission.util';
import { RouteUtil } from '@utils/route.util';
import { EndPoints } from '@constants/endPoints';

type IPageState = {
  isMenuOpen: { [key: string]: any };
};

type IPageProps = {} & IPagePropCommon;

class ComponentToolSidebar extends Component<IPageProps, IPageState> {
  constructor(props: IPageProps) {
    super(props);
    this.state = {
      isMenuOpen: {},
    };
  }

  componentDidMount() {
    this.onRouteChanged();
  }

  onRouteChanged() {
    this.setState(
      {
        isMenuOpen: {},
      },
      () => {
        this.setIsMenuOpen(sidebarNavs);
      }
    );
  }

  setIsMenuOpen(sidebarSubPaths: ISidebarPath[], stateKey?: string) {
    for (const sidebarNav of sidebarSubPaths) {
      if (this.props.router.asPath.startsWith(sidebarNav.path)) {
        this.toggleMenuState(sidebarNav.state);
      }

      if (sidebarNav.subPaths)
        this.setIsMenuOpen(sidebarNav.subPaths, sidebarNav.state);
    }
  }

  toggleMenuState(stateKey?: string) {
    if (stateKey) {
      this.setState((state: IPageState) => {
        const _state = clone(state);
        _state.isMenuOpen[stateKey] = !_state.isMenuOpen[stateKey];
        return _state;
      });
    }
  }

  isPathActive(path: string) {
    return this.props.router.asPath.startsWith(path);
  }

  async navigatePage(path: string) {
    await RouteUtil.change({
      props: this.props,
      path: path || EndPoints.DASHBOARD,
    });
    this.onRouteChanged();
  }

  HasChild = (props: ISidebarPath) => {
    if (
      props.permission &&
      !PermissionUtil.check(
        this.props.getStateApp.sessionAuth!,
        props.permission
      )
    )
      return null;
    return (
      <span
        className={`nav-link ${this.isPathActive(props.path) ? 'active' : ''}`}
        onClick={() =>
          this.isPathActive(props.path) ? null : this.navigatePage(props.path)
        }
      >
        <span
          className={`menu-title text-capitalize ${this.isPathActive(props.path) ? 'active' : ''}`}
        >
          {this.props.t(props.title)}
        </span>
        <i className={`mdi mdi-${props.icon} menu-icon`}></i>
      </span>
    );
  };

  HasChildren = (props: ISidebarPath) => {
    if (
      props.permission &&
      !PermissionUtil.check(
        this.props.getStateApp.sessionAuth!,
        props.permission
      )
    )
      return null;
    const state = props.state ? this.state.isMenuOpen[props.state] : false;
    return (
      <span>
        <div
          className={`nav-link ${state ? 'menu-expanded' : ''} ${this.isPathActive(props.path) ? 'active' : ''}`}
          onClick={() => this.toggleMenuState(props.state)}
          data-toggle="collapse"
        >
          <span
            className={`menu-title text-capitalize ${this.isPathActive(props.path) ? 'active' : ''}`}
          >
            {this.props.t(props.title)}
          </span>
          <i className="menu-arrow"></i>
          <i className={`mdi mdi-${props.icon} menu-icon`}></i>
        </div>
        <Collapse in={state}>
          <ul className="nav flex-column sub-menu">
            {props.subPaths?.map((item, index) => {
              return (
                <li className="nav-item" key={index}>
                  {item.subPaths ? (
                    <this.HasChildren key={index} {...item} />
                  ) : (
                    <this.HasChild key={index} {...item} />
                  )}
                </li>
              );
            })}
          </ul>
        </Collapse>
      </span>
    );
  };

  Item = (props: ISidebarPath) => {
    return (
      <li
        className={`nav-item ${this.isPathActive(props.path) ? 'active' : ''}`}
      >
        {props.subPaths ? (
          <this.HasChildren {...props} />
        ) : (
          <this.HasChild {...props} />
        )}
      </li>
    );
  };

  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav pt-5">
          {sidebarNavs.map((item, index) => {
            return <this.Item key={index} {...item} />;
          })}
        </ul>
      </nav>
    );
  }
}

export default ComponentToolSidebar;
