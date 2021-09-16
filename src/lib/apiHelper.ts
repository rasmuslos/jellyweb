export const createApiError = (status: number, error: string) => {
    return createApiResponse(false, {
        status,
        error,
    }, status)
}
export const createApiResponse = (ok: boolean, payload: any, code: number = null) => {
    return {
        status: code ?? (ok ? 200 : 400),
        body: {
            ok,
            payload,
        },
    }
}