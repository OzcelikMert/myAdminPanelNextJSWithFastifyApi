import React, {Component} from 'react'
import {IPagePropCommon} from "types/pageProps";
import {ComponentForm, ComponentFormSelect} from "components/elements/form";
import HandleForm from "library/react/handles/form";
import settingService from "services/setting.service";
import ComponentToast from "components/elements/toast";
import {ISettingUpdateECommerceParamService} from "types/services/setting.service";
import {Tab, Tabs} from "react-bootstrap";
import {CurrencyId, currencyTypes} from "constants/currencyTypes";
import {ThemeFormSelectValueDocument} from "components/elements/form/input/select";

type IPageState = {
    currencyTypes: ThemeFormSelectValueDocument[]
    isSubmitting: boolean
    formData: ISettingUpdateECommerceParamService,
    mainTabActiveKey: string
};

type IPageProps = {} & IPagePropCommon;

export default class PageECommerceSettings extends Component<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
        this.state = {
            currencyTypes: [],
            isSubmitting: false,
            mainTabActiveKey: `general`,
            formData: {
                eCommerce: {
                    currencyId: CurrencyId.TurkishLira
                }
            }
        }
    }

    async componentDidMount() {
        this.setPageTitle();
        this.getCurrencyTypes();
        await this.getSettings();
        this.props.setStateApp({
            isPageLoading: false
        })
    }

    setPageTitle() {
        this.props.setBreadCrumb([this.props.t("eCommerce"), this.props.t("settings")])
    }

    async getSettings() {
        let resData = await settingService.get({projection: "eCommerce"})
        if (resData.status && resData.data) {
            let setting = resData.data;
            this.setState((state: IPageState) => {
                state.formData = {
                    eCommerce: {
                        ...state.formData.eCommerce,
                        ...setting.eCommerce
                    }
                }
                return state;
            })
        }
    }

    getCurrencyTypes() {
        this.setState({
            currencyTypes: currencyTypes.map(currency => ({
                label: `${currency.title} (${currency.icon})`,
                value: currency.id.toString()
            }))
        })
    }

    onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.setState({
            isSubmitting: true
        }, async () => {
            let resData = await settingService.updateECommerce(this.state.formData);
            if (resData.status) {
                this.props.setStateApp({
                    appData: {
                        currencyId: this.state.formData.eCommerce.currencyId
                    }
                })
                new ComponentToast({
                    type: "success",
                    title: this.props.t("successful"),
                    content: this.props.t("settingsUpdated")
                })
            }
            this.setState({
                isSubmitting: false
            })
        })
    }

    TabGeneral = () => {
        return (
            <div className="row">
                <div className="col-md-7 mb-3">
                    <ComponentFormSelect
                        title={this.props.t("currencyType")}
                        name="formData.eCommerce.currencyId"
                        isMulti={false}
                        isSearchable={false}
                        options={this.state.currencyTypes}
                        value={this.state.currencyTypes.findSingle("value", this.state.formData.eCommerce.currencyId)}
                        onChange={(item: any, e) => HandleForm.onChangeSelect(e.name, item.value, this)}
                    />
                </div>
            </div>
        );
    }

    render() {
        return this.props.getStateApp.isPageLoading ? null : (
            <div className="page-post">
                <div className="row">
                    <div className="col-md-12">
                        <ComponentForm
                            isActiveSaveButton={true}
                            saveButtonText={this.props.t("save")}
                            saveButtonLoadingText={this.props.t("loading")}
                            isSubmitting={this.state.isSubmitting}
                            formAttributes={{onSubmit: (event) => this.onSubmit(event)}}
                        >
                            <div className="grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="theme-tabs">
                                            <Tabs
                                                onSelect={(key: any) => this.setState({mainTabActiveKey: key})}
                                                activeKey={this.state.mainTabActiveKey}
                                                className="mb-5"
                                                transition={false}>
                                                <Tab eventKey="general" title={this.props.t("general")}>
                                                    <this.TabGeneral/>
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
        )
    }
}
