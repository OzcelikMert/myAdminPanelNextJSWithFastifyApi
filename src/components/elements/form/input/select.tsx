import React, { Component } from 'react';
import Select from 'react-select';
import { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager';

export interface IThemeFormSelectValue {
  label: any;
  value: any;
}

type IPageState = {} & any;

type IPageProps = {
  title?: string;
} & StateManagerProps;

class ComponentFormSelect extends Component<IPageProps, IPageState> {
  render() {
    return (
      <label className="theme-input static">
        <span className="label">{this.props.title}</span>
        <div className="field">
          <Select
            className="custom-select"
            classNamePrefix="custom-select"
            {...this.props}
          />
        </div>
      </label>
    );
  }
}

export default ComponentFormSelect;
