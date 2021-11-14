import {
    getItemsByQuery
} from "$lib/api/jellyfin/methods";
import {createApiError, createApiResponse} from "$lib/apiHelper";
import type {Item} from "$lib/typings/internal";
import {isInvalidParam} from "$lib/helper";

export const get = async ({ locals, query }) => {
    const session = locals.session.data.active
    const term = query.get("term")

    if(isInvalidParam(term)) return createApiError(400, "provide valid term")

    const items: Item[] = await getItemsByQuery(session, term)
    return createApiResponse(true, items)
}