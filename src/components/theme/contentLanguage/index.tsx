import React, {Component} from 'react'
import {ThemeFormSelect} from "components/theme/form";
import {PagePropCommonDocument} from "types/pageProps";
import {LanguageDocument} from "types/models/language.model";
import pathUtil from "utils/path.util";
import Image from "next/image"
import {ThemeFormSelectValueDocument} from "components/theme/form/input/select";

type PageState = {};

type PageProps = {
    t: PagePropCommonDocument["t"]
    options: LanguageDocument[]
    value?: LanguageDocument
    onChange: (item: ThemeFormSelectValueDocument, e: any) => void
};

export default class ThemeContentLanguage extends Component<PageProps, PageState> {
    Item = (props: LanguageDocument) => (
        <div className={`row p-0`}>
            <div className="col-6 text-end">
                <Image
                    className="img-fluid"
                    width={35}
                    height={45}
                    src={pathUtil.uploads.flags + props.image}
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
            <ThemeFormSelect
                title={this.props.t("contentLanguage")}
                isSearchable={false}
                options={this.props.options.map(option => ({label: <this.Item {...option} />, value: option._id}))}
                value={ this.props.value ? {label: <this.Item {...this.props.value} />, value: this.props.value._id} : undefined }
                onChange={(item: any, e) => this.props.onChange(item, e)}
            />
        )
    }
}
