import {createApiError, createApiResponse} from "$lib/apiHelper";
import {startPlayback, stopPlayback} from "$lib/api/jellyfin/methods";
import {isInvalidParam} from "$lib/helper";

export const post = async ({ locals, params, body }) => {
    const session = locals.session.data.active
    const info = body.info
    const itemId = params.id

    if(isInvalidParam(itemId) || isInvalidParam(info)) return createApiError(400, "Provide itemId & info")

    const response = await startPlayback(session, itemId, info)
    return createApiResponse(true, response)
}
export const del = async ({ locals, params }) => {
    const session = locals.session.data.active
    const streamId = params.id

    if(streamId == null) return createApiError(400, "Provide streamId")

    const response = await stopPlayback(session, streamId)
    return createApiResponse(true, response)
}