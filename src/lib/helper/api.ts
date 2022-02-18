import type { Response } from "$lib/typings";
import type { EndpointOutput } from "@sveltejs/kit";

export const isValidString = (input: string) => {
    if(input == null) return false
    const normalised = input.normalize("NFC").trim()

    return normalised != ""
}
export const normalizeServer = (server: string): string => {
    if(server == null) return null
    const normalized = server.normalize("NFC").trim()

    if(!normalized.startsWith("http://") && !normalized.startsWith("https://")) return null
    if(normalized.endsWith("/")) return null

    return normalized
}

export const createApiResponse = (status: number, payload: any): EndpointOutput => {
    const headers = new Headers()
    headers.set("Content-Type", "application/json")

    return {
        headers,
        status,
        body: JSON.stringify({
            status,
            payload,
        }),
    }
}
export const createApiSuccess = (payload: any) => createApiResponse(200, payload)
export const createApiError = (status: number = 500, error: any = "unknown server error") => createApiResponse(status, error)

export const isLoggedIn = (session: any) => !!(session?.data != null && session.data != {} && Object.keys(session.data ?? {}).length)

export const parseError = (exception: Response<string> & Error) => exception?.payload ? `(${exception.status}) ${exception.payload}` : exception?.message ?? "unknown error"