import {ApiRequestParamDocument} from "types/services/api";
import ServiceResultDocument from "types/services/api/result";
import ApiRequest from "./request";

const Api = {
    get<T = any, P = any>(params: ApiRequestParamDocument): Promise<ServiceResultDocument<T, P>> {
        return new Promise(resolve => {
            new ApiRequest({
                ...params,
                method: "GET"
            }).init().then(resData => {
                resolve(resData)
            })
        });
    },
    post<T = any, P = any>(params: ApiRequestParamDocument): Promise<ServiceResultDocument<T, P>> {
        return new Promise(resolve => {
            new ApiRequest({
                ...params,
                method: "POST"
            }).init().then(resData => {
                resolve(resData)
            })
        });
    },
    put<T = any, P = any>(params: ApiRequestParamDocument): Promise<ServiceResultDocument<T, P>> {
        return new Promise(resolve => {
            new ApiRequest({
                ...params,
                method: "PUT"
            }).init().then(resData => {
                resolve(resData)
            })
        })
    },
    delete<T = any, P = any>(params: ApiRequestParamDocument): Promise<ServiceResultDocument<T, P>> {
        return new Promise(resolve => {
            new ApiRequest({
                ...params,
                method: "DELETE"
            }).init().then(resData => {
                resolve(resData)
            })
        });
    }
}

export default Api;