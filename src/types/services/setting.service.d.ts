import {
  ISettingContactFormModel,
  ISettingModel,
  ISettingECommerceModel,
  ISettingSeoContentModel,
  ISettingSocialMediaModel,
  ISettingPathModel,
} from '../models/setting.model';
import { SettingProjectionKeys } from '@constants/settingProjections';

export interface ISettingSeoContentAlternateService {
  langId: string;
}

export type ISettingGetResultService = {
  seoContentAlternates?: ISettingSeoContentAlternateService[]
} & ISettingModel;

export type ISettingGetParamService = {
  langId?: string;
  projection?: SettingProjectionKeys;
};

export type ISettingUpdateGeneralParamService = {} & Omit<
  ISettingModel,
  'seoContents' | 'contactForms' | 'socialMedia' | 'paths'
>;

export type ISettingUpdateSEOParamService = {
  seoContents: ISettingSeoContentModel;
};

export type ISettingUpdateECommerceParamService = {
  eCommerce: ISettingECommerceModel;
};

export type ISettingUpdateContactFormParamService = {
  contactForms: ISettingContactFormModel[];
};

export type ISettingUpdateSocialMediaParamService = {
  socialMedia: ISettingSocialMediaModel[];
};

export type ISettingUpdatePathParamService = {
  paths: ISettingPathModel[];
};
