import type {RequestHandler} from "@sveltejs/kit";
import {createApiError, createApiSuccess} from "$lib/helper";
import {getSeasons} from "$lib/api/jellyfin/methods/v1";

export const get: RequestHandler = async ({ locals, params }) => {
    if(!params?.id) return createApiError(400, "provide item id")

    const session = locals.session.data
    try {
        const similar = await getSeasons(params.id, session)
        return createApiSuccess(similar)
    } catch (error) {
        return createApiError(404, "item not found")
    }
}