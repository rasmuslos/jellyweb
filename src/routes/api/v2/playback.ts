import {createApiResponse} from "$lib/apiHelper";
import {reportPlaybackProgress, reportPlaybackStart, reportPlaybackStop} from "$lib/api/jellyfin/methods/v2";

export const post = async ({ locals, body }) => {
    const session = locals.session.data.active

    const response = await reportPlaybackStart(session, body)
    return createApiResponse(true, response)
}
export const put = async ({ locals, body }) => {
    const session = locals.session.data.active

    const response = await reportPlaybackStop(session, body)
    return createApiResponse(true, response)
}
export const del = async ({ locals, body }) => {
    const session = locals.session.data.active

    const response = await reportPlaybackProgress(session, body)
    return createApiResponse(true, response)
}