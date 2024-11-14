import React, { Component } from 'react';
import { Modal, Tab, Tabs } from 'react-bootstrap';
import PageGalleryList from '@pages/gallery/list';
import PageGalleryUpload from '@pages/gallery/upload';
import { IPagePropCommon } from 'types/pageProps';
import { IGalleryGetResultService } from 'types/services/gallery.service';

type IPageState = {
  formActiveKey: string;
  uploadedImages: IGalleryGetResultService[];
};

type IPageProps = {
  onClose: () => void;
  isShow: boolean;
  onSubmit: (images: string[]) => void;
  isMulti?: boolean;
  selectedImages?: string[];
} & IPagePropCommon;

class ComponentThemeChooseImageGallery extends Component<
  IPageProps,
  IPageState
> {
  constructor(props: IPageProps) {
    super(props);
    this.state = {
      formActiveKey: 'list',
      uploadedImages: [],
    };
  }

  render() {
    return (
      <Modal
        size="xl"
        centered
        fullscreen
        show={this.props.isShow}
        backdrop={true}
        onHide={() => {
          this.props.onClose();
        }}
      >
        <Modal.Header className="border-bottom-0">
          <div className="w-100 text-end">
            <button
              className="btn btn-gradient-dark"
              onClick={() => {
                this.props.onClose();
              }}
            >
              <i className="fa fa-close"></i>
            </button>
          </div>
        </Modal.Header>
        <Modal.Body className="m-0 p-0">
          <div className="card">
            <div className="card-body">
              <div className="theme-tabs">
                <Tabs
                  onSelect={(key: any) => this.setState({ formActiveKey: key })}
                  activeKey={this.state.formActiveKey}
                  className="mb-5"
                  transition={false}
                >
                  <Tab eventKey="upload" title={this.props.t('upload')}>
                    <PageGalleryUpload
                      {...this.props}
                      uploadedImages={(uploadedImages) =>
                        this.setState({ uploadedImages: uploadedImages })
                      }
                      isModal
                    />
                  </Tab>
                  <Tab eventKey="list" title={this.props.t('list')}>
                    <PageGalleryList
                      {...this.props}
                      isModal={true}
                      uploadedImages={this.state.uploadedImages}
                    />
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ComponentThemeChooseImageGallery;
