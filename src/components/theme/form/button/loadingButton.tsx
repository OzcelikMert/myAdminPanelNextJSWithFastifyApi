import React, {Component} from 'react'

type PageState = {} & any;

type PageProps = {
    text?: string
};

class ThemeFormLoadingButton extends Component<PageProps, PageState> {
    render () {
        return (
            <button className="btn btn-gradient-dark float-end btn-save" disabled={true} type={"button"}>
                <i className="fa fa-spinner fa-spin me-1"></i>
                {this.props.text}
            </button>
        )
    }
}

export default ThemeFormLoadingButton;
