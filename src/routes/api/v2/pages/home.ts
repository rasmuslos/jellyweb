import {
    getBestRatedItems,
    getGenres, getLatestItems,
    getNextUpItems,
    getRandomItem, getRecommendedItems,
    getUnfinishedItems
} from "$lib/api/jellyfin/methods";
import {createApiResponse} from "$lib/apiHelper";

export const get = async ({ locals }) => {
    const session = locals.session.data.active
    const [unfinished, nextUp, genres, random, bestRated, recommended, latest] = await Promise.all([
        getUnfinishedItems(session),
        getNextUpItems(session),
        getGenres(session),
        getRandomItem(session),
        getBestRatedItems(session),
        getRecommendedItems(session),
        getLatestItems(session),
    ])

    return createApiResponse(true, {
        unfinished,
        nextUp,
        genres,
        random,
        bestRated,
        recommended,
        latest,
    })
}