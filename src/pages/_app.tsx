import type { AppProps } from 'next/app';
import React from 'react';
import { LanguageId, languages } from '@constants/languages';
import { LocalStorageUtil } from '@utils/localStorage.util';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import '@styles/global.scss';

import '@library/variable/array';
import '@library/variable/string';
import '@library/variable/number';
import '@library/variable/date';
import '@library/variable/math';

import ComponentApp from '@components/app';

import English from 'languages/en.json';
import Turkish from 'languages/tr.json';
import ComponentProviderNoSSR from '@components/providers/noSSR';
import { ThemeUtil } from '@utils/theme.util';

if (typeof window !== 'undefined') {
  const language = i18n.use(initReactI18next);

  language.init({
    resources: {
      en: { translation: English },
      tr: { translation: Turkish },
    },
    keySeparator: false,
    lng:
      languages.findSingle('id', LocalStorageUtil.getLanguageId())?.code ||
      window.navigator.language.slice(0, 2) ||
      languages[0].code,
    fallbackLng:
      languages.findSingle('id', LanguageId.English)?.code || languages[0].code,
    interpolation: {
      escapeValue: false,
    },
  });

  ThemeUtil.changeTheme(LocalStorageUtil.getTheme());
}

function App(props: AppProps) {
  return (
    <ComponentProviderNoSSR>
      <ComponentApp {...props} />
    </ComponentProviderNoSSR>
  );
}

export default App;
