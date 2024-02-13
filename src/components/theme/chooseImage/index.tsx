import React, {Component} from "react";
import {IPagePropCommon} from "types/pageProps";
import ComponentThemeChooseImageGallery from "./gallery";

const emptyImage = require("images/empty.png");

type IPageState = {};

type IPageProps = {
    isShow: boolean
    onSelected: (images: string[]) => void
    isMulti?: boolean
    onHide: () => void
    selectedImages?: string[]
} & IPagePropCommon;

class ComponentThemeChooseImage extends Component<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
        this.state = {}
    }

    onSelected(images: string[]) {
        this.props.onSelected(images);
        this.props.onHide();
    }

    render() {
        return (
            <ComponentThemeChooseImageGallery
                {...this.props}
                isShow={this.props.isShow}
                onSubmit={images => this.onSelected(images)}
                onClose={() => this.props.onHide()}
            />
        )
    }
}

export default ComponentThemeChooseImage;
export {
    emptyImage
}