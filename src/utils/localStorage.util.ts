import ThemeKeys from "types/themes";

export default {
    adminLanguage: {
        get get() {
            return Number((window.localStorage.getItem("adminLanguage") ?? 1));
        },
        set: (langId: number) => {
            window.localStorage.setItem("adminLanguage", langId.toString());
        }
    },
    adminTheme: {
        get get() {
            return (window.localStorage.getItem("adminTheme") ?? "default") as ThemeKeys;
        },
        set: (theme: ThemeKeys) => {
            window.localStorage.setItem("adminTheme", theme);
        }
    }
}