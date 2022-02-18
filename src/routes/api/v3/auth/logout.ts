import { destroySession } from "$lib/api/jellyfin/methods/v1";
import { createApiSuccess, isLoggedIn } from "$lib/helper";
import type { RequestHandler } from "@sveltejs/kit";

export const del: RequestHandler = async ({ locals }) => {
    if(isLoggedIn(locals.session)) await destroySession(locals.session.data)

    locals.session.destroy()
    return createApiSuccess("done")
}