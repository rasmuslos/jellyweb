import {
    getItemsByQuery
} from "$lib/api/jellyfin/methods/v2";
import {createApiResponse} from "$lib/apiHelper";
import type {Item} from "$lib/typings/internal";

export const get = async ({ locals, query }) => {
    const session = locals.session.data.active
    const term = query.get("term")

    const items: Item[] = await getItemsByQuery(session, term)
    return createApiResponse(true, items)
}