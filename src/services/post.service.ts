import Api from "./api";
import {ServicePages} from "constants/index";
import {
    PostAddParamDocument,
    PostDeleteManyParamDocument,
    PostGetCountParamDocument,
    PostGetManyParamDocument, PostGetManyResultDocument,
    PostGetOneParamDocument, PostGetOneResultDocument,
    PostUpdateManyStatusIdParamDocument,
    PostUpdateOneParamDocument,
    PostUpdateOneRankParamDocument,
    PostUpdateOneViewParamDocument
} from "types/services/post";

export default {
    getOne(params: PostGetOneParamDocument){
        return Api.get<PostGetOneResultDocument | null>({
            url: [ServicePages.post, "one", params.typeId.toString()],
            data: params
        });
    },
    getMany(params: PostGetManyParamDocument){
        return Api.get<PostGetManyResultDocument[]>({
            url: [ServicePages.post, "many"],
            data: params
        });
    },
    getCount(params: PostGetCountParamDocument){
        return Api.get<number>({
            url: [ServicePages.post, params.typeId.toString()],
            data: params
        });
    },
    add(params: PostAddParamDocument) {
        return Api.post({
            url: [ServicePages.post, "one", params.typeId.toString()],
            data: params
        });
    },
    updateOne(params: PostUpdateOneParamDocument) {
        return Api.put({
            url: [ServicePages.post, "one", params.typeId.toString(), params._id.toString()],
            data: params
        });
    },
    updateOneRank(params: PostUpdateOneRankParamDocument) {
        return Api.put({
            url: [ServicePages.post, "one", params.typeId.toString(), params._id.toString(), "rank"],
            data: params
        });
    },
    updateOneView(params: PostUpdateOneViewParamDocument) {
        return Api.put({
            url: [ServicePages.post, "one", params.typeId.toString(), params._id.toString(), "view"],
            data: params
        });
    },
    updateManyStatus(params: PostUpdateManyStatusIdParamDocument) {
        return Api.put({
            url: [ServicePages.post, "many", params.typeId.toString(), "status"],
            data: params
        });
    },
    deleteMany(params: PostDeleteManyParamDocument) {
        return Api.delete({
            url: [ServicePages.post, "many", params.typeId.toString()],
            data: params
        });
    },
}