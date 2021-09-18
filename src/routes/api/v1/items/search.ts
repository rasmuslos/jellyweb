import {handleError, search as searchItems} from "$lib/api/jellyfin"
import {createApiResponse} from "$lib/apiHelper";

export async function get({ locals, query }) {
    try {
        const session = locals.session.data.active
        const term = query.get("term")

        const Items = await searchItems(session, term)

        return createApiResponse(true, Items)
    } catch(error) {
        return handleError(error)
    }
}