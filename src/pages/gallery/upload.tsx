import React, { Component, createRef, RefObject } from 'react';
import { IPagePropCommon } from 'types/pageProps';
import { IUploadingFiles } from 'types/pages/gallery/upload';
import { GalleryService } from '@services/gallery.service';
import ComponentToast from '@components/elements/toast';
import Image from 'next/image';
import { IGalleryGetResultService } from 'types/services/gallery.service';

type IPageState = {
  isDragging: boolean;
  uploadingFiles: IUploadingFiles[];
};

type IPageProps = {
  isModal?: boolean;
  uploadedImages?: (images: IGalleryGetResultService[]) => void;
} & IPagePropCommon;

class PageGalleryUpload extends Component<IPageProps, IPageState> {
  refInputFile: RefObject<HTMLInputElement> = createRef();
  maxFileSize: number;
  abortController = new AbortController();

  constructor(props: IPageProps) {
    super(props);
    this.maxFileSize = Number(process.env.UPLOAD_FILE_SIZE ?? 1524000);
    this.state = {
      isDragging: false,
      uploadingFiles: [],
    };
  }

  componentDidMount() {
    if (!this.props.isModal) {
      this.setPageTitle();
      this.props.setStateApp({
        isPageLoading: false,
      });
    }
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  setPageTitle() {
    this.props.setBreadCrumb([this.props.t('gallery'), this.props.t('upload')]);
  }

  async uploadFiles() {
    for (const uploadingFile of this.state.uploadingFiles) {
      if (
        uploadingFile.progressValue === 100 ||
        uploadingFile.file.size > this.maxFileSize ||
        !uploadingFile.status
      )
        continue;

      const formData = new FormData();
      formData.append('image', uploadingFile.file, uploadingFile.file.name);

      const serviceResult = await GalleryService.add(
        formData,
        (e, percent) => {
          this.setState((state: IPageState) => {
            const findIndex = state.uploadingFiles.indexOfKey(
              'id',
              uploadingFile.id
            );
            if (findIndex > -1) {
              state.uploadingFiles[findIndex].progressValue = percent ?? 100;
            }
            return state;
          });
        },
        this.abortController.signal
      );

      if (serviceResult.status && serviceResult.data) {
        new ComponentToast({
          type: 'success',
          title: this.props.t('successful'),
          content: `${uploadingFile.file.name} ${this.props.t('imageUploadedWithName')}`,
          position: 'top-right',
          timeOut: 5,
        });
        if (this.props.uploadedImages) {
          this.props.uploadedImages(
            serviceResult.data.map((image) => ({
              ...image,
              authorId: {
                _id: this.props.getStateApp.sessionAuth!.user.userId,
                name: this.props.getStateApp.sessionAuth!.user.name,
                image: this.props.getStateApp.sessionAuth!.user.image,
                url: '',
              },
            }))
          );
        }
      }
    }
  }

  setUploadingFiles(files: FileList | null) {
    this.setState((state: IPageState) => {
      if (files != null && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          state.uploadingFiles.push({
            id: String.createId(),
            file: file,
            progressValue: file.size < this.maxFileSize ? 0 : 100,
            status: file.size < this.maxFileSize,
          });
        }
      }
      state.isDragging = false;
      return state;
    }, this.uploadFiles);
  }

  onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    this.setUploadingFiles(files);
  };

  onDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    this.setState({ isDragging: true });
  }

  onDragEnd(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    this.setState({ isDragging: false });
  }

  onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    this.setUploadingFiles(files);
  };

  onClearUploadedImages() {
    this.setState((state: IPageState) => {
      state.uploadingFiles = state.uploadingFiles.filter(
        (uploadingFile) =>
          uploadingFile.progressValue < 100 && uploadingFile.status
      );
      return state;
    });
  }

  UploadingItem = (props: IUploadingFiles) => {
    return (
      <div className="col-md-3 mt-1 mt-lg-2">
        <div className="row">
          <div className="col-4">
            <Image
              className="shadow-lg mb-1 img-fluid"
              src={URL.createObjectURL(props.file)}
              alt={props.file.name}
              width={75}
              height={75}
            />
          </div>
          <div className="col-8">
            <div className="row">
              <div className="col-md-12" title={props.file.name}>
                {props.file.name.length > 15
                  ? `${props.file.name.slice(0, 15)}...`
                  : props.file.name.length}
              </div>
              <div className="col-md-12 mt-2">
                {props.file.size > this.maxFileSize ? (
                  <b className="text-danger">{this.props.t('bigImageSize')}</b>
                ) : (
                  <div className="progress-lg progress">
                    <div
                      role="progressbar"
                      className="progress-bar bg-gradient-info"
                      style={{ width: `${props.progressValue}%` }}
                    >
                      {props.progressValue}%
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return this.props.getStateApp.isPageLoading ? null : (
      <div className="page-gallery">
        <div className="grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div
                className="upload-container"
                onDragOver={(event) => this.onDragOver(event)}
                onDragLeave={(event) => this.onDragEnd(event)}
                onDrop={(event) => this.onDrop(event)}
              >
                <div
                  className={`border-container text-center ${this.state.isDragging ? `bg-gradient-dark` : ``}`}
                >
                  <input
                    type="file"
                    ref={this.refInputFile}
                    hidden={true}
                    onChange={(event) => this.onChangeFile(event)}
                    multiple={true}
                    name="formData.image[]"
                    accept=".jpg,.png,.gif,.jpeg"
                  />
                  <div className="icons">
                    <i className="mdi mdi-image"></i>
                    <i className="mdi mdi-file"></i>
                    <i className="mdi mdi-file-cloud"></i>
                  </div>
                  <p
                    className="cursor-pointer"
                    onClick={() => this.refInputFile.current?.click()}
                  >
                    {this.props.t('dragAndDropHere')} (.jpg, .png, .gif)
                  </p>
                </div>
              </div>
              {this.state.uploadingFiles.length > 0 ? (
                <div className="row mt-5 ms-1">
                  {this.state.uploadingFiles.map((file, index) => (
                    <this.UploadingItem {...file} key={index} />
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PageGalleryUpload;
