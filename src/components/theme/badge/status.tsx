import React, {Component} from 'react'
import {status, StatusId} from "constants/status";
import {IPagePropCommon} from "types/pageProps";

type IPageState = {};

type IPageProps = {
    t: IPagePropCommon["t"]
    statusId: StatusId
    className?: string
};

export default class ComponentThemeBadgeStatus extends Component<IPageProps, IPageState> {
    render() {
        return (
            <label className={`badge badge-gradient-${getStatusColor(this.props.statusId)} text-start ${this.props.className ?? ""}`}>
                <i className={`${getStatusIcon(this.props.statusId)} me-2`}></i>
                {
                    this.props.t(status.findSingle("id", this.props.statusId)?.langKey ?? "[noLangAdd]")
                }
            </label>
        )
    }
}

export function getStatusColor(statusId: number): string {
    let className = ``;
    switch (statusId) {
        case StatusId.Active: className = `success`; break;
        case StatusId.Pending:
        case StatusId.Banned:
        case StatusId.Disabled: className = `dark`; break;
        case StatusId.InProgress: className = `warning`; break;
        case StatusId.Deleted: className = `danger`; break;
    }
    return className;
}

export function getStatusIcon(statusId: number): string {
    let className = ``;
    switch (statusId) {
        case StatusId.Active: className = `mdi mdi-check`;break;
        case StatusId.Pending: className = `mdi mdi-clock-outline`; break;
        case StatusId.Banned: className = `mdi mdi-cancel`; break;
        case StatusId.InProgress: className = `mdi mdi-wrench-clock-outline`; break;
        case StatusId.Deleted: className = `mdi mdi-trash-can-outline`; break;
        case StatusId.Disabled: className = `mdi mdi-eye-off-outline`; break;
    }
    return className;
}
