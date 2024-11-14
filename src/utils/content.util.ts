import { IGetStateAppData } from 'types/pages/_app';

export type IAlternate = {
  langId: string;
};

const checkAlternates = (
  contentLanguages: IGetStateAppData['contentLanguages'],
  alternates?: IAlternate[]
) => {
  return contentLanguages.every((contentLanguage) =>
    alternates?.some((alternate) => alternate.langId == contentLanguage._id)
  );
};

const findMissingContentLanguages = (
  contentLanguages: IGetStateAppData['contentLanguages'],
  alternates?: IAlternate[]
) => {
  const missingContentLanguages: IGetStateAppData['contentLanguages'] = [];

  for (const contentLanguage of contentLanguages) {
    if (
      !alternates?.some((alternate) => alternate.langId == contentLanguage._id)
    ) {
      missingContentLanguages.push(contentLanguage);
    }
  }

  return missingContentLanguages;
};

export const ContentUtil = {
  checkAlternates: checkAlternates,
  findMissingContentLanguages: findMissingContentLanguages,
};
