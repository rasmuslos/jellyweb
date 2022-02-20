export type RequestOptions = {
    method?: "POST" | "GET" | "DELETE" | "HEAD",
    body?: any,
    encodeBody?: boolean,
    parseResponse?: boolean,
    version?: 3,
    preventCaching?: boolean,
}
export type Response<T> = {
    status: number,
    payload: T,
}