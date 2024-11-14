import { ApiEndPoints } from '@constants/apiEndPoints';
import { IServerInfoGetResultService } from 'types/services/serverInfo.service';
import { ApiRequest } from '@library/api/request';
import { PathUtil } from '@utils/path.util';

const get = (signal?: AbortSignal) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.SERVER_INFO_WITH.GET,
    signal: signal,
  }).get<IServerInfoGetResultService>();
};

export const ServerInfoService = {
  get: get,
};
