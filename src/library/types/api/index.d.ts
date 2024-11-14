import { AxiosProgressEvent } from 'axios';

export interface IApiRequestParam {
  endPoint?: string;
  apiUrl: string;
  data?: object;
  processData?: boolean;
  contentType?: string | false;
  onUploadProgress?: (e: AxiosProgressEvent, percent: number) => void;
  signal?: AbortSignal;
}

export type IApiRequestParamMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
