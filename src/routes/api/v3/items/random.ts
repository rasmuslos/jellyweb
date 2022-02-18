import type {RequestHandler} from "@sveltejs/kit";
import {createApiSuccess} from "$lib/helper";
import {getRandomItems} from "$lib/api/jellyfin/methods/v1";

export const get: RequestHandler = async ({ locals }) => {
    const session = locals.session.data

    const similar = await getRandomItems(session)
    return createApiSuccess(similar)
}