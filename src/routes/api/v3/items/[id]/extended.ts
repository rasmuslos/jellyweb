import type {RequestHandler} from "@sveltejs/kit";
import type {Locals} from "$lib/typings";
import {createApiError, createApiSuccess} from "$lib/helper";
import {getExtendedItem} from "$lib/api/jellyfin/methods/v1";

export const get: RequestHandler<Locals, {}> = async ({ locals, params }) => {
    if(!params?.id) return createApiError(400, "provide item id")

    const session = locals.session.data
    try {
        const item = await getExtendedItem(params.id, session)
        return createApiSuccess(item)
    } catch (error) {
        return createApiError(404, "item not found")
    }
}