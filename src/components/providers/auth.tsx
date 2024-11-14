import React, { Component } from 'react';
import { IPagePropCommon } from 'types/pageProps';
import { AuthService } from '@services/auth.service';
import { ApiErrorCodes } from '@library/api/errorCodes';
import { EndPoints } from '@constants/endPoints';
import { RouteUtil } from '@utils/route.util';

type IPageState = {
  isAuth: boolean;
  isLoading: boolean;
};

type IPageProps = {
  children?: JSX.Element;
} & IPagePropCommon;

export default class ComponentProviderAuth extends Component<
  IPageProps,
  IPageState
> {
  abortController = new AbortController();

  constructor(props: IPageProps) {
    super(props);
    this.state = {
      isAuth: false,
      isLoading: true,
    };
  }

  async componentDidMount() {
    await this.checkSession();
    this.setState({
      isLoading: false,
    });
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  async checkSession() {
    let isAuth = false;

    const serviceResult = await AuthService.getSession(
      this.abortController.signal
    );
    if (
      serviceResult.status &&
      serviceResult.errorCode == ApiErrorCodes.success
    ) {
      if (serviceResult.data) {
        isAuth = true;
        if (
          JSON.stringify(serviceResult.data) !=
          JSON.stringify(this.props.getStateApp.sessionAuth)
        ) {
          await new Promise((resolve) => {
            this.props.setStateApp(
              {
                sessionAuth: serviceResult.data!,
              },
              () => resolve(1)
            );
          });
        }
      }
    }

    await new Promise((resolve) => {
      this.setState(
        {
          isAuth: isAuth,
        },
        () => {
          resolve(1);
        }
      );
    });
  }

  render() {
    if (this.state.isLoading || this.abortController.signal.aborted) {
      return null;
    }

    if (
      !this.state.isAuth &&
      ![EndPoints.LOGIN].includes(this.props.router.pathname)
    ) {
      RouteUtil.change({ props: this.props, path: EndPoints.LOGIN });
      return null;
    }

    if (
      this.state.isAuth &&
      [EndPoints.LOGIN].includes(this.props.router.pathname)
    ) {
      RouteUtil.change({ props: this.props, path: EndPoints.DASHBOARD });
      return null;
    }

    return this.props.children;
  }
}
