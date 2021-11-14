import {
    getJellyfinItem
} from "$lib/api/jellyfin/methods/v2";
import {createApiError, createApiResponse} from "$lib/apiHelper";
import type {JellyfinItem} from "$lib/typings/jellyfin";

export const get = async ({ locals, params }) => {
    const session = locals.session.data.active
    const { id } = params

    if(id === null || id === "" || id == "false") return  createApiError(400, "Include item id")

    const item: JellyfinItem = await getJellyfinItem(session, id)
    if(item == null) return createApiError(404, "item not found")

    return createApiResponse(true, item)
}