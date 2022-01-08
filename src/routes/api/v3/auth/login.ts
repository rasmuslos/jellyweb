import type {RequestHandler} from "@sveltejs/kit";
import type {Locals, Session} from "$lib/typings";
import {createApiError, createApiSuccess, isValidString, normaliseServer} from "$lib/helper";
import {authenticateByName} from "$lib/api/jellyfin/methods/v1";

type Input = {
    server: string,
    username: string,
    password?: string,
}
export const post: RequestHandler<Locals, Input> = async ({ body, locals }) => {
    const {
        server,
        username,
        password,
    } = body

    if(!isValidString(server) || !isValidString(username)) return createApiError(400, "auth.login.error.missing")
    const url = normaliseServer(server)

    if(url == null) return createApiError(400, "auth.login.error.server")

    const deviceId = Date.now().toString(36) + Math.random().toString(36).substring(2)
    const { User, AccessToken } = await authenticateByName(server, username, password, deviceId)

    const session: Session = {
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