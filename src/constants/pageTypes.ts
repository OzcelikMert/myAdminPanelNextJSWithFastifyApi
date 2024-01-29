import {PageTypeDocument} from "types/constants/pageTypes";

enum PageTypeId {
    Default = 1,
    HomePage,
    Blogs,
    Contact
}

const PageTypes: Array<PageTypeDocument> = [
    {id: PageTypeId.Default, rank: 1, langKey: "default"},
    {id: PageTypeId.HomePage, rank: 2, langKey: "homePage"},
    {id: PageTypeId.Blogs, rank: 3, langKey: "blogs"},
    {id: PageTypeId.Contact, rank: 4, langKey: "contact"},
]

export {PageTypes, PageTypeId};
