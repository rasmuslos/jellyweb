import {handleError, search as searchItems} from "$lib/api/jellyfin"
import {createApiResponse} from "$lib/apiHelper";

export async function get({ locals, query }) {
    try {
        const session = locals.session.data.active
        const term = query.get("term")

        /*
        const [ItemsRaw, PersonsRaw] = await Promise.all([searchItems(session, term), searchPersons(session, term)])
        const items = ItemsRaw.Items
        const persons = PersonsRaw.Items.split(0, 5)

        return createApiResponse(true, { items, persons })
        */

        const Items = await searchItems(session, term)

        return createApiResponse(true, Items)
    } catch(error) {
        return handleError(error)
    }
}