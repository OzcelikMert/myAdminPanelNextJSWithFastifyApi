import React, {Component} from 'react';
import {IPagePropCommon} from "types/pageProps";
import ComponentToolNavbar from "components/tools/navbar";
import ComponentToolSidebar from "components/tools/sidebar";
import ComponentToolFooter from "components/tools/footer";
import {IGetStateApp, ISetStateApp} from "types/pages/_app";
import ComponentThemeBreadCrumb from "components/theme/breadCrumb";
import ComponentThemeContentLanguage from "components/theme/contentLanguage";
import ComponentToolSpinner from "components/tools/spinner";
import {AppProps} from "next/app";
import ComponentHead from "components/head";
import {useTranslation} from "react-i18next";
import ComponentProviderAuth from "components/providers/auth";
import ComponentProviderPermission from "components/providers/permission";
import ComponentProviderAppInit from "components/providers/appInit";
import Variable from "library/variable";
import {ToastContainer} from "react-toastify";
import {CurrencyId} from "constants/currencyTypes";
import {LanguageId} from "constants/languages";
import {multiLanguagePaths} from "constants/multiLanguagePaths";
import {EndPoints} from "constants/endPoints";

type IPageState = {
    breadCrumbTitle: string
} & IGetStateApp;

type IPageProps = {
    t: IPagePropCommon["t"]
} & AppProps

class ComponentApp extends Component<IPageProps, IPageState> {
    pathname: string;

    constructor(props: IPageProps) {
        super(props);
        this.pathname = this.props.router.asPath;
        this.state = {
            breadCrumbTitle: "",
            isAppLoading: true,
            isPageLoading: true,
            appData: {
                mainLangId: "",
                contentLanguages: [],
                currencyId: CurrencyId.TurkishLira
            },
            pageData: {
                langId: ""
            }
        }
    }

    async componentDidUpdate(prevProps: Readonly<IPageProps>, prevState: Readonly<IPageState>) {
        if (this.pathname !== this.props.router.asPath) {
            this.pathname = this.props.router.asPath;
            await this.onRouteChanged()
        }
        if (prevState.isPageLoading && !this.state.isPageLoading) {
            window.scrollTo(0, 0);
            document.body.scrollTop = 0;
        }
    }

    async onRouteChanged() {
        this.setState({
            isPageLoading: true,
        }, async () => {
            this.setState({
                pageData: {
                    ...this.state.pageData,
                    langId: this.state.appData.mainLangId
                }
            })
        })
    }

    setBreadCrumb(titles: string[]) {
        this.setState((state: IPageState) => {
            state.breadCrumbTitle = "";
            titles.forEach(title => {
                state.breadCrumbTitle += `${title} - `;
            })
            state.breadCrumbTitle = state.breadCrumbTitle.removeLastChar(2);
            return state;
        })
    }

    setStateApp(data: ISetStateApp, callBack?: () => void) {
        this.setState((state: IPageState) => {
            state = Variable.nestedObjectAssign(Object.create(state), data);
            return state;
        }, () => {
            if (callBack) {
                callBack();
            }
        })
    }

    PageHeader = (props: IPagePropCommon) => {
        let path = props.router.pathname.replaceAll("[", ":").replaceAll("]", "");

        return (
            <div className="page-header">
                <div className="row w-100 m-0">
                    <div className="col-md-8 p-0">
                        <ComponentThemeBreadCrumb breadCrumbs={this.state.breadCrumbTitle.split(" - ")}/>
                    </div>
                    {
                        multiLanguagePaths.includes(path)
                            ? <div className="col-md-4 p-0 content-language">
                                <ComponentThemeContentLanguage
                                    t={props.t}
                                    options={this.state.appData.contentLanguages}
                                    value={this.state.appData.contentLanguages.findSingle("_id", this.state.pageData.langId)}
                                    onChange={(item, e) => this.setState((state: IPageState) => {
                                        return {
                                            ...state,
                                            pageData: {
                                                ...state.pageData,
                                                langId: item.value
                                            }
                                        };
                                    })}
                                />
                            </div> : null
                    }
                </div>
            </div>
        )
    }

    render() {
        if (this.pathname !== this.props.router.asPath) {
            return null;
        }

        if (this.props.router.asPath === "/" || typeof this.props.pageProps.statusCode !== "undefined") {
            this.props.router.push(EndPoints.DASHBOARD);
            return null;
        }

        const fullPageLayoutRoutes = [
            EndPoints.LOGIN,
            EndPoints.LOCK
        ];
        let isFullPageLayout = fullPageLayoutRoutes.includes(this.props.router.pathname) || !this.state.sessionAuth?.user.userId || this.state.isAppLoading;

        const commonProps: IPagePropCommon = {
            router: this.props.router,
            t: this.props.t,
            setBreadCrumb: titles => this.setBreadCrumb(titles),
            setStateApp: (data, callBack) => this.setStateApp(data, callBack),
            getStateApp: this.state
        };

        return (
            <div>
                <ComponentHead title={this.state.breadCrumbTitle}/>
                <div className="container-scroller">
                    <ToastContainer/>
                    {!isFullPageLayout ? <ComponentToolNavbar {...commonProps}/> : null}
                    <div className={`container-fluid page-body-wrapper ${isFullPageLayout ? "full-page-wrapper" : ""}`}>
                        {!isFullPageLayout ? <ComponentToolSidebar {...commonProps}/> : null}
                        {this.state.isPageLoading || this.state.isAppLoading ?
                            <ComponentToolSpinner isFullPage={isFullPageLayout}/> : null}
                        <ComponentProviderAuth {...commonProps}>
                            <ComponentProviderPermission {...commonProps}>
                                <ComponentProviderAppInit  {...commonProps}>
                                    <div className="main-panel">
                                        <div className="content-wrapper">
                                            {
                                                !isFullPageLayout ? <this.PageHeader {...commonProps} /> : null
                                            }
                                            <this.props.Component {...commonProps}/>
                                        </div>
                                        {!isFullPageLayout ? <ComponentToolFooter/> : ''}
                                    </div>
                                </ComponentProviderAppInit>
                            </ComponentProviderPermission>
                        </ComponentProviderAuth>
                    </div>
                </div>
            </div>
        );
    }
}

export function withCustomProps(Component: any) {
    function ComponentWithCustomProps(props: any) {
        let {t} = useTranslation();
        return (
            <Component
                {...props}
                t={t}
            />
        );
    }

    return ComponentWithCustomProps;
}

export default withCustomProps(ComponentApp);