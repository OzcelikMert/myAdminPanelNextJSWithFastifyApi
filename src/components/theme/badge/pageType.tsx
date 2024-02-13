import React, {Component} from 'react'
import {IPagePropCommon} from "types/pageProps";
import {PageTypeId, pageTypes} from "constants/pageTypes";

type IPageState = {};

type IPageProps = {
    t: IPagePropCommon["t"]
    pageTypeId: PageTypeId
    className?: string
};

export default class ComponentThemeBadgePageType extends Component<IPageProps, IPageState> {
    render() {
        return (
            <label className={`badge badge-gradient-${getPageTypeColor(this.props.pageTypeId)} text-start ${this.props.className ?? ""}`}>
                {
                    this.props.t(pageTypes.findSingle("id", this.props.pageTypeId)?.langKey ?? "[noLangAdd]")
                }
            </label>
        )
    }
}

export function getPageTypeColor(pageTypeId: PageTypeId): string {
    let className = ``;
    switch (pageTypeId) {
        case PageTypeId.Default: className = `dark`; break;
        case PageTypeId.HomePage: className = `primary`; break;
        case PageTypeId.Blogs: className = `warning`; break;
        case PageTypeId.Contact: className = `info`; break;
    }
    return className;
}
