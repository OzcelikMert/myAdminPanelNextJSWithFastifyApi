import React, {Component} from 'react'
import {PagePropCommonDocument} from "types/pageProps";
import {ThemeForm, ThemeFormSelect} from "components/theme/form";
import HandleForm from "library/react/handles/form";
import settingService from "services/setting.service";
import ThemeToast from "components/theme/toast";
import {SettingUpdateECommerceParamDocument} from "types/services/setting";
import {Tab, Tabs} from "react-bootstrap";
import {CurrencyId, CurrencyTypes} from "constants/currencyTypes";
import {ThemeFormSelectValueDocument} from "components/theme/form/input/select";

type PageState = {
    currencyTypes: ThemeFormSelectValueDocument[]
    isSubmitting: boolean
    formData: SettingUpdateECommerceParamDocument,
    mainTabActiveKey: string
};

type PageProps = {} & PagePropCommonDocument;

export default class PageECommerceSettings extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
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
            this.setState((state: PageState) => {
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
            currencyTypes: CurrencyTypes.map(currency => ({
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
                new ThemeToast({
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
                    <ThemeFormSelect
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
                        <ThemeForm
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
                        </ThemeForm>
                    </div>
                </div>
            </div>
        )
    }
}
