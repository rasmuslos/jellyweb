import {handleError, me,} from "$lib/api/jellyfin"
import {createApiResponse} from "$lib/apiHelper";

export async function get({ locals }) {
    try {
        const session = locals.session.data.active
        const meObj = await me(session)

        return createApiResponse(true, meObj)
    } catch(error) {
        return handleError(error)
    }
}