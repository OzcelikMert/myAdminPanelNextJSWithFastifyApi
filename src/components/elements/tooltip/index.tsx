import React, { Component } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

type IPageState = {};

type IPageProps = {
  message: string;
  children: React.ReactElement;
};

class ComponentToolTip extends Component<IPageProps, IPageState> {
  constructor(props: IPageProps) {
    super(props);
  }

  render() {
    return (
      <OverlayTrigger
        delay={{ hide: 150, show: 150 }}
        overlay={(props) => <Tooltip {...props}>{this.props.message}</Tooltip>}
        placement="top"
      >
        {this.props.children}
      </OverlayTrigger>
    );
  }
}

export default ComponentToolTip;
