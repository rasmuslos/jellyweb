import {getGenre} from "$lib/api/jellyfin/methods";
import {createApiError, createApiResponse} from "$lib/apiHelper";
import type {Genre} from "$lib/typings/internal";

export const get = async ({ locals, params }) => {
    const session = locals.session.data.active
    const { id } = params

    if(id === null || id === "" || id == "null") createApiError(400, "Include genre id")

    const genre: Genre = await getGenre(session, id)
    return createApiResponse(true, genre)
}