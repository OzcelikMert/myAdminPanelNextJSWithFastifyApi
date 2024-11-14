import React, { Component } from 'react';

type IPageState = {} & any;

type IPageProps = {
  title?: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

class ComponentFormCheckBox extends Component<IPageProps, IPageState> {
  render() {
    return (
      <div className="form-check form-check-primary d-inline-block">
        <label className="form-check-label">
          <input type="checkbox" className="form-check-input" {...this.props} />{' '}
          {this.props.title}
          <i className="input-helper"></i>
        </label>
      </div>
    );
  }
}

export default ComponentFormCheckBox;
