import React, {Component} from 'react';
import {IPagePropCommon} from "types/pageProps";
import {AuthService} from "services/auth.service";
import {ApiErrorCodes} from "library/api/errorCodes";
import {EndPoints} from "constants/endPoints";

type IPageState = {
    isAuth: boolean
    isLoading: boolean
};

type IPageProps = {
    children?: JSX.Element
} & IPagePropCommon;

export default class ComponentProviderAuth extends Component<IPageProps, IPageState> {
    constructor(props: IPageProps) {
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
        let resData = await AuthService.getSession();
        if (resData.status && resData.errorCode == ApiErrorCodes.success) {
            if (resData.data) {
                isAuth = true;
                this.props.setStateApp({
                    sessionAuth: resData.data
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
            ![EndPoints.LOGIN, EndPoints.LOCK].includes(this.props.router.pathname)
        ) {
            this.props.router.push(EndPoints.LOGIN)
            return null;
        }

        if (
            this.state.isAuth &&
            [EndPoints.LOGIN, EndPoints.LOCK].includes(this.props.router.pathname)
        ) {
            this.props.router.push(EndPoints.DASHBOARD)
            return null;
        }

        return this.props.children;
    }
}