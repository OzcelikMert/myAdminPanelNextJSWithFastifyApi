import React, {Component} from 'react';
import {IPagePropCommon} from "types/pageProps";
import PagePaths from "constants/pagePaths";
import permissionLib from "lib/permission.lib";
import ComponentToast from "components/elements/toast";

type IPageState = {
    permissionIsValid: boolean
    isLoading: boolean
};

type IPageProps = {
    children?: any
} & IPagePropCommon;

export default class ComponentProviderPermission extends Component<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
        this.state = {
            permissionIsValid: false,
            isLoading: true
        }
    }

    async componentDidMount() {
        await this.checkPermission()
        this.setState({
            isLoading: false
        })
    }

    async checkPermission() {
        let permissionIsValid = true;
        const ignoredPaths = [
            PagePaths.login(),
            PagePaths.lock()
        ];
        if (
            !ignoredPaths.includes(this.props.router.pathname) &&
            !permissionLib.checkPermissionPath(
                this.props.router.pathname,
                this.props.getStateApp.sessionData.roleId,
                this.props.getStateApp.sessionData.permissions
            )
        ) {
            permissionIsValid = false;
            new ComponentToast({
                type: "error",
                title: this.props.t("error"),
                content: this.props.t("noPerm"),
                position: "top-center"
            });
        }

        await new Promise(resolve => {
            this.setState({
                permissionIsValid: permissionIsValid,
            }, () => {
                resolve(1)
            });
        })
    }

    render() {
        if(this.state.isLoading){
            return null;
        }

        if (this.props.getStateApp.sessionData.id.length > 0 && !this.state.permissionIsValid) {
            this.props.router.push(PagePaths.dashboard());
            return null;
        }

        return this.props.children;
    }
}