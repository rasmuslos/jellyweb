import {createRequest} from "$lib/api/jellyfin";
import { convertItem } from "$lib/helper";
import type { Session } from "$lib/typings";
import type {AuthenticationResponse} from "$lib/typings/jellyfin/user";

export const authenticateByName = (server: string, username: string, password: string, deviceId: string): Promise<AuthenticationResponse> => createRequest("Users/AuthenticateByName", {
    server,

    device: deviceId,
    name: username,

    id: null,
    token: "",
    administrator: null,
}, {
    method: "POST",
    body: JSON.stringify({
        Username: username,
        Pw: password,
    })
})

export const getFeaturedItem = async (session: Session) => convertItem((await createRequest(`Users/${session.id}/Suggestions?limit=1&type=Movie,Series`, session)).Items[0])