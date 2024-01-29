import {ErrorCodes, Timeouts} from "library/api";
import {ApiRequestParamDocument} from "types/services/api";
import ServiceResultDocument from "types/services/api/result";
import axios from "axios";
import pathUtil from "utils/path.util";

class ApiRequest {
    constructor(params: ApiRequestParamDocument) {
        this.params = params;
        this.result = {
            data: [],
            customData: null,
            status: true,
            message: "",
            errorCode: ErrorCodes.success,
            statusCode: 200,
            source: ""
        };
    }

    private params: ApiRequestParamDocument;
    private result: ServiceResultDocument<any>;

    private getApiUrl(): string {
        let apiUrl = pathUtil.api;
        this.params.url.forEach(url => {
            if(url) {
                apiUrl += url + "/";
            }
        })
        console.log(this.params.method, apiUrl.removeLastChar())
        return apiUrl.removeLastChar();
    }

    private async request(resolve: (value: any) => void) {
        try {
            let resData = await axios.request({
                url: this.getApiUrl(),
                ...(this.params.method === "GET" ? {params: this.params.data} : {data: this.params.data}),
                method: this.params.method,
                withCredentials: true,
                timeout: Timeouts.verySlow,
                onUploadProgress: (e) => {
                    var percentComplete = Math.round((e.loaded * 100) / (e.total ?? 1))
                    if (typeof this.params.onUploadProgress !== "undefined") {
                        this.params.onUploadProgress(e, percentComplete);
                    }
                },
            });
            this.result = resData.data;
        }catch (e: any) {
            this.result.status = false;
            this.result.customData = e;
            if(e.response && e.response.data){
                this.result = e.response.data;
            }
        }finally {
            resolve(this.result);
        }
    }

    async init() : Promise<ServiceResultDocument<any>> {
        return new Promise( resolve => {
            this.request(resolve);
        })
    }
}

export default ApiRequest;