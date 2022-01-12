import type {RequestHandler} from "@sveltejs/kit";
import type {Locals} from "$lib/typings";
import {createApiError, createApiSuccess} from "$lib/helper";
import {getItemsStarring} from "$lib/api/jellyfin/methods/v1";

export const get: RequestHandler<Locals, {}> = async ({ locals, params }) => {
    if(!params?.id) return createApiError(400, "provide item id")

    const session = locals.session.data
    try {
        const starring = await getItemsStarring(params.id, session)
        return createApiSuccess(starring)
    } catch (error) {
        return createApiError(404, "item not found")
    }
}