import { getSettings, updateSettings } from "$lib/api/jellyfin/methods/v1";
import { createApiSuccess } from "$lib/helper";
import type { Settings } from "$lib/typings";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async ({ locals }) => {
    const session = locals.session.data
    return createApiSuccess(await getSettings(session))
}
export const post: RequestHandler = async ({ locals, request }) => {
    const session = locals.session.data
    return createApiSuccess(await updateSettings(request.json() as unknown as Settings, session))
}