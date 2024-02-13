import React, {Component} from 'react'
import {IPagePropCommon} from "types/pageProps";
import {ProductTypeId, productTypes} from "constants/productTypes";

type PageState = {};

type PageProps = {
    t: IPagePropCommon["t"]
    productTypeId: ProductTypeId
    className?: string
};

export default class ThemeBadgeProductType extends Component<PageProps, PageState> {
    render() {
        return (
            <label className={`badge badge-gradient-${getProductTypeColor(this.props.productTypeId)} text-start ${this.props.className ?? ""}`}>
                {
                    this.props.t(productTypes.findSingle("id", this.props.productTypeId)?.langKey ?? "[noLangAdd]")
                }
            </label>
        )
    }
}

export function getProductTypeColor(productTypeId: ProductTypeId): string {
    let className = ``;
    switch (productTypeId) {
        case ProductTypeId.SimpleProduct: className = `primary`; break;
        case ProductTypeId.VariableProduct: className = `info`; break;
        case ProductTypeId.ExternalProduct: className = `dark`; break;
    }
    return className;
}
