import type {RequestHandler} from "@sveltejs/kit";
import type {SessionData} from "$lib/typings";
import {createApiError, createApiSuccess, isValidString, normalizeServer} from "$lib/helper";
import {authenticateByName} from "$lib/api/jellyfin/methods/v1";

export const post: RequestHandler = async ({ request, locals }) => {
    const {
        server,
        username,
        password,
    } = await request.json()

    if(!isValidString(server) || !isValidString(username)) return createApiError(400, "auth.login.error.missing")
    const url = normalizeServer(server)

    if(url == null) return createApiError(400, "auth.login.error.server")

    const deviceId = Date.now().toString(36) + Math.random().toString(36).substring(2)
    const { User, AccessToken } = await authenticateByName(server, username, password, deviceId)

    const session: SessionData = {
        server,
        device: deviceId,

        id: User.Id,
        name: username,
        administrator: User.Policy.IsAdministrator,
        token: AccessToken,
    }
    locals.session.data = session

    return createApiSuccess(null)
}