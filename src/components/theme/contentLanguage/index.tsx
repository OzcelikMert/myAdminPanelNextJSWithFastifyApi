import React, {Component} from 'react'
import {ComponentFormSelect} from "components/elements/form";
import {IPagePropCommon} from "types/pageProps";
import {ILanguageModel} from "types/models/language.model";
import Image from "next/image"
import {IThemeFormSelectValue} from "components/elements/form/input/select";
import {PathUtil} from "utils/path.util";

type IPageState = {};

type IPageProps = {
    t: IPagePropCommon["t"]
    options: ILanguageModel[]
    value?: ILanguageModel
    onChange: (item: IThemeFormSelectValue, e: any) => void
};

export default class ComponentThemeContentLanguage extends Component<IPageProps, IPageState> {
    Item = (props: ILanguageModel) => (
        <div className={`row p-0`}>
            <div className="col-6 text-end">
                <Image
                    className="img-fluid"
                    width={35}
                    height={45}
                    src={PathUtil.getFlagURL() + props.image}
                    alt={props.shortKey}
                />
            </div>
            <div className="col-6 text-start content-language-title">
                <h6>{props.title}</h6>
            </div>
        </div>
    )


    render() {
        return (
            <ComponentFormSelect
                title={this.props.t("contentLanguage")}
                isSearchable={false}
                options={this.props.options.map(option => ({label: <this.Item {...option} />, value: option._id}))}
                value={ this.props.value ? {label: <this.Item {...this.props.value} />, value: this.props.value._id} : undefined }
                onChange={(item: any, e) => this.props.onChange(item, e)}
            />
        )
    }
}
