import React, { Component } from 'react';

type IPageState = {};

type IPageProps = {
  customClass?: string;
};

export default class ComponentSpinnerDonut extends Component<
  IPageProps,
  IPageState
> {
  constructor(props: IPageProps) {
    super(props);
  }

  render() {
    return (
      <div
        className={`component-spinner-donut ${this.props.customClass ?? ''}`}
      >
        <div className="spinner-bg"></div>
        <div className="spinner-wrapper">
          <div className="donut"></div>
        </div>
      </div>
    );
  }
}
