import {
    getJellyfinItem
} from "$lib/api/jellyfin/methods";
import {createApiError, createApiResponse} from "$lib/apiHelper";
import type {JellyfinItem} from "$lib/typings/jellyfin";
import {isInvalidParam} from "$lib/helper";

export const get = async ({ locals, params }) => {
    const session = locals.session.data.active
    const { id } = params

    if(isInvalidParam(id)) return createApiError(400, "Include item id")

    const item: JellyfinItem = await getJellyfinItem(session, id)
    if(item == null) return createApiError(404, "item not found")

    return createApiResponse(true, item)
}