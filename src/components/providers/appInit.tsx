import { Component } from 'react';
import { IPagePropCommon } from 'types/pageProps';
import { LanguageService } from '@services/language.service';
import { SettingService } from '@services/setting.service';
import { StatusId } from '@constants/status';
import { CurrencyId } from '@constants/currencyTypes';
import { SettingProjectionKeys } from '@constants/settingProjections';

type IPageState = {};

type IPageProps = {
  children?: any;
} & IPagePropCommon;

export default class ComponentProviderAppInit extends Component<
  IPageProps,
  IPageState
> {
  constructor(props: IPageProps) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    if (this.props.getStateApp.isAppLoading) {
      await this.getContentLanguages();
      await this.getSettingECommerce();
      this.props.setStateApp({
        isAppLoading: false,
      });
    }
  }

  async getContentLanguages() {
    const serviceResult = await LanguageService.getMany({
      statusId: StatusId.Active,
    });
    if (serviceResult.status && serviceResult.data) {
      let foundDefaultLanguage = serviceResult.data.findSingle(
        'isDefault',
        true
      );
      if (!foundDefaultLanguage) {
        foundDefaultLanguage = serviceResult.data[0];
      }
      this.props.setStateApp({
        appData: {
          contentLanguages: serviceResult.data,
          mainLangId: foundDefaultLanguage._id,
          currentLangId: foundDefaultLanguage._id,
        },
      });
    }
  }

  async getSettingECommerce() {
    const serviceResult = await SettingService.get({
      projection: SettingProjectionKeys.ECommerce,
    });
    if (serviceResult.status && serviceResult.data) {
      this.props.setStateApp({
        appData: {
          currencyId:
            serviceResult.data.eCommerce?.currencyId || CurrencyId.TurkishLira,
        },
      });
    }
  }

  render() {
    if (this.props.getStateApp.isAppLoading) {
      return null;
    }

    return this.props.children;
  }
}
