import React, { Component } from 'react';
import { ComponentFormType } from '@components/elements/form';
import ComponentThemeChooseImage from '@components/theme/chooseImage';
import { IPagePropCommon } from 'types/pageProps';
import dynamic from 'next/dynamic';
import { IComponentElementModel } from 'types/models/component.model';
import { ElementTypeId } from '@constants/elementTypes';

const ComponentThemeRichTextBox = dynamic(
  () => import('@components/theme/richTextBox'),
  { ssr: false }
);

type IPageState = {} & { [key: string]: any };

type IPageProps = {
  data: Partial<IComponentElementModel>;
  onChange: (key: string, value: any) => void;
} & IPagePropCommon;

export default class ComponentPageComponentElementTypeInput extends Component<
  IPageProps,
  IPageState
> {
  constructor(props: IPageProps) {
    super(props);
    this.state = {};
  }

  TextArea = () => {
    return (
      <ComponentFormType
        type={'textarea'}
        title={this.props.t('text')}
        value={this.props.data.contents?.content}
        onChange={(e) => this.props.onChange('content', e.target.value)}
      />
    );
  };

  RichText = () => {
    return (
      <ComponentThemeRichTextBox
        {...this.props}
        value={this.props.data.contents?.content ?? ''}
        onChange={(e) => this.props.onChange('content', e)}
      />
    );
  };

  Image = () => {
    return (
      <div>
        <ComponentThemeChooseImage
          {...this.props}
          onSelected={(images) => this.props.onChange('content', images[0])}
          isMulti={false}
          isShowReviewImage={true}
          reviewImage={this.props.data.contents?.content}
          reviewImageClassName={'post-image'}
        />
      </div>
    );
  };

  Button = () => {
    return (
      <div className="row">
        <div className="col-md-6">
          <ComponentFormType
            type={'text'}
            title={this.props.t('text')}
            value={this.props.data.contents?.content}
            onChange={(e) => this.props.onChange('content', e.target.value)}
          />
        </div>
        <div className="col-md-6 mt-3 mt-lg-0">
          <ComponentFormType
            type={'text'}
            title={this.props.t('url')}
            value={this.props.data.contents?.url || ''}
            onChange={(e) => this.props.onChange('url', e.target.value)}
          />
        </div>
      </div>
    );
  };

  Text = () => {
    return (
      <ComponentFormType
        type={'text'}
        title={this.props.t('text')}
        value={this.props.data.contents?.content}
        onChange={(e) => this.props.onChange('content', e.target.value)}
      />
    );
  };

  render() {
    switch (this.props.data.typeId) {
      case ElementTypeId.TextArea:
        return <this.TextArea />;
      case ElementTypeId.Image:
        return <this.Image />;
      case ElementTypeId.Button:
        return <this.Button />;
      case ElementTypeId.RichText:
        return <this.RichText />;
    }
    return <this.Text />;
  }
}
