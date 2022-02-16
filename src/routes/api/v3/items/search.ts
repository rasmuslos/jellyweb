import type {RequestHandler} from "@sveltejs/kit";
import {createApiError, createApiSuccess} from "$lib/helper";
import {searchItems, searchPeople} from "$lib/api/jellyfin/methods/v1";

export const get: RequestHandler = async ({ locals, url }) => {
    const term = url.searchParams.get("term")
    if(!term) return createApiError(400, "provide search term")

    const session = locals.session.data
    const [items, people] = await Promise.all([searchItems(term, session), searchPeople(term, session)])
    const results = [].concat(items).concat(people)

    return createApiSuccess(results)
}