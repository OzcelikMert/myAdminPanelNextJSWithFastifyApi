import React, { Component } from 'react';
import Head from 'next/head';

type IPageState = {};

type IPageProps = {
  title: string;
  icon?: string;
};

export default class ComponentHead extends Component<IPageProps, IPageState> {
  constructor(props: IPageProps) {
    super(props);
  }

  render() {
    return (
      <Head>
        <title>Admin Panel | {this.props.title || 'Loading...'}</title>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/images/ozcelikLogoMini.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="copyright" content="Özçelik Software" />
        <meta name="author" content="Özçelik Software" />
      </Head>
    );
  }
}
