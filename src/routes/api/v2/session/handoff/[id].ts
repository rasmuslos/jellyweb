import {isInvalidParam} from "$lib/helper";
import {createApiError} from "$lib/apiHelper";
import {updateHandoff} from "$lib/session";
import type {JellyfinSession} from "$lib/typings/jellyfin";

export const put = async ({ params, body, locals }) => {
    const session: JellyfinSession = locals.session.data.active
    const { id } = params
    if(isInvalidParam(id) || !body) return createApiError(401, "provide id & body")

    const {
        name,

        final,
        password,
    } = body
    if(isInvalidParam(name)) return createApiError(401, "provide name, userid & server")

    if(final) {

    } else updateHandoff(id, name, session.userId, session.server)
}