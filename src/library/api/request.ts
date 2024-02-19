import {ApiRequestParamDocument, ApiRequestParamMethodDocument} from "library/types/api";
import axios from "axios";
import {ApiTimeouts} from "library/api/timeouts";
import {ApiResult} from "library/api/result";

class ApiRequest {
    constructor(params: ApiRequestParamDocument) {
        this.params = params;
    }

    private params: ApiRequestParamDocument;

    private getApiUrl(): string {
        let apiUrl = this.params.apiUrl;
        if(this.params.endPoint){
            apiUrl += this.params.endPoint;
        }
        return apiUrl;
    }

    private async request<Data = any, CustomData = any>(method: ApiRequestParamMethodDocument) {
        let apiResult = new ApiResult<Data, CustomData>();

        try {
            let resData = await axios.request({
                url: this.getApiUrl(),
                ...(method === "GET" ? {params: this.params.data} : {data: this.params.data}),
                method: method,
                withCredentials: true,
                timeout: ApiTimeouts.verySlow,
                onUploadProgress: (e) => {
                    var percentComplete = Math.round((e.loaded * 100) / (e.total ?? 1))
                    if (typeof this.params.onUploadProgress !== "undefined") {
                        this.params.onUploadProgress(e, percentComplete);
                    }
                },
            });
            apiResult = resData.data as ApiResult;
        }catch (e: any) {
            if(e.response && e.response.data){
                apiResult = e.response.data;
            }
            apiResult.status = false;
            apiResult.customData = e;
        }

        return apiResult;
    }

    async get<Data = any, CustomData = any>() {
        return await this.request<Data, CustomData>("GET");
    }

    async post<Data = any, CustomData = any>() {
        return await this.request<Data, CustomData>("POST");
    }

    async put<Data = any, CustomData = any>() {
        return await this.request<Data, CustomData>("PUT");
    }

    async delete<Data = any, CustomData = any>() {
        return await this.request<Data, CustomData>("DELETE");
    }
}

export default ApiRequest;