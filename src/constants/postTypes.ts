import { IPostType } from 'types/constants/postTypes';

export enum PostTypeId {
  Blog = 1,
  Portfolio,
  Page,
  Slider,
  Reference,
  Service,
  Testimonial,
  Product,
  BeforeAndAfter,
}

export const postTypes: Array<IPostType> = [
  { id: PostTypeId.Blog, rank: 1, langKey: 'blogs' },
  { id: PostTypeId.Portfolio, rank: 2, langKey: 'portfolios' },
  { id: PostTypeId.Page, rank: 3, langKey: 'pages' },
  { id: PostTypeId.Slider, rank: 4, langKey: 'sliders' },
  { id: PostTypeId.Reference, rank: 5, langKey: 'references' },
  { id: PostTypeId.Service, rank: 6, langKey: 'services' },
  { id: PostTypeId.Testimonial, rank: 7, langKey: 'testimonials' },
  { id: PostTypeId.Product, rank: 9, langKey: 'product' },
  { id: PostTypeId.BeforeAndAfter, rank: 10, langKey: 'beforeAndAfter' },
];
