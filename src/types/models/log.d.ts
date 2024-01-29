export interface LogDocument {
    _id: string
    url: string,
    method: string
    ip: string
    message?: string
    userId?: string
    params?: object
    body?: object
    query?: object
}