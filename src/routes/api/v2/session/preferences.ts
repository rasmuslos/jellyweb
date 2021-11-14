import {createApiError, createApiResponse} from "$lib/apiHelper";
import {getPreferences, updatePreferences} from "$lib/api/jellyfin/methods";

export const get = async ({ locals }) => {
    const session = locals.session.data.active
    const { CustomPrefs } = await getPreferences(session)

    return createApiResponse(true, CustomPrefs)
}
export const post = async ({ locals, body }) => {
    const session = locals.session.data.active
    const current = await getPreferences(session)
    const { preferences } = body

    console.log(current)
    if(preferences == null || preferences == {}) return createApiError(400, "Provide new preferences")
    current["CustomPrefs"] = {
        ...current.CustomPrefs,
        ...preferences,
    }

    const res = await updatePreferences(session, current)
    return createApiResponse(true, res)
}
export const del = async ({ locals }) => {
    const session = locals.session.data.active
    const current = await getPreferences(session)
    current["CustomPrefs"] = {}

    const res = await updatePreferences(session, current)
    return createApiResponse(true, res)
}