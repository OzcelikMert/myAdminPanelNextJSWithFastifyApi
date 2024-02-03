import Api from "./api";
import {ApiEndPoints} from "constants/index";
import  {
    PostTermGetResultDocument,
    PostTermUpdateManyStatusIdParamDocument,
    PostTermUpdateOneRankParamDocument,
    PostTermAddParamDocument,
    PostTermGetManyParamDocument,
    PostTermUpdateOneParamDocument,
    PostTermGetOneParamDocument,
    PostTermDeleteManyParamDocument
} from "types/services/postTerm";
import {PostTermApiEndPoint} from "constants/apiEndPoints/postTerm.api.endPoint";

const getOne = (params: PostTermGetOneParamDocument) => {
    return Api.get<PostTermGetResultDocument | null>({
        url: [ApiEndPoints.POST_TERM, PostTermApiEndPoint.GET_WITH_ID(params._id)],
        data: params
    });
}

const getMany = (params: PostTermGetManyParamDocument) => {
    return Api.get<PostTermGetResultDocument[]>({
        url: [ApiEndPoints.POST_TERM, PostTermApiEndPoint.GET],
        data: params
    });
}

const add = (params: PostTermAddParamDocument) => {
    return Api.post<{_id: string}>({
        url: [ApiEndPoints.POST_TERM, PostTermApiEndPoint.ADD],
        data: params
    });
}

const updateOne = (params: PostTermUpdateOneParamDocument) => {
    return Api.put({
        url: [ApiEndPoints.POST_TERM, PostTermApiEndPoint.UPDATE_WITH_ID(params._id)],
        data: params
    });
}

const updateOneRank = (params: PostTermUpdateOneRankParamDocument) => {
    return Api.put({
        url: [ApiEndPoints.POST_TERM, PostTermApiEndPoint.UPDATE_RANK_WITH_ID(params._id)],
        data: params
    });
}

const updateManyStatus = (params: PostTermUpdateManyStatusIdParamDocument) => {
    return Api.put({
        url: [ApiEndPoints.POST_TERM, PostTermApiEndPoint.UPDATE_STATUS],
        data: params
    });
}

const deleteMany = (params: PostTermDeleteManyParamDocument) => {
    return Api.delete({
        url: [ApiEndPoints.POST_TERM, PostTermApiEndPoint.DELETE],
        data: params
    });
}

export default {
    getOne: getOne,
    getMany: getMany,
    add: add,
    updateOne: updateOne,
    updateOneRank: updateOneRank,
    updateManyStatus: updateManyStatus,
    deleteMany: deleteMany,
}