import {IThemeKeys} from "types/constants/themeKeys";

const getLanguageId = () => {
    return Number((window.localStorage.getItem("adminLangId") ?? 1));
}

const setLanguageId = (langId: number) => {
    window.localStorage.setItem("adminLangId", langId.toString());
}

const getTheme = () => {
    return (window.localStorage.getItem("adminTheme") ?? "default") as IThemeKeys;
}

const setTheme = (theme: IThemeKeys) => {
    window.localStorage.setItem("adminTheme", theme);
}

export const LocalStorageUtil = {
    getLanguageId: getLanguageId,
    setLanguageId: setLanguageId,
    getTheme: getTheme,
    setTheme: setTheme,
}