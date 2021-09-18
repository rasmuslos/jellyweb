import {handleError, likeItem} from "$lib/api/jellyfin"
import {createApiError, createApiResponse} from "$lib/apiHelper";

export async function post({ locals, body }) {
    try {
        const session = locals.session.data.active
        const itemId = body.itemId

        if(itemId == null) return createApiError(400, "Provide itemId")

        const { IsFavorite } = await likeItem(session, itemId)
        return createApiResponse(true, {
            favorite: IsFavorite,
        })
    } catch(error) {
        return handleError(error)
    }
}