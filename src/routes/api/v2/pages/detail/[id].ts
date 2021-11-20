import {
    getItem, getNextUpItem, getSeasons, getSimilarItems,
} from "$lib/api/jellyfin/methods";
import {createApiError, createApiResponse} from "$lib/apiHelper";
import type {Item} from "$lib/typings/internal";
import {isInvalidParam} from "$lib/helper";

export const get = async ({ locals, params, query }) => {
    const session = locals.session.data.active
    const complex = query.get("complex")
    const { id } = params

    if(isInvalidParam(id)) return  createApiError(400, "Include item id")

    let seasons, nextUp, similar
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
        }
    }

    return createApiResponse(true, {
        item,
        seasons,
        nextUp,
        similar,
    })
}