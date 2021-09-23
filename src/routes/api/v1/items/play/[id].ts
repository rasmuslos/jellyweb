import {handleError, startPlayback, stopPlayback} from "$lib/api/jellyfin"
import {createApiError, createApiResponse} from "$lib/apiHelper";

export async function post({ locals, body, params }) {
    try {
        const session = locals.session.data.active
        const info = body.info
        const itemId = params.id

        if(itemId == null || info == null) return createApiError(400, "Provide itemId & info")

        const response = await startPlayback(session, itemId, info)
        return createApiResponse(true, response)
    } catch(error) {
        return handleError(error)
    }
}

export async function del({ locals, params }) {
    try {
        const session = locals.session.data.active
        const streamId = params.id

        if(streamId == null) return createApiError(400, "Provide streamId")

        const response = await stopPlayback(session, streamId)
        return createApiResponse(true, response)
    } catch(error) {
        return handleError(error)
    }
}