import React, {Component} from 'react'
import Select from "react-select";
import {StateManagerProps} from "react-select/dist/declarations/src/useStateManager";

export interface ThemeFormSelectValueDocument {label: any, value: any}

type PageState = {} & any;

type PageProps = {
    title?: string
} & StateManagerProps;

class ThemeFormSelect extends Component<PageProps, PageState> {
    render () {
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
        )
    }
}

export default ThemeFormSelect;
