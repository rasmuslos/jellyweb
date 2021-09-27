import {handleError, reportPlaybackProgress, reportPlaybackStart, reportPlaybackStop} from "$lib/api/jellyfin"
import {createApiResponse} from "$lib/apiHelper";

export async function post({ locals, body }) {
    try {
        const session = locals.session.data.active

        const response = await reportPlaybackStart(session, body)
        return createApiResponse(true, response)
    } catch(error) {
        return handleError(error)
    }
}
export async function del({ locals, body }) {
    try {
        const session = locals.session.data.active

        const response = await reportPlaybackStop(session, body)
        return createApiResponse(true, response)
    } catch(error) {
        return handleError(error)
    }
}
export async function put({ locals, body }) {
    try {
        const session = locals.session.data.active

        const response = await reportPlaybackProgress(session, body)
        return createApiResponse(true, response)
    } catch(error) {
        return handleError(error)
    }
}