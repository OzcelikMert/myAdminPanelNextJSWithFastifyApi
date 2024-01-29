import ThemeKeys from "types/themes";

export default {
    changeTheme(theme: ThemeKeys){
        document.documentElement.setAttribute("data-theme", theme);
    }
}