import React, {Component} from 'react';
import {Collapse} from 'react-bootstrap';
import {PagePropCommonDocument} from "types/pageProps";
import SidebarNavs from "constants/sidebarNavs";
import {SideBarPath} from "types/constants/sidebarNavs";
import PagePaths from "constants/pagePaths";
import clone from "clone";
import routeLib from "lib/route.lib";
import {UserRoleId, UserRoles} from "constants/userRoles";
import {PermissionId} from "constants/permissions";

type PageState = {
    isMenuOpen: { [key: string]: any }
};

type PageProps = {} & PagePropCommonDocument;

class Sidebar extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            isMenuOpen: {}
        };
    }

    componentDidMount() {
        this.onRouteChanged();
    }

    onRouteChanged() {
        this.setState({
            isMenuOpen: {}
        }, () => {
            this.setIsMenuOpen(SidebarNavs);
        })
    }

    setIsMenuOpen(sidebarSubPaths: SideBarPath[], stateKey?: string) {
        for(const sidebarNav of sidebarSubPaths) {
            if(this.props.router.asPath.startsWith(sidebarNav.path)) {
                this.toggleMenuState(sidebarNav.state);
            }

            if(sidebarNav.subPaths) this.setIsMenuOpen(sidebarNav.subPaths, sidebarNav.state);
        }
    }

    toggleMenuState(stateKey?: string) {
        if(stateKey){
            this.setState((state: PageState) => {
                let _state = clone(state);
                _state.isMenuOpen[stateKey] = !_state.isMenuOpen[stateKey];
                return _state;
            })
        }
    }

    isPathActive(path: string) {
        return this.props.router.asPath.startsWith(path);
    }

    checkPermission(roleId?: UserRoleId, permissionId?: PermissionId | PermissionId[]) {
        let status = true;

        if(status && roleId){
            let sessionUserRole = UserRoles.findSingle("id", this.props.getStateApp.sessionData.roleId);
            let role = UserRoles.findSingle("id", roleId);

            status = (sessionUserRole?.rank ?? 0) >= (role?.rank?? 0);
        }

        if(status && permissionId){
            status = false;

            if(Array.isArray(permissionId)){
                for(const permId of permissionId) {
                    if(!status){
                        status = this.props.getStateApp.sessionData.permissions.includes(permId);
                    }
                }
            }else {
                status = this.props.getStateApp.sessionData.permissions.includes(permissionId);
            }
        }

        return status || this.props.getStateApp.sessionData.roleId == UserRoleId.SuperAdmin;
    }

    Item = (props: SideBarPath) => {
        let self = this;

        function HasChild(_props: SideBarPath) {
            if (!self.checkPermission(_props.roleId, _props.permId)) return null;
            return (
                <span className={`nav-link ${self.isPathActive(_props.path) ? 'active' : ''}`} onClick={() => routeLib.change(self.props.router, _props.path ?? PagePaths.dashboard())}>
                    <span className={`menu-title text-capitalize ${self.isPathActive(_props.path) ? 'active' : ''}`}>{self.props.t(_props.title)}</span>
                    <i className={`mdi mdi-${_props.icon} menu-icon`}></i>
                </span>
            );
        }

        function HasChildren(_props: SideBarPath) {
            if (!self.checkPermission(_props.roleId, _props.permId)) return null;
            let state = (_props.state) ? self.state.isMenuOpen[_props.state] : false;
            return (
                <span>
                    <div className={`nav-link ${state ? 'menu-expanded' : ''} ${self.isPathActive(_props.path) ? 'active' : ''}`} onClick={() => self.toggleMenuState(_props.state)} data-toggle="collapse">
                        <span className={`menu-title text-capitalize ${self.isPathActive(_props.path) ? 'active' : ''}`}>{self.props.t(_props.title)}</span>
                        <i className="menu-arrow"></i>
                        <i className={`mdi mdi-${_props.icon} menu-icon`}></i>
                    </div>
                    <Collapse in={state}>
                      <ul className="nav flex-column sub-menu">
                        {
                            _props.subPaths?.map((item, index) => {
                                return (
                                    <li className="nav-item" key={index}>
                                        {
                                            item.subPaths ? <HasChildren key={index} {...item} /> : <HasChild key={index} {...item}/>
                                        }
                                    </li>
                                );
                            })
                        }
                      </ul>
                    </Collapse>
                </span>
            );
        }

        return (
            <li className={`nav-item ${self.isPathActive(props.path) ? 'active' : ''}`}>
                {
                    (props.subPaths) ? <HasChildren {...props} /> : <HasChild {...props}/>
                }
            </li>
        )
    }

    render() {
        return (
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <ul className="nav pt-5">
                    {
                        SidebarNavs.map((item, index) => {
                            return <this.Item
                                key={index}
                                {...item}
                            />
                        })
                    }
                </ul>
            </nav>
        );
    }
}

export default Sidebar;