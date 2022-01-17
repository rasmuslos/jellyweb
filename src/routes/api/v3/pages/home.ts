import {
    getSuggestedItems,
    getNextUpItems,
    getUnfinishedItems,
    getRecommendedItems,
    getLatestMedia, getRandomItems, getGenres, getBestRatedMovies
} from "$lib/api/jellyfin/methods/v1";
import { createApiSuccess } from "$lib/helper";
import type { Locals } from "$lib/typings";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler<Locals, {}> = async ({ locals }) => {
    const session = locals.session.data
    const [suggested, nextUp, unfinished, recommendations, latest, random, genres, bestRated] = await Promise.all([
        getSuggestedItems(21, session),
        getNextUpItems(session),
        getUnfinishedItems(session),
        getRecommendedItems(session),
        getLatestMedia(session),
        getRandomItems(session),
        getGenres(session),
        getBestRatedMovies(session),
    ])

    const suggestions = [].concat(unfinished).concat(nextUp).concat(suggested)
    const featured = suggestions.splice(0, 7)

    return createApiSuccess({
        featured,
        suggestions,
        recommendations,
        latest,
        random,
        genres,
        bestRated,
    })
}