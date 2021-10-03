import {handleError, markItemAsPlayed, markItemAsUnplayed} from "$lib/api/jellyfin"
import {createApiError, createApiResponse} from "$lib/apiHelper";

export async function post({ locals, body }) {
    try {
        const session = locals.session.data.active
        const itemId = body.itemId

        if(itemId == null) return createApiError(400, "Provide itemId")

        const { Played } = await markItemAsPlayed(session, itemId)
        return createApiResponse(true, {
            played: Played,
        })
    } catch(error) {
        return handleError(error)
    }
}

export async function del({ locals, body }) {
    try {
        const session = locals.session.data.active
        const itemId = body.itemId

        if(itemId == null) return createApiError(400, "Provide itemId")

        // I know "unlike" sucks
        const { Played } = await markItemAsUnplayed(session, itemId)
        return createApiResponse(true, {
            played: Played,
        })
    } catch(error) {
        return handleError(error)
    }
}