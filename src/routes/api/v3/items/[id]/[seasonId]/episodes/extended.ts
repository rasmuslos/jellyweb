import type {RequestHandler} from "@sveltejs/kit";
import {createApiError, createApiSuccess} from "$lib/helper";
import {getEpisodesInSeasonExtended,} from "$lib/api/jellyfin/methods/v1";

export const get: RequestHandler = async ({ locals, params }) => {
    if(!params?.id || !params?.seasonId) return createApiError(400, "provide item id")

    const session = locals.session.data
    try {
        const episodes = await getEpisodesInSeasonExtended(params.id, params.seasonId, session)
        return createApiSuccess(episodes)
    } catch (error) {
        return createApiError(404, "item not found")
    }
}