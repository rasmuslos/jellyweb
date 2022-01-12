import type {ServerResponse} from "@sveltejs/kit/types/hooks";

export const isValidString = (input: string) => {
    if(input == null) return false
    const normalised = input.normalize("NFC").trim()

    return normalised != ""
}
export const normaliseServer = (server: string): string => {
    if(server == null) return null
    const normalised = server.normalize("NFC").trim()

    if(!normalised.startsWith("http://") && !normalised.startsWith("https://")) return null
    if(normalised.endsWith("/")) return null

    return normalised
}

export const createApiResponse = <T = any>(status: number, payload: any): ServerResponse => {
    return {
        headers: {},
        status,
        body: JSON.stringify({
            status,
            payload,
        })
    }
}
export const createApiSuccess = (payload: any) => createApiResponse(200, payload)
export const createApiError = (status: number = 500, error: any = "unknown server error") => createApiResponse(status, error)

export const isLoggedIn = (session: any) => {
    console.log(session?.data != null, session.data != {}, Object.keys(session?.data ?? {}).length)
    return !!(session?.data != null && session.data != {} && Object.keys(session.data ?? {}).length)
}