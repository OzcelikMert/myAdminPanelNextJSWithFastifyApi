import { ApiErrorCodes } from './errorCodes';
import { ApiStatusCodes } from './statusCodes';

export class ApiResult<Data = any[], CustomData = null> {
  constructor(
    data: any = [],
    customData: any = null,
    status: boolean = false,
    message: any = '',
    errorCode: ApiErrorCodes = ApiErrorCodes.incorrectData,
    statusCode: ApiStatusCodes = ApiStatusCodes.conflict,
    source: string = ''
  ) {
    this.data = data;
    this.customData = customData;
    this.status = status;
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.source = source;
  }

  data?: Data | null;
  customData?: CustomData;
  status: boolean;
  message: any;
  errorCode: ApiErrorCodes;
  statusCode: ApiStatusCodes;
  source: string;
}
