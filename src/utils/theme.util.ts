import ThemeKeys from "types/themes";

const changeTheme = (theme: ThemeKeys) => {
    document.documentElement.setAttribute("data-theme", theme);
}

export default {
    changeTheme: changeTheme
}