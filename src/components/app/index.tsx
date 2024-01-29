import React, {Component} from 'react';
import {PagePropCommonDocument} from "types/pageProps";
import {LanguageId} from "constants/index";
import Navbar from "components/tools/navbar";
import Sidebar from "components/tools/sidebar";
import Footer from "components/tools/footer";
import {AppAdminGetState, AppAdminSetState} from "types/pages/_app";
import PagePaths from "constants/pagePaths";
import ThemeBreadCrumb from "components/theme/breadCrumb";
import ThemeContentLanguage from "components/theme/contentLanguage";
import Spinner from "components/tools/spinner";
import {AppProps} from "next/app";
import ComponentHead from "components/head";
import {useTranslation} from "react-i18next";
import ProviderAuth from "components/providers/auth.provider";
import ProviderPermission from "components/providers/permission.provider";
import ProviderAppInit from "components/providers/app.init.provider";
import Variable from "library/variable";
import {ToastContainer} from "react-toastify";
import MultiLanguagePaths from "constants/multiLanguagePaths";
import {CurrencyId} from "constants/currencyTypes";

type PageState = {
    breadCrumbTitle: string
} & AppAdminGetState;

type PageProps = {
    t: PagePropCommonDocument["t"]
} & AppProps

class ComponentApp extends Component<PageProps, PageState> {
    pathname: string;

    constructor(props: PageProps) {
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
            },
            sessionData: {
                id: "",
                langId: LanguageId.English,
                image: "",
                name: "",
                email: "",
                roleId: 1,
                permissions: []
            }
        }
    }

    async componentDidUpdate(prevProps: Readonly<PageProps>, prevState: Readonly<PageState>) {
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
        this.setState((state: PageState) => {
            state.breadCrumbTitle = "";
            titles.forEach(title => {
                state.breadCrumbTitle += `${title} - `;
            })
            state.breadCrumbTitle = state.breadCrumbTitle.removeLastChar(2);
            return state;
        })
    }

    setStateApp(data: AppAdminSetState, callBack?: () => void) {
        this.setState((state: PageState) => {
            state = Variable.nestedObjectAssign(Object.create(state), data);
            return state;
        }, () => {
            if (callBack) {
                callBack();
            }
        })
    }

    PageHeader = (props: PagePropCommonDocument) => {
        let path = props.router.pathname.replaceAll("[", ":").replaceAll("]", "");

        return (
            <div className="page-header">
                <div className="row w-100 m-0">
                    <div className="col-md-8 p-0">
                        <ThemeBreadCrumb breadCrumbs={this.state.breadCrumbTitle.split(" - ")}/>
                    </div>
                    {
                        MultiLanguagePaths.includes(path)
                            ? <div className="col-md-4 p-0 content-language">
                                <ThemeContentLanguage
                                    t={props.t}
                                    options={this.state.appData.contentLanguages}
                                    value={this.state.appData.contentLanguages.findSingle("_id", this.state.pageData.langId)}
                                    onChange={(item, e) => this.setState((state: PageState) => {
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
            this.props.router.push(PagePaths.dashboard());
            return null;
        }

        const fullPageLayoutRoutes = [
            PagePaths.login(),
            PagePaths.lock()
        ];
        let isFullPageLayout = fullPageLayoutRoutes.includes(this.props.router.pathname) || this.state.sessionData.id.length <= 0 || this.state.isAppLoading;

        const commonProps: PagePropCommonDocument = {
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
                    {!isFullPageLayout ? <Navbar {...commonProps}/> : null}
                    <div className={`container-fluid page-body-wrapper ${isFullPageLayout ? "full-page-wrapper" : ""}`}>
                        {!isFullPageLayout ? <Sidebar {...commonProps}/> : null}
                        {this.state.isPageLoading || this.state.isAppLoading ?
                            <Spinner isFullPage={isFullPageLayout}/> : null}
                        <ProviderAuth {...commonProps}>
                            <ProviderPermission {...commonProps}>
                                <ProviderAppInit  {...commonProps}>
                                    <div className="main-panel">
                                        <div className="content-wrapper">
                                            {
                                                !isFullPageLayout ? <this.PageHeader {...commonProps} /> : null
                                            }
                                            <this.props.Component {...commonProps}/>
                                        </div>
                                        {!isFullPageLayout ? <Footer/> : ''}
                                    </div>
                                </ProviderAppInit>
                            </ProviderPermission>
                        </ProviderAuth>
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