import {
    getGenre,
    getGenres, getItem, getSimilarItems,
} from "$lib/api/jellyfin/methods/v2";
import {createApiError, createApiResponse} from "$lib/apiHelper";
import type {Genre, Item} from "$lib/typings/internal";

export const get = async ({ locals, params }) => {
    const session = locals.session.data.active
    const { id } = params

    if(id === null || id === "" || id == "null") createApiError(400, "Include genre id")

    const genre: Genre = await getGenre(session, id)
    return createApiResponse(true, genre)
}