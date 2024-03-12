import React, {Component} from 'react'
import {IPagePropCommon} from "types/pageProps";
import {ProductTypeId, productTypes} from "constants/productTypes";

type IPageState = {};

type IPageProps = {
    t: IPagePropCommon["t"]
    typeId: ProductTypeId
    className?: string
};

export default class ComponentThemeBadgeProductType extends Component<IPageProps, IPageState> {
    render() {
        return (
            <label className={`badge badge-gradient-${getTypeColor(this.props.typeId)} text-start ${this.props.className ?? ""}`}>
                {
                    this.props.t(productTypes.findSingle("id", this.props.typeId)?.langKey ?? "[noLangAdd]")
                }
            </label>
        )
    }
}

export function getTypeColor(typeId: ProductTypeId): string {
    let className = ``;
    switch (typeId) {
        case ProductTypeId.SimpleProduct: className = `primary`; break;
        case ProductTypeId.VariableProduct: className = `info`; break;
        case ProductTypeId.ExternalProduct: className = `dark`; break;
    }
    return className;
}
