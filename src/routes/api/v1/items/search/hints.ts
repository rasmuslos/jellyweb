import {handleError, searchHints} from "$lib/api/jellyfin"
import {createApiResponse} from "$lib/apiHelper";

export async function get({ locals }) {
    try {
        const session = locals.session.data.active
        const Obj = await searchHints(session)

        return createApiResponse(true, { hints: Obj.Items })
    } catch(error) {
        return handleError(error)
    }
}