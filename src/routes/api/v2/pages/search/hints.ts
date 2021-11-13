import {
    getRecommendedItems,
} from "$lib/api/jellyfin/methods/v2";
import {createApiResponse} from "$lib/apiHelper";
import type {Item} from "$lib/typings/internal";

export const get = async ({ locals }) => {
    const session = locals.session.data.active
    const hints: Item[] = await getRecommendedItems(session)

    if(hints.length > 13) hints.splice(0, 13)
    return createApiResponse(true, hints)
}