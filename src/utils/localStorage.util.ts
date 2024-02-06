import ThemeKeys from "types/themes";

const getLanguage = () => {
    return Number((window.localStorage.getItem("adminLanguage") ?? 1));
}

const setLanguage = (langId: number) => {
    window.localStorage.setItem("adminLanguage", langId.toString());
}

const getTheme = () => {
    return (window.localStorage.getItem("adminTheme") ?? "default") as ThemeKeys;
}

const setTheme = (theme: ThemeKeys) => {
    window.localStorage.setItem("adminTheme", theme);
}

export default {
    getLanguage: getLanguage,
    setLanguage: setLanguage,
    getTheme: getTheme,
    setTheme: setTheme,
}