import {
    getSuggestedItems,
    getNextUpItems,
    getUnfinishedItems,
    getRecommendedItems,
    getLatestMedia,
    getGenres
} from "$lib/api/jellyfin/methods/v1";
import { createApiSuccess } from "$lib/helper";
import type { Locals } from "$lib/typings";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler<Locals, {}> = async ({ locals }) => {
    const session = locals.session.data
    const [suggested, nextUp, unfinished, recommendations, latest, genres] = await Promise.all([
        getSuggestedItems(21, session),
        getNextUpItems(session),
        getUnfinishedItems(session),
        getRecommendedItems(session),
        getLatestMedia(session),
        getGenres(session),
    ])

    const suggestions = [].concat(unfinished).concat(nextUp).concat(suggested)
    const featured = suggestions.splice(0, 7)

    return createApiSuccess({
        featured,
        suggestions,
        recommendations,
        latest,
        genres,
    })
}