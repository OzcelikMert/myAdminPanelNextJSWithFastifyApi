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
        if(this.params.endPoints){
            this.params.endPoints.forEach(endPoint => {
                apiUrl += endPoint + "/";
            });
        }
        return apiUrl.removeLastChar();
    }

    private async request(method: ApiRequestParamMethodDocument) : Promise<ApiResult> {
        let apiResult = new ApiResult();

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

    async get<Data = any, CustomData = any>(): Promise<ApiResult<Data, CustomData>> {
        return await this.request("GET");
    }

    async post<Data = any, CustomData = any>(): Promise<ApiResult<Data, CustomData>> {
        return await this.request("POST");
    }

    async put<Data = any, CustomData = any>(): Promise<ApiResult<Data, CustomData>> {
        return await this.request("PUT");
    }

    async delete<Data = any, CustomData = any>(): Promise<ApiResult<Data, CustomData>> {
        return await this.request("DELETE");
    }
}

export default ApiRequest;