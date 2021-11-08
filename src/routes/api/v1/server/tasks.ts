import {genres, handleError,} from "$lib/api/jellyfin"
import {createApiResponse} from "$lib/apiHelper";

export async function get({ locals }) {
    try {
        const session = locals.session.data.active
        const { Items } = await genres(session)

        return createApiResponse(true, { genres: Items })
    } catch(error) {
        return handleError(error)
    }
}