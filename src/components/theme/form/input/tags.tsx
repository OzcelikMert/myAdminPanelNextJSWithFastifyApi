import React, {Component} from 'react'
import V from "library/variable";

type PageState = {
    tags: string[]
    currentTags: string
};

type PageProps = {
    value: string[]
    onChange: (value: string[], name?: string) => void
    name?: string
    title?: string
    placeHolder?: string
};

class ThemeFormTags extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            tags: this.props.value,
            currentTags: ""
        }
    }

    componentDidUpdate(prevProps: Readonly<PageProps>, prevState: Readonly<PageState>, snapshot?: any) {
        if(this.props.value != prevProps.value) {
            this.setState({
                tags: this.props.value
            })
        }
    }

    onChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            currentTags: event.target.value
        })
    }

    onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter" && !V.isEmpty(this.state.currentTags)) {
            this.setState((state: PageState) => {
                let newTag = state.currentTags.trim()

                if (!state.tags.includes(newTag)) {
                    state.tags.push(newTag);
                    state.currentTags = "";
                    this.props.onChange(this.state.tags, this.props.name);
                }

                return state;
            })
        }
    }

    onRemove(tag: string) {
        this.setState((state: PageState) => {
            state.tags = state.tags.filter(item => item != tag);
            this.props.onChange(this.state.tags, this.props.name);
            return state;
        })

    }

    Tag = (props: { title: string }) => (
        <span className="tag">
            {props.title}
            <button type="button" className="btn btn-gradient-danger delete" onClick={() => this.onRemove(props.title)}>
                <i className="mdi mdi-close"></i>
            </button>
        </span>
    );

    render() {
        return (
            <div className="theme-input static">
                <span className="label">{this.props.title}</span>
                <div className="tags field">
                    {
                        this.state.tags.map((tag, index: any) =>
                            <this.Tag title={tag} key={index} />
                        )
                    }
                    <input
                        type="text"
                        name={this.props.name}
                        value={this.state.currentTags}
                        onChange={(event) => this.onChange(event)}
                        onKeyDown={(event) => this.onKeyDown(event)}
                        placeholder={this.props.placeHolder}
                    />
                </div>
            </div>
        )
    }
}

export default ThemeFormTags;
