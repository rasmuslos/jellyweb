import {requestResource} from "$lib/api/internal";
import { insertDefaultValues } from "$lib/helper";
import type {ExtendedItem, Item, PageIndex, Settings} from "$lib/typings";

export const performLogin = (server: string, username: string, password: string) => requestResource<any>("auth/login", {
    method: "POST",
    body: {
        server,
        username,
        password,
    },
})
export const performLogout = () => requestResource<void>("auth/logout", {
    method: "DELETE",
})

export const getHomeItems = () => requestResource<PageIndex>("pages/home")
export const getBestRatedMovies = () => requestResource<Item[]>("items/bestRated")
export const getRandomItems = () => requestResource<Item[]>("items/random")

export const getExtendedItem = (id: string) => requestResource<ExtendedItem>(`items/${id}/extended`)
export const getSimilarItems = (id: string) => requestResource<Item[]>(`items/${id}/similar`)
export const getItemsStarring = (id: string) => requestResource<Item[]>(`items/${id}/starring`)
export const getEpisodesOfSeason = (showId: string, seasonId: string) => requestResource<Item[]>(`items/${showId}/${seasonId}/episodes`)
export const getEpisodesOfSeasonExtended = (showId: string, seasonId: string) => requestResource<ExtendedItem[]>(`items/${showId}/${seasonId}/episodes/extended`)
export const getSeasons = (id: string) => requestResource<Item[]>(`items/${id}/seasons`)
export const getNextUpItem = (id: string) => requestResource<Item>(`items/${id}/nextUp`)

export const searchItems = (term: string) => requestResource<Item[]>(`items/search?term=${encodeURIComponent(term)}`)
export const queryServer = (term: string) => requestResource<Item[]>(`items/query?term=${encodeURIComponent(term)}`)

export const getSettings = async () => insertDefaultValues(await requestResource<Settings>("user/settings"))
export const updateSettings = (updated: Settings) => requestResource<Settings>("user/settings", {
    method: "POST",
    body: updated,
})

export const setWatchedStatus = (id: string, watched: boolean) => requestResource<boolean>(`items/${id}/watched`, {
    method: watched ? "POST" : "DELETE",
})
export const setFavoriteStatus = (id: string, watched: boolean) => requestResource<boolean>(`items/${id}/favorite`, {
    method: watched ? "POST" : "DELETE",
})