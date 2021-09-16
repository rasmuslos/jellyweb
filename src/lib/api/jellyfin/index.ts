import type {JellyfinSession} from "$lib/typings";

export const createRequest = async (endpoint: string, session: JellyfinSession, method: string = "GET", body: any = null) => {
    // TODO: Read version from package.json
    const { deviceId, server, token } = session
    let authHeader = `MediaBrowser Client="Jellyweb", Device="Browser", Version="0.0.0", DeviceId="${deviceId}", Token="${token}`

    const res = await fetch(`${server}/${endpoint}`, {
        method,
        body,

        headers: {
            "Content-Type": "application/json",
            "X-Emby-Authorization": authHeader,
        },
    })

    // if(!res.ok) throw new Error("Fetch failed")
    if(res.status != 200) {
        if(res.status == 401) return { status: 401, error: "auth failed" }
        else return { status: 400, error: "Request returned other status then 200" }
    }

    return res.json()
}

export * from "./methods"