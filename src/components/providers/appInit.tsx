import React, {Component} from 'react';
import {IPagePropCommon} from "types/pageProps";
import languageService from "services/language.service";
import settingService from "services/setting.service";
import {StatusId} from "constants/status";
import {CurrencyId} from "constants/currencyTypes";
import {SettingProjectionKeys} from "constants/settingProjections";

type IPageState = {};

type IPageProps = {
    children?: any
} & IPagePropCommon;

export default class ComponentProviderAppInit extends Component<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
        this.state = {}
    }

    async componentDidMount() {
        if(this.props.getStateApp.isAppLoading){
            await this.getContentLanguages();
            await this.getContentMainLanguage();
            await this.getSettingECommerce();
            this.props.setStateApp({
                isAppLoading: false
            })
        }
    }

    async getContentLanguages() {
        let resData = await languageService.getMany({statusId: StatusId.Active});
        if (resData.status) {
            this.props.setStateApp({
                appData: {
                    contentLanguages: resData.data
                }
            })
        }
    }

    async getContentMainLanguage() {
        let resData = await settingService.get({projection: SettingProjectionKeys.General});
        if (resData.status && resData.data) {
            let data = resData.data;
            this.props.setStateApp({
                appData: {
                  mainLangId: data.defaultLangId,
                  currentLangId: data.defaultLangId
                }
            })
        }
    }

    async getSettingECommerce() {
        let resData = await settingService.get({projection: SettingProjectionKeys.ECommerce});
        if (resData.status && resData.data) {
            let data = resData.data;
            this.props.setStateApp({
                appData: {
                    currencyId: data.eCommerce?.currencyId || CurrencyId.TurkishLira
                },
            })
        }
    }

    render() {
        if(this.props.getStateApp.isAppLoading){
            return null;
        }

        return this.props.children;
    }
}