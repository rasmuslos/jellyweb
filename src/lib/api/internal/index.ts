import type {InternalApiRequest} from "$lib/typings/jellyfin";
import {goto} from "$app/navigation";
import {browser} from "$app/env";

let customFetch

export const setFetcher = (fetch) => customFetch = fetch
export const makeRequest = async (endpoint: string, method: any = "GET", body: any = null, handleLoginError: boolean = true) => createRequest(endpoint, {
    version: 1,
    method,
    body,
    handleLoginError,
})

type RequestOptions = {
    version?: 1 | 2,
    method?: "GET" | "POST" | "DELETE" | "PUT",
    body?: any,
    handleLoginError?: boolean,
}
export const createRequest = async (endpoint: string, requestOptions?: RequestOptions) => {
    const requester = customFetch ?? fetch
    const options = Object.assign({
        body: null,
        method: "GET",
        version: 2,
        handleLoginError: true,
    } as RequestOptions, requestOptions)

    const res = await requester(`/api/v${options.version}/${endpoint}`, {
        method: options.method,
        body: options.body !== null ? JSON.stringify(options.body) : null,

        headers: {
            "Content-Type": "application/json",
        },
    })

    const { ok, payload }: InternalApiRequest = await res.json()

    if(!ok) {
        if(payload.status === 401 && options.handleLoginError && browser) return goto("/user/logout")
        else return Promise.reject(payload)
    }

    return payload
}

export * from "./methods"