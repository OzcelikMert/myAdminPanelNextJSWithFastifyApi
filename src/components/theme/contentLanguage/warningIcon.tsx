import React, {Component} from 'react'
import {ComponentFormSelect} from "@components/elements/form";
import {IPagePropCommon} from "types/pageProps";
import {ILanguageModel} from "types/models/language.model";
import Image from "next/image"
import {IThemeFormSelectValue} from "@components/elements/form/input/select";
import {PathUtil} from "@utils/path.util";
import ComponentToolTip from "@components/elements/tooltip";

type IPageState = {};

type IPageProps = {
    message: string
};

export default class ComponentThemeContentLanguageWarningIcon extends Component<IPageProps, IPageState> {
    render() {
        return (
            <ComponentToolTip message={this.props.message}>
                <span className="text-warning fs-4 ps-2">
                    <i className="mdi mdi-alert-circle"></i>
                </span>
            </ComponentToolTip>
        )
    }
}
