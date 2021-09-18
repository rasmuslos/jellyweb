import {createApiError, createApiResponse} from "$lib/apiHelper";
import {getItem, getSeasons, handleError} from "$lib/api/jellyfin";
import type {Item} from "$lib/typings";

export async function get({ locals, params }) {
    try {
        const session = locals.session.data.active
        const { id } = params

        if(id === null || id === "") createApiError(400, "Include item id")

        let seasons
        const item: Item = (await getItem(session, id))

        if(item.Type === "Series") seasons = (await getSeasons(session, id)).Items

        return createApiResponse(true, {
            item,
            seasons,
        })
    } catch(error) {
        return handleError(error)
    }
}