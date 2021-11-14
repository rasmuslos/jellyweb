import {getGenre} from "$lib/api/jellyfin/methods";
import {createApiError, createApiResponse} from "$lib/apiHelper";
import type {Genre} from "$lib/typings/internal";
import {isValidParam} from "$lib/helper";

export const get = async ({ locals, params }) => {
    const session = locals.session.data.active
    const { id } = params

    if(isValidParam(id)) createApiError(400, "Include genre id")

    const genre: Genre = await getGenre(session, id)
    return createApiResponse(true, genre)
}