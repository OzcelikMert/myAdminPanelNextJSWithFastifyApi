import React, { Component } from 'react';
import { IPagePropCommon } from 'types/pageProps';
import { UserRoleId, userRoles } from '@constants/userRoles';

type IPageState = {};

type IPageProps = {
  t: IPagePropCommon['t'];
  userRoleId: UserRoleId;
  className?: string;
};

export default class ComponentThemeBadgeUserRole extends Component<
  IPageProps,
  IPageState
> {
  render() {
    return (
      <label
        className={`badge badge-gradient-${getUserRoleColor(this.props.userRoleId)} text-start ${this.props.className ?? ''}`}
      >
        {this.props.t(
          userRoles.findSingle('id', this.props.userRoleId)?.langKey ??
            '[noLangAdd]'
        )}
      </label>
    );
  }
}

export function getUserRoleColor(roleId: UserRoleId): string {
  let className = ``;
  switch (roleId) {
    case UserRoleId.SuperAdmin:
      className = `dark`;
      break;
    case UserRoleId.Admin:
      className = `primary`;
      break;
    case UserRoleId.Editor:
      className = `danger`;
      break;
    case UserRoleId.Author:
      className = `success`;
      break;
    case UserRoleId.User:
      className = `info`;
      break;
  }
  return className;
}
