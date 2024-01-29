import {PostTermTypeDocument} from "types/constants";

enum PostTermTypeId {
    Category = 1,
    Tag,
    Attributes,
    Variations
}

const PostTermTypes: Array<PostTermTypeDocument> = [
    {id: PostTermTypeId.Category, rank: 1, langKey: "category"},
    {id: PostTermTypeId.Tag, rank: 2, langKey: "tag"},
    {id: PostTermTypeId.Attributes, rank: 1, langKey: "attribute"},
    {id: PostTermTypeId.Variations, rank: 2, langKey: "variation"},
]

export {PostTermTypes, PostTermTypeId};
