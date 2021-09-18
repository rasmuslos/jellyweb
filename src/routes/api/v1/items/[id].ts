import {createApiError, createApiResponse} from "$lib/apiHelper";
import {
    getEpisodesOfSeason,
    getItem,
    getSeasons,
    getSimilarItems,
    handleError,
    searchByPerson
} from "$lib/api/jellyfin";
import type {Item} from "$lib/typings";

export async function get({ locals, params }) {
    try {
        const session = locals.session.data.active
        const { id } = params

        if(id === null || id === "") createApiError(400, "Include item id")

        let seasons
        let media
        let episodes
        let similar

        const item: Item = (await getItem(session, id))

        if(item.Type === "Series") seasons = (await getSeasons(session, id)).Items
        else if(item.Type === "Person") media = (await searchByPerson(session, id)).Items
        else if(item.Type === "Season") episodes = (await getEpisodesOfSeason(session, item.SeriesId, id)).Items
        else if(item.Type === "Movie") similar = (await getSimilarItems(session, id)).Items

        return createApiResponse(true, {
            item,
            seasons,
            media,
            episodes,
            similar,
        })
    } catch(error) {
        return handleError(error)
    }
}