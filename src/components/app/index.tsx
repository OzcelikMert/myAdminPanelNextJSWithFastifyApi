import React, { Component } from 'react';
import { IPagePropCommon } from 'types/pageProps';
import ComponentToolNavbar from '@components/tools/navbar';
import ComponentToolSidebar from '@components/tools/sidebar';
import ComponentToolFooter from '@components/tools/footer';
import { IGetStateApp, ISetStateApp } from 'types/pages/_app';
import ComponentThemeBreadCrumb from '@components/theme/breadCrumb';
import ComponentThemeContentLanguage from '@components/theme/contentLanguage';
import { AppProps } from 'next/app';
import ComponentHead from '@components/head';
import { useTranslation } from 'react-i18next';
import ComponentProviderAuth from '@components/providers/auth';
import ComponentProviderAppInit from '@components/providers/appInit';
import { VariableLibrary } from '@library/variable';
import { ToastContainer } from 'react-toastify';
import { CurrencyId } from '@constants/currencyTypes';
import { multiLanguagePaths } from '@constants/multiLanguagePaths';
import { EndPoints } from '@constants/endPoints';
import ComponentSpinnerDonut from '@components/elements/spinners/donut';
import ComponentToolLock from '@components/tools/lock';
import { cloneDeepWith } from 'lodash';

type IPageState = {
  breadCrumbTitle: string;
} & IGetStateApp;

type IPageProps = {
  t: IPagePropCommon['t'];
} & AppProps;

class ComponentApp extends Component<IPageProps, IPageState> {
  pathname: string = '';

  constructor(props: IPageProps) {
    super(props);
    this.pathname = this.props.router.asPath;
    this.state = {
      breadCrumbTitle: '',
      isAppLoading: true,
      isPageLoading: true,
      isRouteChanged: true,
      isLock: false,
      appData: {
        mainLangId: '',
        currentLangId: '',
        contentLanguages: [],
        currencyId: CurrencyId.TurkishLira,
      }
    };
  }

  async componentDidUpdate(
    prevProps: Readonly<IPageProps>,
    prevState: Readonly<IPageState>
  ) {
    if (this.pathname !== this.props.router.asPath) {
      this.pathname = this.props.router.asPath;
      await this.onRouteChanged();
    }
    if (prevState.isPageLoading && !this.state.isPageLoading) {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
    }
  }

  async onRouteChanged() {
    await new Promise((resolve) => {
      this.setState(
        (state: IPageState) => {
          if (!this.state.isPageLoading) {
            state.isPageLoading = true;
          }

          if (
            this.state.appData.currentLangId != this.state.appData.mainLangId
          ) {
            state.appData = {
              ...state.appData,
              currentLangId: state.appData.mainLangId,
            };
          }

          state.isRouteChanged = true;
          return state;
        },
        () => resolve(1)
      );
    });
  }

  setBreadCrumb(titles: string[]) {
    this.setState((state: IPageState) => {
      state.breadCrumbTitle = '';
      titles.forEach((title) => {
        state.breadCrumbTitle += `${title} - `;
      });
      state.breadCrumbTitle = state.breadCrumbTitle.removeLastChar(2);
      return state;
    });
  }

  setStateApp(data: ISetStateApp, callBack?: () => void) {
    this.setState(
      (state: IPageState) => {
        state = VariableLibrary.nestedObjectAssign(cloneDeepWith(state), data);
        return state;
      },
      () => {
        if (callBack) {
          callBack();
        }
      }
    );
  }

  onLanguageChange(langId: string) {
    this.setState((state: IPageState) => {
      return {
        ...state,
        appData: {
          ...state.appData,
          currentLangId: langId,
        },
      };
    });
  }

  PageHeader = (props: IPagePropCommon) => {
    const path = props.router.pathname.replaceAll('[', ':').replaceAll(']', '');

    return (
      <div className="page-header">
        <div className="row w-100 m-0">
          <div className="col-md-8 p-0">
            <ComponentThemeBreadCrumb
              breadCrumbs={this.state.breadCrumbTitle.split(' - ')}
            />
          </div>
          {multiLanguagePaths.includes(path) ? (
            <div className="col-md-4 p-0 content-language">
              <ComponentThemeContentLanguage
                t={props.t}
                languages={this.state.appData.contentLanguages}
                selectedLanguage={this.state.appData.contentLanguages.findSingle(
                  '_id',
                  this.state.appData.currentLangId
                )}
                onChange={(item, e) => this.onLanguageChange(item.value)}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  render() {
    if (
      this.props.router.asPath === '/' ||
      typeof this.props.pageProps.statusCode !== 'undefined'
    ) {
      this.props.router.replace(EndPoints.LOGIN);
      return null;
    }

    const fullPageLayoutRoutes = [EndPoints.LOGIN];

    const isFullPageLayout =
      fullPageLayoutRoutes.includes(this.props.router.pathname) ||
      this.state.isLock ||
      this.state.isAppLoading;

    const commonProps: IPagePropCommon = {
      router: this.props.router,
      t: this.props.t,
      setBreadCrumb: (titles) => this.setBreadCrumb(titles),
      setStateApp: (data, callBack) => this.setStateApp(data, callBack),
      getStateApp: this.state,
    };

    return (
      <div>
        <ComponentHead title={this.state.breadCrumbTitle} />
        {this.state.isAppLoading ? (
          <ComponentSpinnerDonut customClass="app-spinner" />
        ) : null}
        <ComponentProviderAppInit {...commonProps}>
          <div className="container-scroller">
            {![EndPoints.LOGIN].includes(this.props.router.pathname) &&
            this.state.isLock ? (
              <ComponentToolLock {...commonProps} />
            ) : null}
            <ToastContainer />
            <ComponentToolNavbar
              {...commonProps}
              isFullPageLayout={isFullPageLayout}
            />
            <div
              className={`container-fluid page-body-wrapper ${isFullPageLayout ? 'full-page-wrapper' : ''}`}
            >
              {!isFullPageLayout ? (
                <ComponentToolSidebar {...commonProps} />
              ) : null}
              <div className="main-panel">
                <div className="content-wrapper">
                  {this.state.isPageLoading ? (
                    <ComponentSpinnerDonut customClass="page-spinner" />
                  ) : null}
                  {!isFullPageLayout ? (
                    <this.PageHeader {...commonProps} />
                  ) : null}

                  {this.state.isRouteChanged ? (
                    <ComponentProviderAuth {...commonProps}>
                      <this.props.Component {...commonProps} />
                    </ComponentProviderAuth>
                  ) : null}
                </div>
                {!isFullPageLayout ? <ComponentToolFooter /> : ''}
              </div>
            </div>
          </div>
        </ComponentProviderAppInit>
      </div>
    );
  }
}

export function withCustomProps(Component: any) {
  function ComponentWithCustomProps(props: any) {
    const { t } = useTranslation();
    return <Component {...props} t={t} />;
  }

  return ComponentWithCustomProps;
}

export default withCustomProps(ComponentApp);
