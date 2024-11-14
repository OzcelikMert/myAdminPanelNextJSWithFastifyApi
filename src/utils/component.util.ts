import { IPagePropCommon } from 'types/pageProps';
import { StatusId, status } from '@constants/status';
import { UserRoleId, userRoles } from '@constants/userRoles';
import { ILanguage } from 'types/constants/languages';

const getStatusForSelect = (statusId: StatusId[], t: IPagePropCommon['t']) => {
  return status.findMulti('id', statusId).map((item) => ({
    value: item.id,
    label: t(item.langKey),
  }));
};

const getUserRolesForSelect = (
  roleId: UserRoleId[],
  t: IPagePropCommon['t']
) => {
  return userRoles.findMulti('id', roleId).map((item) => ({
    value: item.id,
    label: t(item.langKey),
  }));
};

const getPanelLanguageForSelect = (languages: ILanguage[]) => {
  return languages.map((language) => ({
    label: language.title,
    value: language.id.toString(),
  }));
};

export const ComponentUtil = {
  getStatusForSelect: getStatusForSelect,
  getUserRolesForSelect: getUserRolesForSelect,
  getPanelLanguageForSelect: getPanelLanguageForSelect,
};
