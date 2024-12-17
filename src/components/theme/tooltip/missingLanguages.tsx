import React, { Component } from 'react';
import { ILanguageGetResultService } from 'types/services/language.service';
import ComponentToolTip from '@components/elements/tooltip';
import { IPagePropCommon } from 'types/pageProps';

interface IItemLanguages {
  langId: string;
}

type IPageState = {
  missingLanguages: ILanguageGetResultService[]
};

type IPageProps = {
  itemLanguages: IItemLanguages[] | IItemLanguages[][];
  contentLanguages: ILanguageGetResultService[];
  t: IPagePropCommon['t'];
  div?: boolean
  divClass?: string
};

export default class ComponentThemeToolTipMissingLanguages extends Component<
  IPageProps,
  IPageState
> {
  constructor(props: IPageProps) {
    super(props);
    this.state = {
      missingLanguages: []
    };
  }

  componentDidMount() {
    this.findMissingLanguages();   
  }

  findMissingLanguages() {
    let missingLanguages = this.props.contentLanguages.filter(contentLangugage => 
      !this.props.itemLanguages.some(itemLanguage => 
        Array.isArray(itemLanguage) 
          ? itemLanguage.every( itemLanguageSub => contentLangugage._id == itemLanguageSub.langId)
          : contentLangugage._id == itemLanguage.langId
      )
    );

    this.setState({
      missingLanguages: missingLanguages
    })
  }

  Icon = () => {
    return (
      <i className={`mdi mdi-alert-circle text-warning fs-4`}></i>
    );
  }

  render() {
    if(this.state.missingLanguages.length == 0){
      return null;
    }



    return (
      <ComponentToolTip message={this.props.t("warningAboutMissingLanguagesWithVariable").replace("{{missingLanguages}}", this.state.missingLanguages.map(missingLanguage => missingLanguage.locale.toUpperCase()).join(", "))}>
        {
          this.props.div
            ? <div className={`${this.props.divClass}`}><this.Icon /></div>
            : <span><this.Icon />{" "}</span>
        }
      </ComponentToolTip>
    );
  }
}
