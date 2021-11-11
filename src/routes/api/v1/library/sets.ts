import {getBoxSets, handleError} from "$lib/api/jellyfin"
import {createApiResponse} from "$lib/apiHelper";
import type {VirtualFolder} from "$lib/typings/jellyfin";

export async function get({ locals }) {
    try {
        const session = locals.session.data.active
        const items: VirtualFolder[] = await getBoxSets(session)

        const sets = items.filter(item => item.CollectionType !== "BoxSets")
        return createApiResponse(true, sets)
    } catch(error) {
        return handleError(error)
    }
}