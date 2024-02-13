import React, {Component} from "react";
import {IPagePropCommon} from "types/pageProps";
import ThemeChooseImageGallery from "./gallery";

const emptyImage = require("images/empty.png");

type PageState = {};

type PageProps = {
    isShow: boolean
    onSelected: (images: string[]) => void
    isMulti?: boolean
    onHide: () => void
    selectedImages?: string[]
} & IPagePropCommon;

class ThemeChooseImage extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {}
    }

    onSelected(images: string[]) {
        this.props.onSelected(images);
        this.props.onHide();
    }

    render() {
        return (
            <ThemeChooseImageGallery
                {...this.props}
                isShow={this.props.isShow}
                onSubmit={images => this.onSelected(images)}
                onClose={() => this.props.onHide()}
            />
        )
    }
}

export default ThemeChooseImage;
export {
    emptyImage
}