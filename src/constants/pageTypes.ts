import {IPageType} from "types/constants/pageTypes";

export enum PageTypeId {
    Default = 1,
    HomePage,
    Blogs,
    Blog,
    Portfolios,
    Portfolio,
    Products,
    Product,
    Contact,
    ErrorPage404,
}

export const pageTypes: Array<IPageType> = [
    {id: PageTypeId.Default, rank: 1, langKey: "default"},
    {id: PageTypeId.HomePage, rank: 2, langKey: "homePage"},
    {id: PageTypeId.Blogs, rank: 3, langKey: "blogs"},
    {id: PageTypeId.Blog, rank: 4, langKey: "blog"},
    {id: PageTypeId.Portfolios, rank: 5, langKey: "portfolios"},
    {id: PageTypeId.Portfolio, rank: 6, langKey: "portfolio"},
    {id: PageTypeId.Products, rank: 7, langKey: "products"},
    {id: PageTypeId.Product, rank: 8, langKey: "product"},
    {id: PageTypeId.Contact, rank: 9, langKey: "contact"},
    {id: PageTypeId.ErrorPage404, rank: 10, langKey: "errorPage404"},
]
