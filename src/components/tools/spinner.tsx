import React, {Component} from 'react'

type IPageState = {};

type IPageProps = {
    isFullPage?: boolean
};

export default class ComponentToolSpinner extends Component<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
    }

    render() {
        return (
            <div className="spinner-main">
                <div className="spinner-bg"></div>
                <div className={`spinner-wrapper ${this.props.isFullPage ? "spinner-full-page" : ""}`}>
                    <div className="donut"></div>
                </div>
            </div>
        )
    }
}
