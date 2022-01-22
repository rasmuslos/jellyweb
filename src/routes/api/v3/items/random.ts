import type {RequestHandler} from "@sveltejs/kit";
import type {Locals} from "$lib/typings";
import {createApiSuccess} from "$lib/helper";
import {getRandomItems} from "$lib/api/jellyfin/methods/v1";

export const get: RequestHandler<Locals, {}> = async ({ locals }) => {
    const session = locals.session.data

    const similar = await getRandomItems(session)
    return createApiSuccess(similar)
}