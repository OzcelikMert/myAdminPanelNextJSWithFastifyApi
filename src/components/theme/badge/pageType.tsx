import React, {Component} from 'react'
import {IPagePropCommon} from "types/pageProps";
import {PageTypeId, pageTypes} from "@constants/pageTypes";

type IPageState = {};

type IPageProps = {
    t: IPagePropCommon["t"]
    typeId: PageTypeId
    className?: string
};

export default class ComponentThemeBadgePageType extends Component<IPageProps, IPageState> {
    render() {
        return (
            <label className={`badge badge-gradient-${getPageTypeColor(this.props.typeId)} text-start ${this.props.className ?? ""}`}>
                {
                    this.props.t(pageTypes.findSingle("id", this.props.typeId)?.langKey ?? "[noLangAdd]")
                }
            </label>
        )
    }
}

export function getPageTypeColor(typeId: PageTypeId): string {
    let className = ``;
    switch (typeId) {
        case PageTypeId.Default: className = `dark`; break;
        case PageTypeId.HomePage: className = `primary`; break;
        case PageTypeId.Contact: className = `info`; break;
        case PageTypeId.Blogs:
        case PageTypeId.Blog:
        case PageTypeId.Portfolios:
        case PageTypeId.Portfolio:
        case PageTypeId.Products:
        case PageTypeId.Product:
            className = `warning`; break;
        case PageTypeId.ErrorPage404: className = `danger`; break;
    }
    return className;
}
