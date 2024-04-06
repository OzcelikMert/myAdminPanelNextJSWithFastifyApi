import React, {Component} from 'react'
import {IPagePropCommon} from "types/pageProps";
import {ComponentTypeId, componentTypes} from "@constants/componentTypes";

type IPageState = {};

type IPageProps = {
    t: IPagePropCommon["t"]
    typeId: ComponentTypeId
    className?: string
};

export default class ComponentThemeBadgeComponentType extends Component<IPageProps, IPageState> {
    render() {
        return (
            <label className={`badge badge-gradient-${getComponentTypeColor(this.props.typeId)} text-start ${this.props.className ?? ""}`}>
                {
                    this.props.t(componentTypes.findSingle("id", this.props.typeId)?.langKey ?? "[noLangAdd]")
                }
            </label>
        )
    }
}

export function getComponentTypeColor(typeId: ComponentTypeId): string {
    let className = ``;
    switch (typeId) {
        case ComponentTypeId.Tool: className = `dark`; break;
        case ComponentTypeId.Theme: className = `primary`; break;
    }
    return className;
}
