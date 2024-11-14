import { IPageType } from 'types/constants/pageTypes';

export enum PageTypeId {
  Default = 1,
  Home,
  Blogs,
  Portfolios,
  Products,
  Contact,
}

export const pageTypes: Array<IPageType> = [
  { id: PageTypeId.Default, rank: 1, langKey: 'default' },
  { id: PageTypeId.Home, rank: 2, langKey: 'homePage' },
  { id: PageTypeId.Blogs, rank: 3, langKey: 'blogs' },
  { id: PageTypeId.Portfolios, rank: 4, langKey: 'portfolios' },
  { id: PageTypeId.Products, rank: 5, langKey: 'products' },
  { id: PageTypeId.Contact, rank: 6, langKey: 'contact' },
];
