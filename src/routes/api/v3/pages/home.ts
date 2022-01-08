import { getFeaturedItem } from "$lib/api/jellyfin/methods/v1";
import { createApiSuccess } from "$lib/helper";
import type { Locals } from "$lib/typings";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler<Locals, {}> = async ({ locals }) => {
    const session = locals.session.data
    const featured = await getFeaturedItem(session)

    console.log(featured);
    
    
    return createApiSuccess({
        featured,
    })
}