import type {InternalApiRequest} from "$lib/typings";
import {goto} from "$app/navigation";

let customFetch

export const setFetcher = (fetch) => customFetch = fetch
export const makeRequest = async (endpoint: string, method: string = "GET", body: any = null, handleLoginError: boolean = true) => {
    const requester = customFetch ?? fetch

    const res = await requester(`/api/v1/${endpoint}`, {
        method,
        body: body !== null ? JSON.stringify(body) : null,

        headers: {
            "Content-Type": "application/json",
        },
    })

    // if(!res.ok) throw new Error("Fetch failed")

    const { ok, payload }: InternalApiRequest = await res.json()

    if(!ok) {
        if(payload.status === "401" && handleLoginError) return goto("/user/login")
        else throw new Error(payload.error)
    }

    return payload
}

export * from "./methods"