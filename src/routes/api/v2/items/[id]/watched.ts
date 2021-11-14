import {createApiError, createApiResponse} from "$lib/apiHelper";
import {markItemAsUnWatched, markItemAsWatched} from "$lib/api/jellyfin/methods";

export const get = async ({ locals, params }) => {
    const session = locals.session.data.active
    const itemId = params.id

    if(itemId == null) return createApiError(400, "Provide itemId")

    const { Played } = await markItemAsWatched(session, itemId)
    return createApiResponse(true, Played)
}
export const del = async ({ locals, params }) => {
    const session = locals.session.data.active
    const itemId = params.id

    if(itemId == null) return createApiError(400, "Provide itemId")

    const { Played } = await markItemAsUnWatched(session, itemId)
    return createApiResponse(true, Played)
}