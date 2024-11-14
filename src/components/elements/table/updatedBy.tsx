import React, { Component } from 'react';

type IPageState = {};

type IPageProps = {
  name: string;
  updatedAt: string;
};

export default class ComponentTableUpdatedBy extends Component<
  IPageProps,
  IPageState
> {
  render() {
    return (
      <div className="text-center">
        <b>{this.props.name}</b>
        <br />
        <small>({new Date(this.props.updatedAt).toLocaleDateString()})</small>
      </div>
    );
  }
}
