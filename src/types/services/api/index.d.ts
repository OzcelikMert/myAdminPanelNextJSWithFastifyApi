import {AxiosProgressEvent} from "axios";

interface ApiRequestParamDocument {
    url: (string | undefined)[],
    method?: ApiRequestParamMethodDocument,
    data?: object,
    processData?: boolean,
    contentType?: string | false
    onUploadProgress?: (e: AxiosProgressEvent, percent: number) => void
}

type ApiRequestParamMethodDocument = "GET" | "POST" | "PUT" | "DELETE";

export {
    ApiRequestParamDocument,
    ApiRequestParamMethodDocument
}