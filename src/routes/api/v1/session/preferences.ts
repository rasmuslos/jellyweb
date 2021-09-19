import {getDisplayPreferences, handleError, updateDisplayPreferences} from "$lib/api/jellyfin"
import {createApiError, createApiResponse} from "$lib/apiHelper";

export async function post({ locals, body }) {
    try {
        const session = locals.session.data.active
        const current = await getDisplayPreferences(session)
        const { preferences } = body

        if(preferences == null || preferences == {}) return createApiError(400, "Provide new preferences")
        current["CustomPrefs"] = {
            ...current.CustomPrefs,
            ...preferences,
        }

        const res = await updateDisplayPreferences(session, current)
        return createApiResponse(true, res)
    } catch(error) {
        return handleError(error)
    }
}

export async function get({ locals }) {
    try {
        const session = locals.session.data.active
        const current = await getDisplayPreferences(session)

        return createApiResponse(true, current)
    } catch(error) {
        return handleError(error)
    }
}

export async function del({ locals }) {
    try {
        const session = locals.session.data.active
        const current = await getDisplayPreferences(session)
        current["CustomPrefs"] = {}

        const res = await updateDisplayPreferences(session, current)
        return createApiResponse(true, res)
    } catch(error) {
        return handleError(error)
    }
}