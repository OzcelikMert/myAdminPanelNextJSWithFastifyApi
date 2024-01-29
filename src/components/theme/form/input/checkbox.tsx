import React, {Component} from 'react'

type PageState = {} & any;

type PageProps = {
    title?: string,
} &  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

class ThemeFormCheckBox extends Component<PageProps, PageState> {
    render () {
        return (
            <div className="form-check form-check-primary d-inline-block">
                <label className="form-check-label">
                    <input type="checkbox" className="form-check-input" {...this.props}/> {this.props.title}
                    <i className="input-helper"></i>
                </label>
            </div>
        )
    }
}

export default ThemeFormCheckBox;
