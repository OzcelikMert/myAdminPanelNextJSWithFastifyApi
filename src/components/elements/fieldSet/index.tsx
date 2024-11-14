import React, { Component } from 'react';

type IPageState = {};

type IPageProps = {
  legend?: string;
  legendElement?: JSX.Element;
  children: any;
};

class ComponentFieldSet extends Component<IPageProps, IPageState> {
  render() {
    return (
      <div className="theme-input static">
        <span className="label">
          {this.props.legend} {this.props.legendElement}
        </span>
        <div className="field row d-flex m-0 pb-3 pt-3">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default ComponentFieldSet;
