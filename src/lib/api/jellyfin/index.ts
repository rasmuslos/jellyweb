import type {Session} from "$lib/typings";

export type RequestOptions = {
    method?: "GET" | "POST" | "DELETE" | "PUT",
    body?: any,
    parse?: boolean,
}
export const createRequest = async (endpoint: string, session: Session, requestOptions: RequestOptions = {}) => {
    if(!session) return Promise.reject({ status: 403, error: "provide session" })

    const { method, body, parse } = Object.assign({
        method: "GET",
        body: null,
        parse: true,

    } as RequestOptions, requestOptions)

    // TODO: Read version from package.json
    const { server, token, device } = session
    const url = `${server}/${endpoint}`
    const authHeader = `MediaBrowser Client="Jellyweb", Device="Jellyweb", Version="0.0.0", DeviceId="${device}", Token="${token}"`    

    const res = await fetch(url, {
        method,
        body,

        headers: {
            "Content-Type": "application/json",
            "X-Emby-Authorization": authHeader,
        },
    })

    // console.log(await res.clone().text())

    if(res.status == 204 || !parse) return
    if(res.status != 200) {
        if(res.status == 401) return Promise.reject({ status: 401, error: "auth failed" })
        else {
            console.error(await res.text())
            return Promise.reject({ status: res.status, error: "Request returned other status then 200" })
        }
    }

    return res.json()
}