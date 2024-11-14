import React, { Component } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import ComponentThemeChooseImage from '@components/theme/chooseImage';
import Image from 'next/image';
import PagePostAdd, {
  IPageState as PostPageState,
} from '@pages/post/[postTypeId]/add';
import ComponentFieldSet from '@components/elements/fieldSet';
import { ImageSourceUtil } from '@utils/imageSource.util';

type IPageState = {
  mainTabActiveKey: string;
};

type IPageProps = {
  page: PagePostAdd;
};

export default class ComponentPagePostAddBeforeAndAfter extends Component<
  IPageProps,
  IPageState
> {
  constructor(props: IPageProps) {
    super(props);
    this.state = {
      mainTabActiveKey: 'general',
    };
  }

  onChange(data: any, key: any, value: any) {
    this.props.page.setState((state: PostPageState) => {
      data[key] = value;
      return state;
    });
  }

  TabGallery = () => {
    return (
      <div className="row">
        <div className="col-md-7 mb-3">
          <ComponentThemeChooseImage
            {...this.props.page.props}
            onSelected={(images) =>
              this.props.page.setState((state: PostPageState) => {
                if (state.formData.beforeAndAfter)
                  state.formData.beforeAndAfter.images = images;
                return state;
              })
            }
            isMulti={true}
            selectedImages={
              this.props.page.state.formData.beforeAndAfter?.images
            }
            showModalButtonText={this.props.page.props.t('gallery')}
          />
        </div>
        <div className="col-md-12 mb-3">
          <div className="row">
            {this.props.page.state.formData.beforeAndAfter?.images.map(
              (image) => (
                <div className="col-md-3 mb-3">
                  <Image
                    src={ImageSourceUtil.getUploadedImageSrc(image)}
                    alt="Empty Image"
                    className="post-image img-fluid"
                    width={100}
                    height={100}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  };

  TabOptions = () => {
    return (
      <div className="row">
        <div className="col-md-7 mb-3">
          <ComponentFieldSet legend={this.props.page.props.t('imageBefore')}>
            <ComponentThemeChooseImage
              {...this.props.page.props}
              onSelected={(images) =>
                this.props.page.setState((state: PostPageState) => {
                  if (state.formData.beforeAndAfter)
                    state.formData.beforeAndAfter.imageBefore = images[0];
                  return state;
                })
              }
              isMulti={false}
              selectedImages={
                this.props.page.state.formData.beforeAndAfter?.imageBefore
                  ? [this.props.page.state.formData.beforeAndAfter.imageBefore]
                  : undefined
              }
              isShowReviewImage={true}
              reviewImage={
                this.props.page.state.formData.beforeAndAfter?.imageBefore
              }
              reviewImageClassName={'post-image'}
            />
          </ComponentFieldSet>
        </div>
        <div className="col-md-7 mb-3">
          <ComponentFieldSet legend={this.props.page.props.t('imageAfter')}>
            <ComponentThemeChooseImage
              {...this.props.page.props}
              onSelected={(images) =>
                this.props.page.setState((state: PostPageState) => {
                  if (state.formData.beforeAndAfter)
                    state.formData.beforeAndAfter.imageAfter = images[0];
                  return state;
                })
              }
              isMulti={false}
              selectedImages={
                this.props.page.state.formData.beforeAndAfter?.imageAfter
                  ? [this.props.page.state.formData.beforeAndAfter.imageAfter]
                  : undefined
              }
              isShowReviewImage={true}
              reviewImage={
                this.props.page.state.formData.beforeAndAfter?.imageAfter
              }
              reviewImageClassName={'post-image'}
            />
          </ComponentFieldSet>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="grid-margin stretch-card">
        <div className="card">
          <div className="card-header text-center pt-3">
            <h4>{this.props.page.props.t('beforeAndAfter')}</h4>
          </div>
          <div className="card-body">
            <div className="theme-tabs">
              <Tabs
                onSelect={(key: any) =>
                  this.setState({ mainTabActiveKey: key })
                }
                activeKey={this.state.mainTabActiveKey}
                className="mb-5"
                transition={false}
              >
                <Tab
                  eventKey="general"
                  title={this.props.page.props.t('general')}
                >
                  <this.TabOptions />
                </Tab>
                <Tab
                  eventKey="gallery"
                  title={this.props.page.props.t('gallery')}
                >
                  <this.TabGallery />
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
