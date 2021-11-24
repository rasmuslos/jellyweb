import {createApiResponse} from "$lib/apiHelper";
import {destroySession} from "$lib/api/jellyfin";

export async function del({ locals }) {
    try {
        await destroySession(locals.session.data.active)
    } catch (error) {
        // e.g. Session is missing
    }

    locals.session.data = null

    return createApiResponse(true, locals.session.data)
}