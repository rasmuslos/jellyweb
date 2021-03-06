import type {RequestOptions} from "$lib/typings";
import type {Response} from "$lib/typings";
import {DEVELOPMENT} from "$lib/helper";
import {browser} from "$app/env"
import {goto} from "$app/navigation"

let fetcher: any

export const setFetcher = (method: any) => fetcher = method
export const requestResource = async <T>(endpoint: string, requestOptions: RequestOptions = {}): Promise<T> => {
    let {
        method,
        body,
        encodeBody,
        parseResponse,
        version,
        preventCaching,
    } = Object.assign({
        method: "GET",
        body: null,
        encodeBody: true,
        parseResponse: true,
        version: 3,
        preventCaching: false,
    } as RequestOptions, requestOptions)
    const url = `/api/v${version}/${endpoint}`

    if(method !== "GET" && body == null) body = {}
    if(body != null && encodeBody) body = JSON.stringify(body)

    try {
        const response = await (fetcher ?? fetch)(url, {
            method,
            body,

            cache: preventCaching ? "no-cache" : "default",
            headers: {
                "Content-Type": "application/json",
            },
        })

        if(parseResponse) {
            const data = await response.json() as unknown as Response<T>

            if(data.status == 200) return data.payload
            else if(data.status == 401 && browser) goto("/auth/logout")
            else {
                console.error("Invalid response", {
                    url,
                    data,
                })
                return Promise.reject(data)
            }
        } else return null
    } catch (error) {
        console.error("Error while performing request", {
            error,
            url,
            method,
        })
        return Promise.reject({
            status: 500,
            payload: DEVELOPMENT ? error : "unknown server error",
        })
    }
}
