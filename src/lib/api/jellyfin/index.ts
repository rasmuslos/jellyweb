import type {JellyfinSession} from "$lib/typings/jellyfin";
import {createApiError} from "$lib/apiHelper";

export type RequestOptions = {
    method?: "GET" | "POST" | "DELETE" | "PUT",
    body?: any,
    parse?: boolean,
}
export const createRequest = async (endpoint: string, session: JellyfinSession, requestOptions: RequestOptions = {}) => {
    const { method, body, parse } = Object.assign({
        method: "GET",
        body: null,
        parse: true,

    } as RequestOptions, requestOptions)

    // TODO: Read version from package.json
    const { deviceId, server, token } = session
    const url = `${server}/${endpoint}`
    const authHeader = `MediaBrowser Client="Jellyweb", Device="${session.name || "Unknown"}", Version="0.0.0", DeviceId="${deviceId}", Token="${token}`

    const res = await fetch(url, {
        method,
        body,

        headers: {
            "Content-Type": "application/json",
            "X-Emby-Authorization": authHeader,
        },
    })

    // if(!res.ok) throw new Error("Fetch failed")
    if(res.status == 204 || !parse) return
    if(res.status != 200) {
        console.warn("got non 200 status", method, res.status, await res.clone().text(), url)

        if(res.status == 401) return Promise.reject({ status: 401, error: "auth failed" })
        else return Promise.reject({ status: res.status, error: "Request returned other status then 200" })
    }

    return res.json()
}
export const handleError = (error) => {
    console.error("Jellyfin error", error)

    if(error.message != null) return createApiError(500, error.message)
    else return createApiError(error.status, error.error)
}

export * from "./methods"