import type {AppProps} from 'next/app'
import React from "react";
import {LanguageId, Languages} from "constants/languages";
import localStorageUtil from "utils/localStorage.util";
import i18n from "i18next";
import {initReactI18next} from "react-i18next";

import "styles/global.scss";

import "library/variable/array"
import "library/variable/string"
import "library/variable/number"
import "library/variable/date"
import "library/variable/math"

import ComponentApp from "components/app";

import English from "languages/en.json"
import Turkish from "languages/tr.json"
import ProviderNoSSR from "components/providers/noSSR.provider";
import themeUtil from "utils/theme.util";

if(typeof window !== "undefined") {
    const language = i18n.use(initReactI18next);

    language.init({
        resources: {
            en: {translation: English},
            tr: {translation: Turkish}
        },
        keySeparator: false,
        lng: Languages.findSingle("id", localStorageUtil.getLanguage())?.code || window.navigator.language.slice(0, 2) || Languages[0].code,
        fallbackLng: Languages.findSingle("id", LanguageId.English)?.code || Languages[0].code,
        interpolation: {
            escapeValue: false
        }
    });

    themeUtil.changeTheme(localStorageUtil.getTheme());
}

function App(props: AppProps) {
    return (
        <ProviderNoSSR>
            <ComponentApp {...props} />
        </ProviderNoSSR>
    )
}

export default App;