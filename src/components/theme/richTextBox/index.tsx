import React, {Component} from 'react'
import JoditEditor, {Jodit} from "jodit-react";
import {IJodit} from "jodit/index";
import ComponentThemeChooseImage from "components/theme/chooseImage";
import {IPagePropCommon} from "types/pageProps";
import {Config} from "jodit/types/config";
import Spinner from "react-bootstrap/Spinner";
import {ImageSourceUtil} from "utils/imageSource.util";

type IPageState = {
    value: string
    config: Partial<Config>
    isGalleryShow: boolean
    isLoading: boolean
};

type IPageProps = {
    value: string,
    onChange: (newContent: string) => void
} & IPagePropCommon;

export default class ComponentThemeRichTextBox extends Component<IPageProps, IPageState> {
    editor: IJodit | null;

    constructor(props: IPageProps) {
        super(props);
        this.editor = null;
        this.state = {
            value: this.props.value,
            isGalleryShow: false,
            isLoading: true,
            config: {
                safeMode: false,
                activeButtonsInReadOnly: ['source', 'fullsize', 'print', 'about', 'dots'],
                toolbarButtonSize: 'middle',
                theme: 'default',
                editorCssClass: "rich-text-box",
                triggerChangeEvent: true,
                editHTMLDocumentMode: true,
                defaultActionOnPaste: "insert_clear_html",
                enableDragAndDropFileToEditor: false,
                width: 'auto',
                height: '550px',
                direction: '',
                language: 'auto',
                toolbar: true,
                enter: "p",
                defaultMode: Jodit.constants.MODE_WYSIWYG,
                useSplitMode: false,
                colorPickerDefaultTab: 'background',
                imageDefaultWidth: 300,
                removeButtons: [],
                disablePlugins: [],
                extraButtons: ["chooseImage"],
            }
        }
    }

    async componentDidMount() {
        await this.initEditorControls();
        this.setState({
            isLoading: false
        })
    }

    async initEditorControls() {
        let self = this;

        Jodit.defaultOptions.controls.uploadImage = {
            name: "chooseImage",
            icon: "image",
            exec: (async (editor) => {
                self.editor = editor as IJodit;
                self.setState({
                    isGalleryShow: true
                })
            })
        }
    }

    render() {
        return this.state.isLoading ? <Spinner animation="border"/> : (
            <div id={`themeRichTextBox_${String.createId()}`}>
                <ComponentThemeChooseImage
                    {...this.props}
                    isShow={this.state.isGalleryShow}
                    onHide={() => this.setState({isGalleryShow: false})}
                    onSelected={images => {
                        if (this.editor) {
                            for (let image of images) {
                                this.editor.selection.insertImage(ImageSourceUtil.getUploadedImageSrc(image));
                                this.editor.synchronizeValues();
                            }
                        }
                    }}
                    isMulti={true}
                />
                <React.Fragment>
                    {
                        // @ts-ignore
                        <JoditEditor
                            value={this.state.value}
                            config={this.state.config}
                            onBlur={newContent => this.props.onChange(newContent)}
                        />
                    }
                </React.Fragment>
            </div>
        )
    }
}
