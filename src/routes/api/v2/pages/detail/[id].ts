import {
    getEpisodes,
    getItem, getNextUpItem, getSeasons, getSimilarItems,
} from "$lib/api/jellyfin/methods";
import {createApiError, createApiResponse} from "$lib/apiHelper";
import type {Item} from "$lib/typings/internal";
import {isValidParam} from "$lib/helper";

export const get = async ({ locals, params, query }) => {
    const session = locals.session.data.active
    const complex = query.get("complex")
    const { id } = params

    if(isValidParam(id)) return  createApiError(400, "Include item id")

    let seasons, nextUp, episodes, similar
    const item: Item = await getItem(session, id, complex)

    if(item == null) return createApiError(404, "item not found")

    if(complex !== "false") {
        switch(item.type) {
            case "movie":
                similar = await getSimilarItems(session, id)
                break
            case "show":
                [nextUp, seasons] = await Promise.all([getNextUpItem(session, id), getSeasons(session, id)])
                break
            case "season":
                episodes = await getEpisodes(session, item.showData.showId, id)
                break
        }
    }

    return createApiResponse(true, {
        item,
        seasons,
        nextUp,
        episodes,
        similar,
    })
}