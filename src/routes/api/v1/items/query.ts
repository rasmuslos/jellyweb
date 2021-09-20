import {getItemsBasedOnQuery, handleError} from "$lib/api/jellyfin"
import {createApiResponse} from "$lib/apiHelper";

export async function get({ locals, query }) {
    try {
        const session = locals.session.data.active
        const term = decodeURIComponent(query.get("query"))

        const { Items } = await getItemsBasedOnQuery(session, term)
        return createApiResponse(true, Items)
    } catch(error) {
        return handleError(error)
    }
}