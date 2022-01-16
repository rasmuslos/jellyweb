import type {RequestHandler} from "@sveltejs/kit";
import type {Locals} from "$lib/typings";
import {createApiError, createApiSuccess} from "$lib/helper";
import {getEpisodesInSeason,} from "$lib/api/jellyfin/methods/v1";

export const get: RequestHandler<Locals, {}> = async ({ locals, params }) => {
    if(!params?.id || !params?.seasonId) return createApiError(400, "provide item id")

    const session = locals.session.data
    try {
        const episodes = await getEpisodesInSeason(params.id, params.seasonId, session)
        return createApiSuccess(episodes)
    } catch (error) {
        return createApiError(404, "item not found")
    }
}