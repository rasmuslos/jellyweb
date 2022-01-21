import type {RequestHandler} from "@sveltejs/kit";
import type {Locals} from "$lib/typings";
import {createApiError, createApiSuccess} from "$lib/helper";
import {queryServer} from "$lib/api/jellyfin/methods/v1";

export const get: RequestHandler<Locals, {}> = async ({ locals, url }) => {
    const term = url.searchParams.get("term")
    if(!term) return createApiError(400, "provide search term")

    const session = locals.session.data
    try {
        const results = await queryServer(term, session)
        return createApiSuccess(results)
    } catch (error) {
        return createApiError(500, "unable to query")
    }
}