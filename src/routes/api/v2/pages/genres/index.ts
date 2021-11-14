import {
    getGenres,
} from "$lib/api/jellyfin/methods/v2";
import {createApiError, createApiResponse} from "$lib/apiHelper";

export const get = async ({ locals }) => {
    const session = locals.session.data.active
    const genres = await getGenres(session)

    return createApiResponse(true, genres)
}