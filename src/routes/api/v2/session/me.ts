import {getMe} from "$lib/api/jellyfin/methods";
import {createApiResponse} from "$lib/apiHelper";

export const get = async ({ locals }) => {
    const session = locals.session.data.active
    const me = await getMe(session)

    return createApiResponse(true, me)
}