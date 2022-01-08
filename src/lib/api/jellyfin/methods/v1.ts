import {createRequest} from "$lib/api/jellyfin";
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