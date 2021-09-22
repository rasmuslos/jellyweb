import {handleError, searchHints} from "$lib/api/jellyfin"
import {createApiResponse} from "$lib/apiHelper";

export async function get({ locals }) {
    try {
        const session = locals.session.data.active
        const hints = (await searchHints(session)).Items

        return createApiResponse(true, hints)
    } catch(error) {
        return handleError(error)
    }
}