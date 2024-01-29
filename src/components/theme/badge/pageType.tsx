import React, {Component} from 'react'
import {PagePropCommonDocument} from "types/pageProps";
import {PageTypeId, PageTypes} from "constants/pageTypes";

type PageState = {};

type PageProps = {
    t: PagePropCommonDocument["t"]
    pageTypeId: PageTypeId
    className?: string
};

export default class ThemeBadgePageType extends Component<PageProps, PageState> {
    render() {
        return (
            <label className={`badge badge-gradient-${getPageTypeColor(this.props.pageTypeId)} text-start ${this.props.className ?? ""}`}>
                {
                    this.props.t(PageTypes.findSingle("id", this.props.pageTypeId)?.langKey ?? "[noLangAdd]")
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
