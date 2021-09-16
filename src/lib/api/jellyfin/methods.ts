import {createRequest} from "$lib/api/jellyfin";

export const authoriseUserByName = (server, username, password, deviceId) => createRequest("Users/AuthenticateByName", { server, deviceId, token: "", userId: null }, "POST", JSON.stringify({ "Username": username, "Pw": password }))