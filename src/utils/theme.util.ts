import { IThemeKeys } from 'types/constants/themeKeys';

const changeTheme = (theme: IThemeKeys) => {
  document.documentElement.setAttribute('data-theme', theme);
};

export const ThemeUtil = {
  changeTheme: changeTheme,
};
