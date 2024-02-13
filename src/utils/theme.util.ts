import {IThemeKeys} from "types/themes";

const changeTheme = (theme: IThemeKeys) => {
    document.documentElement.setAttribute("data-theme", theme);
}

export default {
    changeTheme: changeTheme
}