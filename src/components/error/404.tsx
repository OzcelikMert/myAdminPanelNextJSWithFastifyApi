import React, { Component } from 'react';
import { IPagePropCommon } from 'types/pageProps';

type IPageState = {};

type IPageProps = {} & IPagePropCommon;

export default class ComponentError404 extends Component<
  IPageProps,
  IPageState
> {
  constructor(props: IPageProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h3>Aradiginiz Sayfa Bulunamadi!</h3>
        <a
          href={this.props.router.basePath}
          className="btn btn-gradient-primary"
        >
          <i className="mdi mdi-arrow-left-circle-outline"></i> Anasayfaya Don
        </a>
      </div>
    );
  }
}
