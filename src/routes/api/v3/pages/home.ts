import {getSuggestedItems, getNextUpItems, getUnfinishedItems, getRecommendedItems} from "$lib/api/jellyfin/methods/v1";
import { createApiSuccess } from "$lib/helper";
import type { Locals } from "$lib/typings";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler<Locals, {}> = async ({ locals }) => {
    const session = locals.session.data
    const [suggested, nextUp, unfinished, recommendations] = await Promise.all([getSuggestedItems(14, session), getNextUpItems(session), getUnfinishedItems(session), getRecommendedItems(session)])

    const featured = [].concat(unfinished).concat(nextUp).concat(suggested).splice(0, 7)

    return createApiSuccess({
        featured,
        suggested: suggested.splice(7),
        recommendations,
    })
}