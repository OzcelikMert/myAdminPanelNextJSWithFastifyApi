import React, { Component } from 'react';
import { IPagePropCommon } from 'types/pageProps';
import { PageTypeId, pageTypes } from '@constants/pageTypes';

type IPageState = {};

type IPageProps = {
  t: IPagePropCommon['t'];
  typeId: PageTypeId;
  className?: string;
};

export default class ComponentThemeBadgePageType extends Component<
  IPageProps,
  IPageState
> {
  render() {
    return (
      <label
        className={`badge badge-gradient-${getPageTypeColor(this.props.typeId)} text-start ${this.props.className ?? ''}`}
      >
        {this.props.t(
          pageTypes.findSingle('id', this.props.typeId)?.langKey ??
            '[noLangAdd]'
        )}
      </label>
    );
  }
}

export function getPageTypeColor(typeId: PageTypeId): string {
  let className = ``;
  switch (typeId) {
    case PageTypeId.Default:
      className = `dark`;
      break;
    case PageTypeId.Home:
      className = `primary`;
      break;
    case PageTypeId.Contact:
      className = `info`;
      break;
    case PageTypeId.Blogs:
    case PageTypeId.Portfolios:
    case PageTypeId.Products:
      className = `warning`;
      break;
  }
  return className;
}
