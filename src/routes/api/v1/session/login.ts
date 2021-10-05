import type {JellyfinSession, Session} from "$lib/typings";
import {createApiError, createApiResponse} from "$lib/apiHelper";
import {authoriseUserByName, handleError} from "$lib/api/jellyfin";
import {HOST} from "$lib/environment";

export async function post({ locals, body }) {
    const { server, username, password } = body
    let url = HOST == "" ? server : HOST

    if(server.trim() === "" || username.trim() === "") return createApiError(401, "Provide server & username")

    const uuid = Date.now().toString(36) + Math.random().toString(36).substring(2);
    try {
        const session = await authoriseUserByName(url, username, password, uuid)
        const oldSession = locals.session.data ? locals.session.data.active : null

        locals.session.data = {
            active: {
                server: url,
                userId: session["User"]["Id"],
                token: session["AccessToken"],
                deviceId: uuid,
            } as JellyfinSession,
            stored: locals.session.data ? locals.session.data.stored ? [...locals.session.data.stored, oldSession] : oldSession ? [oldSession] : [] : oldSession ? [oldSession] : [],
        } as Session

        return createApiResponse(true, { session: locals.session.data.active })
    } catch(error) {
        return handleError(error)
    }
}