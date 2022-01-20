import type {RequestHandler} from "@sveltejs/kit";
import type {Locals} from "$lib/typings";
import {createApiError, createApiSuccess} from "$lib/helper";
import {searchItems, searchPeople} from "$lib/api/jellyfin/methods/v1";

export const get: RequestHandler<Locals, {}> = async ({ locals, url }) => {
    const term = url.searchParams.get("term")
    if(!term) return createApiError(400, "provide search term")

    const session = locals.session.data
    try {
        const [items, people] = await Promise.all([searchItems(term, session), searchPeople(term, session)])
        const results = [].concat(items).concat(people)

        return createApiSuccess(results)
    } catch (error) {
        console.log(error)
        return createApiError(404, "item not found")
    }
}