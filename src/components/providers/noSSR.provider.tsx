import React, {Component} from 'react';

type PageState = {
    isDidMount: boolean
}

type PageProps = {
    children?: any
}

export default class ProviderNoSSR extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            isDidMount: false
        }
    }

    componentDidMount() {
        this.setState({
            isDidMount: true
        })
    }

    render() {
        return (
            <div suppressHydrationWarning>
                {
                    !this.state.isDidMount ? null : this.props.children
                }
            </div>
        );
    }
}