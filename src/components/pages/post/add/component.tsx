import React, {Component} from 'react';
import PagePostAdd, {IPageState as PostPageState} from "pages/post/[postTypeId]/add";
import {ComponentFormSelect} from "components/elements/form";

type IPageState = {};

type IPageProps = {
    page: PagePostAdd
};

export default class ComponentPagePostAddComponent extends Component<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
        this.state = {}
    }

    onChangeSelect(value: string, index: number) {
        this.props.page.setState((state: PostPageState) => {
            if (state.formData.components) state.formData.components[index] = value;
            return state;
        })
    }

    onAddNew() {
        this.props.page.setState((state: PostPageState) => {
            if (typeof state.formData.components === "undefined") state.formData.components = [];
            state.formData.components.push("")
            return state;
        })
    }

    onDelete(index: number) {
        this.props.page.setState((state: PostPageState) => {
            if (state.formData.components) state.formData.components.remove(index);
            return state;
        })
    }

    Component = (props: { componentId: string, index: number }) => {
        return (
            <div className="col-md-12 mt-4">
                <div className="row">
                    <div className="col-3 col-lg-1 mt-2">
                        <button type="button" className="btn btn-gradient-danger btn-lg"
                                onClick={event => this.onDelete(props.index)}><i
                            className="mdi mdi-trash-can"></i></button>
                    </div>
                    <div className="col-9 col-lg-11">
                        <ComponentFormSelect
                            title={this.props.page.props.t("component")}
                            options={this.props.page.state.components}
                            value={this.props.page.state.components?.filter(item => item.value == props.componentId)}
                            onChange={(item: any, e) => this.onChangeSelect(item.value, props.index)}
                        />
                    </div>
                </div>

            </div>
        )
    }

    render() {
        return (
            <div className="grid-margin stretch-card">
                <div className="card">
                    <div className="card-header text-center pt-3">
                        <h4>{this.props.page.props.t("components")}</h4>
                    </div>
                    <div className="card-body">
                        <div className="row mb-3">
                            <div className="col-md-7">
                                <button type={"button"} className="btn btn-gradient-success btn-lg"
                                        onClick={() => this.onAddNew()}>+ {this.props.page.props.t("addNew")}
                                </button>
                            </div>
                            <div className="col-md-7 mt-2">
                                <div className="row">
                                    {
                                        this.props.page.state.formData.components?.map((componentId, index) => {
                                            return <this.Component componentId={componentId} index={index}/>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}