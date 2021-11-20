import {isInvalidParam} from "$lib/helper";
import {createApiError, createApiResponse} from "$lib/apiHelper";
import {getEpisodes} from "$lib/api/jellyfin";

export const get = async ({ locals, params }) => {
    const session = locals.session.data.active
    const {id, showId} = params

    if (isInvalidParam(id) || isInvalidParam(showId)) return createApiError(400, "Include item id")

    const episodes = await getEpisodes(session, showId, id)
    return createApiResponse(true, episodes)
}