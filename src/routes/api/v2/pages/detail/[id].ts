import {
    getEpisodes,
    getItem, getItemsBasedOnPerson, getNextUpItem, getSeasons, getSimilarItems,
} from "$lib/api/jellyfin/methods/v2";
import {createApiError, createApiResponse} from "$lib/apiHelper";
import type {Item} from "$lib/typings/internal";

export const get = async ({ locals, params, query }) => {
    const session = locals.session.data.active
    const complex = query.get("complex")
    const { id } = params

    if(id === null || id === "" || id == "false") return  createApiError(400, "Include item id")

    let seasons, nextUp, media, episodes, similar
    const item: Item = await getItem(session, id)

    if(complex) {
        switch(item.type) {
            case "movie":
                similar = await getSimilarItems(session, id)
                break
            case "person":
                media = await getItemsBasedOnPerson(session, id)
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
        media,
        episodes,
        similar,
    })
}