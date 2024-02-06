import {AxiosProgressEvent} from "axios";

export interface ApiRequestParamDocument {
    endPoints?: string[],
    apiUrl: string
    data?: object,
    processData?: boolean,
    contentType?: string | false
    onUploadProgress?: (e: AxiosProgressEvent, percent: number) => void
}

export type ApiRequestParamMethodDocument = "GET" | "POST" | "PUT" | "DELETE";