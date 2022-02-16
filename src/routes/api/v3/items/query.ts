import type {RequestHandler} from "@sveltejs/kit";
import {createApiError, createApiSuccess} from "$lib/helper";
import {queryServer} from "$lib/api/jellyfin/methods/v1";

export const get: RequestHandler= async ({ locals, url }) => {
    const term = url.searchParams.get("term")
    if(!term) return createApiError(400, "provide search term")

    const session = locals.session.data
    const results = await queryServer(term, session)
    return createApiSuccess(results)
}