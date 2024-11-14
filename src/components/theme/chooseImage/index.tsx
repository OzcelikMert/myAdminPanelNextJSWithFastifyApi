import React, { Component } from 'react';
import { IPagePropCommon } from 'types/pageProps';
import ComponentThemeChooseImageGallery from './gallery';
import Image from 'next/image';
import { ImageSourceUtil } from '@utils/imageSource.util';

type IPageState = {
  isShowModal: boolean;
};

type IPageProps = {
  isShow?: boolean;
  onHideModal?: () => void;
  onSelected: (images: string[]) => void;
  isMulti?: boolean;
  selectedImages?: string[];
  isShowReviewImage?: boolean;
  reviewImage?: string;
  reviewImageClassName?: string;
  reviewImageWidth?: number;
  reviewImageHeight?: number;
  showModalButtonText?: string | JSX.Element;
  showModalButtonOnClick?: () => void;
  hideShowModalButton?: boolean;
} & IPagePropCommon;

class ComponentThemeChooseImage extends Component<IPageProps, IPageState> {
  constructor(props: IPageProps) {
    super(props);
    this.state = {
      isShowModal: false,
    };
  }

  onSelected(images: string[]) {
    this.props.onSelected(images);
    this.onHide();
  }

  onClickClear() {
    this.props.onSelected([]);
  }

  onHide() {
    this.setState(
      {
        isShowModal: false,
      },
      () => {
        if (this.props.onHideModal) {
          this.props.onHideModal();
        }
      }
    );
    const $html = document.querySelector('html');
    if ($html) {
      $html.style.overflow = 'unset';
    }
  }

  onClickShow() {
    this.setState(
      {
        isShowModal: true,
      },
      () => {
        if (this.props.showModalButtonOnClick) {
          this.props.showModalButtonOnClick();
        }
      }
    );
    const $html = document.querySelector('html');
    if ($html) {
      $html.style.overflow = 'hidden';
    }
  }

  render() {
    return (
      <div className="choose-images d-flex flex-row align-items-center">
        <ComponentThemeChooseImageGallery
          {...this.props}
          isShow={
            typeof this.props.isShow != 'undefined'
              ? this.props.isShow
              : this.state.isShowModal
          }
          onSubmit={(images) => this.onSelected(images)}
          onClose={() => this.onHide()}
        />
        {this.props.isShowReviewImage ? (
          <Image
            src={ImageSourceUtil.getUploadedImageSrc(this.props.reviewImage)}
            alt="Review Image"
            className={`review-img img-fluid ${this.props.reviewImageClassName}`}
            width={this.props.reviewImageWidth ?? 150}
            height={this.props.reviewImageHeight ?? 150}
          />
        ) : null}
        <div className="buttons">
          {!this.props.hideShowModalButton ? (
            <button
              type="button"
              className="btn btn-gradient-warning btn-xs ms-2"
              onClick={() => this.onClickShow()}
            >
              {this.props.showModalButtonText ? (
                <i>{this.props.showModalButtonText}</i>
              ) : (
                <i className="fa fa-pencil-square-o"></i>
              )}
            </button>
          ) : null}
          {this.props.selectedImages && this.props.selectedImages.length > 0 ? (
            <button
              type="button"
              className="btn btn-gradient-danger btn-xs ms-2"
              onClick={() => this.onClickClear()}
            >
              <i className="fa fa-remove"></i>
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}

export default ComponentThemeChooseImage;
