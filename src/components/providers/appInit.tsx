import React, {Component} from 'react';
import {IPagePropCommon} from "types/pageProps";
import {LanguageService} from "services/language.service";
import {SettingService} from "services/setting.service";
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
        let serviceResult = await LanguageService.getMany({statusId: StatusId.Active});
        if (serviceResult.status && serviceResult.data) {
            this.props.setStateApp({
                appData: {
                    contentLanguages: serviceResult.data
                }
            })
        }
    }

    async getContentMainLanguage() {
        let serviceResult = await SettingService.get({projection: SettingProjectionKeys.General});
        if (serviceResult.status && serviceResult.data) {
            this.props.setStateApp({
                appData: {
                  mainLangId: serviceResult.data.defaultLangId,
                  currentLangId: serviceResult.data.defaultLangId
                }
            })
        }
    }

    async getSettingECommerce() {
        let serviceResult = await SettingService.get({projection: SettingProjectionKeys.ECommerce});
        if (serviceResult.status && serviceResult.data) {
            this.props.setStateApp({
                appData: {
                    currencyId: serviceResult.data.eCommerce?.currencyId || CurrencyId.TurkishLira
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