import React, {Component} from 'react';
import {PagePropCommonDocument} from "types/pageProps";

type PageState = {};

type PageProps = {

} & PagePropCommonDocument;

export default class ComponentError404 extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <h3>Aradiginiz Sayfa Bulunamadi!</h3>
                <a href={this.props.router.basePath} className="btn btn-gradient-primary"><i className="mdi mdi-arrow-left-circle-outline"></i> Anasayfaya Don</a>
            </div>
        );
    }
}