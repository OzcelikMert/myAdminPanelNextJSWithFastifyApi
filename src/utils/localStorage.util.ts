import {IThemeKeys} from "types/themes";

const getLanguage = () => {
    return Number((window.localStorage.getItem("adminLanguage") ?? 1));
}

const setLanguage = (langId: number) => {
    window.localStorage.setItem("adminLanguage", langId.toString());
}

const getTheme = () => {
    return (window.localStorage.getItem("adminTheme") ?? "default") as IThemeKeys;
}

const setTheme = (theme: IThemeKeys) => {
    window.localStorage.setItem("adminTheme", theme);
}

export const LocalStorageUtil = {
    getLanguage: getLanguage,
    setLanguage: setLanguage,
    getTheme: getTheme,
    setTheme: setTheme,
}