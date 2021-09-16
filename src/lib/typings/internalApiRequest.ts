export type ApiError = {
    status: number,
    error: string,
}
export type InternalApiRequest = {
    ok: boolean,
    payload?: ApiError | any,
}