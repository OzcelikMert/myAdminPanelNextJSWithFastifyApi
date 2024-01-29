import React, {Component} from 'react'

type PageState = {};

type PageProps = {
    isFullPage?: boolean
};

export default class Spinner extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
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
