export type ViewGetTotalResultDocument = {
    total: number
    _id: string
}

export type ViewGetNumberResultDocument = {
    liveTotal: number
    averageTotal: number
    weeklyTotal: number
}

export type ViewGetStatisticsResultDocument = {
    day: ViewGetTotalResultDocument[],
    country: ViewGetTotalResultDocument[]
}

export interface ViewAddParamDocument {
    url: string,
    langId: string
    ip?: string,
    country?: string,
    city?: string,
    region?: string
}