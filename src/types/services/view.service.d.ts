export type IViewGetTotalResultService = {
  total: number;
  _id: string;
};

export type IViewGetNumberResultService = {
  liveTotal: number;
  averageTotal: number;
  weeklyTotal: number;
};

export type IViewGetStatisticsResultService = {
  day: IViewGetTotalResultService[];
  country: IViewGetTotalResultService[];
};

export interface IViewAddParamService {
  url: string;
  langId: string;
  ip?: string;
  country?: string;
  city?: string;
  region?: string;
}
