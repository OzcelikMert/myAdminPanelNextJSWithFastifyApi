import React, {Component} from 'react';
import {ComponentFormType} from "components/elements/form";
import ComponentThemeChooseImage from "components/theme/chooseImage";
import Image from "next/image";
import {ImageSourceUtil} from "utils/imageSource.util";
import {IPagePropCommon} from "types/pageProps";
import dynamic from "next/dynamic";
import {IComponentElementModel} from "types/models/component.model";
import {ElementTypeId} from "constants/elementTypes";

const ComponentThemeRichTextBox = dynamic(() => import("components/theme/richTextBox"), {ssr: false});

type IPageState = {

} & { [key: string]: any };

type IPageProps = {
    data: IComponentElementModel
    onChange: (key: string, value: any) => void
} & IPagePropCommon;

export default class ComponentPageComponentElementTypeInput extends Component<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
        this.state = {}
    }

    TextArea = () => {
        return (
            <ComponentFormType
                type={"textarea"}
                title={this.props.t("text")}
                value={this.props.data.contents?.content}
                onChange={e => this.props.onChange("content", e.target.value)}
            />
        )
    }

    RichText = () => {
        return (
            <ComponentThemeRichTextBox
                {...this.props}
                value={this.props.data.contents?.content ?? ""}
                onChange={e => this.props.onChange("content", e)}
            />
        )
    }

    Image = () => {
        return (
                <div>
                    <ComponentThemeChooseImage
                        {...this.props}
                        isShow={this.state[this.props.data._id ?? ""]}
                        onHide={() => this.setState((state: IPageState) => {
                            state[this.props.data._id] = false;
                            return state;
                        })}
                        onSelected={images => this.props.onChange("content", images[0])}
                        isMulti={false}
                    />
                    <Image
                        src={ImageSourceUtil.getUploadedImageSrc(this.props.data.contents?.content)}
                        alt="Empty Image"
                        className="post-image img-fluid"
                        width={250}
                        height={250}
                    />
                    <button
                        type="button"
                        className="btn btn-gradient-warning btn-xs ms-0 ms-md-2 mt-2 mt-md-0"
                        onClick={() => this.setState((state: IPageState) => {
                            state[this.props.data._id ?? ""] = true;
                            return state;
                        })}
                    ><i className="fa fa-pencil-square-o"></i></button>
                </div>
        )
    }

    Button = () => {
        return (
            <div className="row">
                <div className="col-md-6">
                    <ComponentFormType
                        type={"text"}
                        title={this.props.t("text")}
                        value={this.props.data.contents?.content}
                        onChange={e => this.props.onChange("content", e.target.value)}
                    />
                </div>
                <div className="col-md-6 mt-3 mt-lg-0">
                    <ComponentFormType
                        type={"text"}
                        title={this.props.t("url")}
                        value={this.props.data.contents?.url || ""}
                        onChange={e => this.props.onChange("url", e.target.value)}
                    />
                </div>
            </div>
        )
    }

    Text = () => {
        return (
            <ComponentFormType
                type={"text"}
                title={this.props.t("text")}
                value={this.props.data.contents?.content}
                onChange={e => this.props.onChange("content", e.target.value)}
            />
        )
    }

    render() {
        switch (this.props.data.typeId) {
            case ElementTypeId.TextArea: return <this.TextArea />;
            case ElementTypeId.Image: return <this.Image />
            case ElementTypeId.Button: return <this.Button />
            case ElementTypeId.RichText: return <this.RichText />
        }
        return <this.Text />
    }
}