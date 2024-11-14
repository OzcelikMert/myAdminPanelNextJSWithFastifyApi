import React, { Component } from 'react';
import { IPagePropCommon } from 'types/pageProps';
import { ComponentForm, ComponentFormSelect } from '@components/elements/form';
import { HandleFormLibrary } from '@library/react/handles/form';
import { SettingService } from '@services/setting.service';
import ComponentToast from '@components/elements/toast';
import { ISettingUpdateECommerceParamService } from 'types/services/setting.service';
import { Tab, Tabs } from 'react-bootstrap';
import { CurrencyId, currencyTypes } from '@constants/currencyTypes';
import { IThemeFormSelectValue } from '@components/elements/form/input/select';
import { SettingProjectionKeys } from '@constants/settingProjections';
import { PermissionUtil } from '@utils/permission.util';
import { ECommerceEndPointPermission } from '@constants/endPointPermissions/eCommerce.endPoint.permission';
import { ISettingECommerceModel } from 'types/models/setting.model';

type IPageState = {
  currencyTypes: IThemeFormSelectValue[];
  isSubmitting: boolean;
  formData: ISettingUpdateECommerceParamService;
  item?: ISettingECommerceModel;
  mainTabActiveKey: string;
};

type IPageProps = {} & IPagePropCommon;

export default class PageECommerceSettings extends Component<
  IPageProps,
  IPageState
> {
  abortController = new AbortController();

  constructor(props: IPageProps) {
    super(props);
    this.state = {
      currencyTypes: [],
      isSubmitting: false,
      mainTabActiveKey: `general`,
      formData: {
        eCommerce: {
          currencyId: CurrencyId.TurkishLira,
        },
      },
    };
  }

  async componentDidMount() {
    if (
      PermissionUtil.checkAndRedirect(
        this.props,
        ECommerceEndPointPermission.SETTINGS
      )
    ) {
      this.setPageTitle();
      this.getCurrencyTypes();
      await this.getSettings();
      this.props.setStateApp({
        isPageLoading: false,
      });
    }
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  setPageTitle() {
    this.props.setBreadCrumb([
      this.props.t('eCommerce'),
      this.props.t('settings'),
    ]);
  }

  async getSettings() {
    const serviceResult = await SettingService.get(
      { projection: SettingProjectionKeys.ECommerce },
      this.abortController.signal
    );
    if (serviceResult.status && serviceResult.data) {
      const setting = serviceResult.data;
      this.setState((state: IPageState) => {
        state.item = setting.eCommerce;
        state.formData = {
          eCommerce: {
            ...state.formData.eCommerce,
            ...setting.eCommerce,
          },
        };
        return state;
      });
    }
  }

  getCurrencyTypes() {
    this.setState({
      currencyTypes: currencyTypes.map((currency) => ({
        label: `${currency.title} (${currency.icon})`,
        value: currency.id.toString(),
      })),
    });
  }

  onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.setState(
      {
        isSubmitting: true,
      },
      async () => {
        const serviceResult = await SettingService.updateECommerce(
          this.state.formData,
          this.abortController.signal
        );
        if (serviceResult.status) {
          this.props.setStateApp({
            appData: {
              currencyId: this.state.formData.eCommerce.currencyId,
            },
          });
          new ComponentToast({
            type: 'success',
            title: this.props.t('successful'),
            content: this.props.t('settingsUpdated'),
          });
        }
        this.setState({
          isSubmitting: false,
        });
      }
    );
  }

  TabGeneral = () => {
    return (
      <div className="row">
        <div className="col-md-7 mb-3">
          <ComponentFormSelect
            title={this.props.t('currencyType')}
            name="formData.eCommerce.currencyId"
            isMulti={false}
            isSearchable={false}
            options={this.state.currencyTypes}
            value={this.state.currencyTypes.findSingle(
              'value',
              this.state.formData.eCommerce.currencyId
            )}
            onChange={(item: any, e) =>
              HandleFormLibrary.onChangeSelect(e.name, item.value, this)
            }
          />
        </div>
      </div>
    );
  };

  render() {
    return this.props.getStateApp.isPageLoading ? null : (
      <div className="page-post">
        <div className="row">
          <div className="col-md-12">
            <ComponentForm
              isActiveSaveButton={true}
              saveButtonText={this.props.t('save')}
              saveButtonLoadingText={this.props.t('loading')}
              isSubmitting={this.state.isSubmitting}
              formAttributes={{ onSubmit: (event) => this.onSubmit(event) }}
            >
              <div className="grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <div className="theme-tabs">
                      <Tabs
                        onSelect={(key: any) =>
                          this.setState({ mainTabActiveKey: key })
                        }
                        activeKey={this.state.mainTabActiveKey}
                        className="mb-5"
                        transition={false}
                      >
                        <Tab eventKey="general" title={this.props.t('general')}>
                          <this.TabGeneral />
                        </Tab>
                      </Tabs>
                    </div>
                  </div>
                </div>
              </div>
            </ComponentForm>
          </div>
        </div>
      </div>
    );
  }
}
