import React, {Component} from "react";

type PageState = {};

type PageProps = {
    name: string,
    updatedAt: string
};

export default class ThemeTableUpdatedBy extends Component<PageProps, PageState> {
    render() {
        return (
            <div className="text-center">
                <b>{this.props.name}</b>
                <br/>
                <small>({new Date(this.props.updatedAt).toLocaleDateString()})</small>
            </div>
        )
    }
}