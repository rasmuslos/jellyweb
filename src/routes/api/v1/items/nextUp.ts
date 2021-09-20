import {handleError, nextUpEpisode,} from "$lib/api/jellyfin"
import {createApiError, createApiResponse} from "$lib/apiHelper";

export async function get({ locals, query }) {
    try {
        const session = locals.session.data.active
        const itemId = query.get("itemId")

        if(itemId == null || itemId == "") return createApiError(400, "Provide itemId")

        const { Items } = await nextUpEpisode(session, itemId)
        return createApiResponse(true, Items[0])
    } catch(error) {
        return handleError(error)
    }
}