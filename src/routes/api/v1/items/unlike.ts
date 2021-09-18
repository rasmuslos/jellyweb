import {handleError, unlikeItem} from "$lib/api/jellyfin"
import {createApiError, createApiResponse} from "$lib/apiHelper";

export async function del({ locals, body }) {
    try {
        const session = locals.session.data.active
        const itemId = body.itemId

        if(itemId == null) return createApiError(400, "Provide itemId")

        // I know "unlike" sucks
        const { IsFavorite } = await unlikeItem(session, itemId)
        return createApiResponse(true, {
            favorite: IsFavorite,
        })
    } catch(error) {
        return handleError(error)
    }
}