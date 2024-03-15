import React, {Component} from 'react';
import {Collapse} from 'react-bootstrap';
import {IPagePropCommon} from "types/pageProps";
import {ISidebarPath} from "types/constants/sidebarNavs";
import clone from "clone";
import {sidebarNavs} from "constants/sidebarNavs";
import {PermissionUtil} from "utils/permission.util";
import {RouteUtil} from "utils/route.util";
import {EndPoints} from "constants/endPoints";

type IPageState = {
    isMenuOpen: { [key: string]: any }
};

type IPageProps = {} & IPagePropCommon;

class ComponentToolSidebar extends Component<IPageProps, IPageState> {
    constructor(props: IPageProps) {
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
            this.setIsMenuOpen(sidebarNavs);
        })
    }

    setIsMenuOpen(sidebarSubPaths: ISidebarPath[], stateKey?: string) {
        for(const sidebarNav of sidebarSubPaths) {
            if(this.props.router.asPath.startsWith(sidebarNav.path)) {
                this.toggleMenuState(sidebarNav.state);
            }

            if(sidebarNav.subPaths) this.setIsMenuOpen(sidebarNav.subPaths, sidebarNav.state);
        }
    }

    toggleMenuState(stateKey?: string) {
        if(stateKey){
            this.setState((state: IPageState) => {
                let _state = clone(state);
                _state.isMenuOpen[stateKey] = !_state.isMenuOpen[stateKey];
                return _state;
            })
        }
    }

    isPathActive(path: string) {
        return this.props.router.asPath.startsWith(path);
    }

    async navigatePage(path: string) {
        await RouteUtil.change({props: this.props, path: path || EndPoints.DASHBOARD});
        this.onRouteChanged();
    }

    Item = (props: ISidebarPath) => {
        let self = this;

        function HasChild(_props: ISidebarPath) {
            if (_props.permission && !PermissionUtil.check(self.props.getStateApp.sessionAuth!, _props.permission)) return null;
            return (
                <span className={`nav-link ${self.isPathActive(_props.path) ? 'active' : ''}`} onClick={() => self.navigatePage(_props.path)}>
                    <span className={`menu-title text-capitalize ${self.isPathActive(_props.path) ? 'active' : ''}`}>{self.props.t(_props.title)}</span>
                    <i className={`mdi mdi-${_props.icon} menu-icon`}></i>
                </span>
            );
        }

        function HasChildren(_props: ISidebarPath) {
            if (_props.permission && !PermissionUtil.check(self.props.getStateApp.sessionAuth!, _props.permission)) return null;
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
                        sidebarNavs.map((item, index) => {
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

export default ComponentToolSidebar;