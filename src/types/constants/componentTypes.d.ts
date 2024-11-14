import { ILanguageKeys } from './languageKeys';
import { ComponentTypeId } from '@constants/componentTypes';

export interface IComponentType {
  id: ComponentTypeId;
  langKey: ILanguageKeys;
}
