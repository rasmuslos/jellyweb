import {createApiError, createApiResponse} from "$lib/apiHelper";
import {markItemAsFavorite, markItemAsUnFavorite} from "$lib/api/jellyfin/methods/v2";

export const get = async ({ locals, params }) => {
    const session = locals.session.data.active
    const itemId = params.id

    if(itemId == null) return createApiError(400, "Provide itemId")

    const { IsFavorite } = await markItemAsFavorite(session, itemId)
    return createApiResponse(true, IsFavorite)
}
export const del = async ({ locals, params }) => {
    const session = locals.session.data.active
    const itemId = params.id

    if(itemId == null) return createApiError(400, "Provide itemId")

    const { IsFavorite } = await markItemAsUnFavorite(session, itemId)
    return createApiResponse(true, IsFavorite)
}