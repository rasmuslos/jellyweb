import type {RequestHandler} from "@sveltejs/kit";
import {createApiError, createApiSuccess} from "$lib/helper";
import {markItemAsFavorite, markItemAsNonFavorite} from "$lib/api/jellyfin/methods/v1";

export const post: RequestHandler = async ({ locals, params }) => {
    if(!params?.id) return createApiError(400, "provide item id")

    const session = locals.session.data
    const played = await markItemAsFavorite(params.id, session)
    return createApiSuccess(played)
}
export const del: RequestHandler = async ({ locals, params }) => {
    if(!params?.id) return createApiError(400, "provide item id")

    const session = locals.session.data
    const played = await markItemAsNonFavorite(params.id, session)
    return createApiSuccess(played)
}