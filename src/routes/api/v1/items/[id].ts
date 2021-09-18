import {createApiError, createApiResponse} from "$lib/apiHelper";
import {getItem, handleError} from "$lib/api/jellyfin";

export async function get({ locals, params }) {
    try {
        const session = locals.session.data.active
        const { id } = params

        if(id === null || id === "") createApiError(400, "Include item id")

        const item = (await getItem(session, id))
        return createApiResponse(true, item)
    } catch(error) {
        return handleError(error)
    }
}