import {
    getGenres, getItem, getSimilarItems,
} from "$lib/api/jellyfin/methods/v2";
import {createApiError, createApiResponse} from "$lib/apiHelper";
import type {Item} from "$lib/typings/internal";

export const get = async ({ locals, params, query }) => {
    const session = locals.session.data.active
    const complex = query.get("complex")
    const { id } = params

    if(id === null || id === "") createApiError(400, "Include item id")

    let seasons, nextUp, media, episodes, similar
    const item: Item = await getItem(session, id)

    if(complex) {
        if(item.type === "movie") similar = await getSimilarItems(session, id)
    }

    return createApiResponse(true, {
        item,
        seasons,
        nextUp,
        media,
        episodes,
        similar,
    })
}