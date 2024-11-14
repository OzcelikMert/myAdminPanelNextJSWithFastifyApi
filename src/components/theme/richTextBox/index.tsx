import React, { Component, createRef } from 'react';
import JoditEditor, { Jodit as JoditReact } from 'jodit-react';
import ComponentThemeChooseImage from '@components/theme/chooseImage';
import { IPagePropCommon } from 'types/pageProps';
import { Config } from 'jodit/types/config';
import Spinner from 'react-bootstrap/Spinner';
import { ImageSourceUtil } from '@utils/imageSource.util';
import { IJodit } from 'jodit/types/types';

type IPageState = {
  value: string;
  config: Partial<Config>;
  isGalleryShow: boolean;
  isLoading: boolean;
};

type IPageProps = {
  value: string;
  onChange: (newContent: string) => void;
} & IPagePropCommon;

export default class ComponentThemeRichTextBox extends Component<
  IPageProps,
  IPageState
> {
  ref = createRef<JoditReact>();
  view: IJodit | null = null;

  constructor(props: IPageProps) {
    super(props);
    this.state = {
      value: this.props.value,
      isGalleryShow: false,
      isLoading: true,
      config: {
        extraIcons: {
          gallery: `<i class="mdi mdi-folder-multiple-image"></i>`,
        },
        useNativeTooltip: false,
        safeMode: false,
        activeButtonsInReadOnly: [
          'source',
          'fullsize',
          'print',
          'about',
          'dots',
        ],
        toolbarButtonSize: 'middle',
        theme: 'default',
        editorClassName: 'rich-text-box',
        triggerChangeEvent: true,
        editHTMLDocumentMode: true,
        defaultActionOnPaste: 'insert_clear_html',
        width: 'auto',
        height: '550px',
        direction: 'ltr',
        language: 'auto',
        toolbar: true,
        enter: 'p',
        useSplitMode: false,
        colorPickerDefaultTab: 'color',
        imageDefaultWidth: 300,
        removeButtons: [],
        disablePlugins: [],
        extraButtons: [{ name: 'chooseImage' }],
        controls: {
          chooseImage: {
            name: 'chooseImage',
            icon: 'gallery',
            text: 'Gallery Images',
            tooltip: 'Choose a image in gallery',
            exec: (view) => this.onClickChooseImage(view),
          },
        },
      },
    };
  }

  async componentDidMount() {
    this.setState({
      isLoading: false,
    });
  }

  async onClickChooseImage(view: any) {
    this.view = view;
    this.setState({
      isGalleryShow: true,
    });
  }

  onSelectedImage(images: string[]) {
    if (this.view) {
      for (const image of images) {
        this.view.selection.insertImage(
          ImageSourceUtil.getUploadedImageSrc(image)
        );
      }
    }
  }

  onHideGalleryModal() {
    this.setState({
      isGalleryShow: false,
    });
  }

  render() {
    return this.state.isLoading ? (
      <Spinner animation="border" />
    ) : (
      <div id={`themeRichTextBox_${String.createId()}`}>
        <ComponentThemeChooseImage
          {...this.props}
          onSelected={(images) => this.onSelectedImage(images)}
          isMulti={true}
          isShow={this.state.isGalleryShow}
          onHideModal={() => this.onHideGalleryModal()}
          hideShowModalButton={true}
        />
        <React.Fragment>
          {
            // @ts-ignore
            <JoditEditor
              ref={this.ref}
              value={this.state.value}
              config={this.state.config}
              onBlur={(newContent) =>
                this.props.onChange(this.ref.current?.value || '')
              }
            />
          }
        </React.Fragment>
      </div>
    );
  }
}
