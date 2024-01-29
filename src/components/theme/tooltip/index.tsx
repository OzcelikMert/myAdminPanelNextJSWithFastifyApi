import React, {Component} from "react";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

type PageState = {};

type PageProps = {
    message: string
    children: React.ReactElement
};

class ThemeToolTip extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    render() {
        return (
            <OverlayTrigger
                delay={{ hide: 150, show: 150 }}
                overlay={(props) => (
                    <Tooltip {...props}>
                        {this.props.message}
                    </Tooltip>
                )}
                placement="top">{this.props.children}</OverlayTrigger>
        )
    }
}

export default ThemeToolTip;