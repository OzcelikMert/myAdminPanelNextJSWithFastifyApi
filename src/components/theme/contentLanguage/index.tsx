import React, { Component } from 'react';
import { ComponentFormSelect } from '@components/elements/form';
import { IPagePropCommon } from 'types/pageProps';
import Image from 'next/image';
import { IThemeFormSelectValue } from '@components/elements/form/input/select';
import { PathUtil } from '@utils/path.util';
import { ILanguageGetResultService } from 'types/services/language.service';

export type IContentLanguage = {} & ILanguageGetResultService;

type IPageState = {};

type IPageProps = {
  t: IPagePropCommon['t'];
  languages: IContentLanguage[];
  selectedLanguage?: IContentLanguage;
  onChange: (item: IThemeFormSelectValue, e: any) => void;
};

export default class ComponentThemeContentLanguage extends Component<
  IPageProps,
  IPageState
> {

  Item = (props: IContentLanguage) => (
    <div className={`row p-0`}>
      <div className="col-6 text-end">
        <Image
          className="img-fluid"
          width={35}
          height={45}
          src={PathUtil.getFlagURL() + props.image}
          alt={props.shortKey}
        />
      </div>
      <div className="col-6 text-start content-language-title">
        <h6>{props.title} ({props.locale.toUpperCase()})</h6>
      </div>
    </div>
  );

  render() {
    return (
      <ComponentFormSelect
        title={this.props.t('contentLanguage')}
        isSearchable={false}
        options={this.props.languages.map((language) => ({
          label: <this.Item {...language} />,
          value: language._id,
        }))}
        value={
          this.props.selectedLanguage
            ? {
                label: <this.Item {...this.props.selectedLanguage} />,
                value: this.props.selectedLanguage._id,
              }
            : undefined
        }
        onChange={(item: any, e) => this.props.onChange(item, e)}
      />
    );
  }
}
