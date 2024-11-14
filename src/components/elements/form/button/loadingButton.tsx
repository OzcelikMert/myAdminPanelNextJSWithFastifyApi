import React, { Component } from 'react';

type IPageState = {} & any;

type IPageProps = {
  text?: string;
};

class ComponentFormLoadingButton extends Component<IPageProps, IPageState> {
  render() {
    return (
      <button
        className="btn btn-gradient-dark float-end btn-save"
        disabled={true}
        type={'button'}
      >
        <i className="fa fa-spinner fa-spin me-1"></i>
        {this.props.text}
      </button>
    );
  }
}

export default ComponentFormLoadingButton;
