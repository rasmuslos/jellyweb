import {HOST} from "$lib/environment";
import {createApiError, createApiResponse} from "$lib/apiHelper";
import type {Session} from "$lib/typings/jellyfin";
import {authoriseUserByName} from "$lib/api/jellyfin/methods";
import {create} from "$lib/session";

export const post = async ({ locals, body }) => {
    const { server, username, password, name } = body
    let url = HOST == "" ? server : HOST
    let browser = name == "" || name == null ? "unknown" : name

    if(server.trim() === "" || username.trim() === "") return createApiError(401, "Provide server & username")

    const uuid = Date.now().toString(36) + Math.random().toString(36).substring(2)
    const session: Session = await authoriseUserByName(url, username, password, uuid, browser)

    locals.session.data = create(locals.session.data, url, session["User"]["Id"], session["AccessToken"], uuid, browser)
    return createApiResponse(true, { session: locals.session.data.active })
}