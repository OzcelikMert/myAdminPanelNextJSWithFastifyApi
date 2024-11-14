import React, { Component } from 'react';

type IPageState = {
  isDidMount: boolean;
};

type IPageProps = {
  children?: any;
};

export default class ComponentProviderNoSSR extends Component<
  IPageProps,
  IPageState
> {
  constructor(props: IPageProps) {
    super(props);
    this.state = {
      isDidMount: false,
    };
  }

  componentDidMount() {
    this.setState({
      isDidMount: true,
    });
  }

  render() {
    return (
      <div suppressHydrationWarning>
        {!this.state.isDidMount ? null : this.props.children}
      </div>
    );
  }
}
