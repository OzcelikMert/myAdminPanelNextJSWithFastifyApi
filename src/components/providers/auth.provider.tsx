import React, {Component} from 'react';
import {PagePropCommonDocument} from "types/pageProps";
import {LanguageId} from "constants/index";
import authService from "services/auth.service";
import PagePaths from "constants/pagePaths";
import {ErrorCodes} from "library/api";

type PageState = {
    isAuth: boolean
    isLoading: boolean
};

type PageProps = {
    children?: JSX.Element
} & PagePropCommonDocument;

export default class ProviderAuth extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            isAuth: false,
            isLoading: true
        }
    }

    async componentDidMount() {
        await this.checkSession()
        this.setState({
            isLoading: false
        })
    }

    async checkSession() {
        let isAuth = false;
        let resData = await authService.getSession({});
        if (resData.status && resData.errorCode == ErrorCodes.success) {
            if (resData.data) {
                isAuth = true;
                let user = resData.data;
                this.props.setStateApp({
                    sessionData: {
                        id: user._id,
                        langId: LanguageId.English,
                        roleId: user.roleId,
                        email: user.email,
                        image: user.image,
                        name: user.name,
                        permissions: user.permissions
                    }
                });
            }
        }

        await new Promise(resolve => {
            this.setState({
                isAuth: isAuth
            }, () => {
                resolve(1);
            });
        })
    }

    render() {
        if(this.state.isLoading){
            return null;
        }

        if (
            !this.state.isAuth &&
            this.props.router.pathname !== PagePaths.login() &&
            this.props.router.pathname !== PagePaths.lock()
        ) {
            this.props.router.push(PagePaths.login())
            return null;
        }

        if (
            this.state.isAuth &&
            this.props.router.pathname === PagePaths.login() &&
            this.props.router.pathname === PagePaths.lock()
        ) {
            this.props.router.push(PagePaths.dashboard())
            return null;
        }

        return this.props.children;
    }
}