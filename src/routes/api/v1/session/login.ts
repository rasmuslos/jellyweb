import type {JellyfinSession} from "$lib/typings";
import {createApiError, createApiResponse} from "$lib/apiHelper";
import {authoriseUserByName} from "$lib/api/jellyfin";

export async function post({ locals, body }) {
    const { server, username, password } = body

    if(server.trim() === "" || username.trim() === "") return createApiError(401, "Provide server & username")

    const uuid = Date.now().toString(36) + Math.random().toString(36).substring(2);
    try {
        const session = await authoriseUserByName(server, username, password, uuid)
        const oldSession = locals.session.data ? locals.session.data.active : null

        locals.session.data = {
            active: {
                server,
                userId: session["User"]["Id"],
                token: session["AccessToken"],
                deviceId: uuid,
            } as JellyfinSession,
            stored: locals.session.data ? locals.session.data.stored ? [...locals.session.data.stored, oldSession] : oldSession ? [oldSession] : [] : oldSession ? [oldSession] : [],
        }

        return createApiResponse(true, JSON.stringify({}))
    } catch(error) {
        console.error(error)

        if(error.message != null) return createApiError(500, error.message)
        else return createApiError(error.status, error.error)
    }
}